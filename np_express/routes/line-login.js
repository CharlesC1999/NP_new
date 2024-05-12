import express from 'express'
const router = express.Router()

import jsonwebtoken from 'jsonwebtoken'

import sequelize from '#configs/db.js'
const { Line_member } = sequelize.models
const { Member } = sequelize.models

// line-login模組
import line_login from '#services/line-login.js'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
// line 登入使用
const channel_id = process.env.LINE_CHANNEL_ID
const channel_secret = process.env.LINE_CHANNEL_SECRET
const callback_url = process.env.LINE_LOGIN_CALLBACK_URL

const LineLogin = new line_login({
  channel_id,
  channel_secret,
  // react line page callback url
  // 注意: LINE_LOGIN_CALLBACK_URL 是前端(react/next)路由
  // 必需要與 LINE Developer 的 "Callback URL" 設定一致
  // 目前與LINE登入頁設定為一致(登入頁路由=回調頁路由)
  callback_url,
  scope: 'openid profile',
  prompt: 'consent',
  bot_prompt: 'normal',
})

// ------------ 以下為路由 ------------
// 此api路由為產生登入網址，傳回前端後，要自己導向line網站進行登入
router.get('/login', LineLogin.authJson())

// 登出機制
router.get('/logout', async function (req, res, next) {
  if (!req.query.line_uid) {
    return res.json({ status: 'error', message: '缺少必要資料' })
  }

  // 查詢
  const dbUser = await Member.findOne({
    where: {
      line_uid: req.query.line_uid,
    },
    raw: true, // 只需要資料表中資料
  })

  const line_access_token = dbUser.line_access_token

  // https://developers.line.biz/en/docs/line-login/managing-users/#logout
  // 登出時進行撤銷(revoke) access token
  LineLogin.revoke_access_token(line_access_token)

  // 清除cookie
  res.clearCookie('accessToken', { httpOnly: true })
  // 因登入過程中也用到session，也會產生 SESSION_ID，所以也要清除
  res.clearCookie('SESSION_ID', { httpOnly: true })

  return res.json({ status: 'success', data: null })
})

// 此api路由為line登入後，從前端(react/next)callback的對應路由頁面，即真正登入處理路由
router.get(
  '/callback',
  LineLogin.callback(
    // 登入成功的回調函式 Success callback
    async (req, res, next, token_response) => {
      console.log(token_response)

      // 以下流程:
      // 1. 先查詢資料庫是否有同line_uid的資料
      // 2-1. 有存在 -> 執行登入工作
      // 2-2. 不存在 -> 建立一個新會員資料(無帳號與密碼)，只有line來的資料 -> 執行登入工作

      const line_uid = token_response.id_token.sub
      console.log(line_uid)
      console.log(token_response.id_token, 'uuid')

      // 1. 先查詢資料庫是否有同line_uid的資料
      const total = await Member.count({
        where: {
          line_uid,
        },
      })

      console.log(total)

      // 要加到access token中回傳給前端的資料
      // 存取令牌(access token)只需要id和username就足夠，其它資料可以再向資料庫查詢
      let returnUser = {
        id: 0,
        username: '',
        google_uid: '',
        line_uid: '',
      }

      if (total) {
        // 2-1. 有存在 -> 從資料庫查詢會員資料
        const dbUser = await Member.findOne({
          where: {
            line_uid,
          },
          raw: true, // 只需要資料表中資料
        })
        console.log(dbUser, 'dbuser')

        // 回傳給前端的資料
        returnUser = {
          id: dbUser.id,
          name: dbUser.User_name,
          line_uid: dbUser.line_uid,
          photo_url: dbUser.User_image,
        }
      } else {
        // 2-2. 不存在 -> 建立一個新會員資料(無帳號與密碼)，只有line來的資料 -> 執行登入工作
        const user = {
          User_name: token_response.id_token.name,
          Email: 'line@noemail.com',
          line_uid: token_response.id_token.sub,
          line_access_token: token_response.access_token,
          User_image: token_response.id_token.picture,
          Create_date: new Date(),
          Last_login: new Date(),
          google_uid: 'not google',
        }
        console.log(user.line_uid)
        // await insertOne('users', newUser)

        // 新增會員資料
        const newUser = await Member.create(user)

        // 回傳給前端的資料
        returnUser = {
          id: newUser.id,
          name: newUser.User_name,
          line_uid: newUser.line_uid,
          photo_url: newUser.User_image,
        }
      }

      // 產生存取令牌(access token)，其中包含會員資料
      const accessToken = jsonwebtoken.sign(returnUser, accessTokenSecret, {
        expiresIn: '12h',
      })

      // 使用httpOnly cookie來讓瀏覽器端儲存access token
      res.cookie('accessToken', accessToken, { httpOnly: false })

      // 傳送access token回應(react可以儲存在state中使用)
      return res.json({
        status: 'success',
        data: {
          accessToken,
          user: {
            // 新增的用戶資料部分
            id: returnUser.id,
            name: returnUser.name,
            // email: email, // 假設您希望在前端也使用email
            address: returnUser.photo_url,
          },
        },
      })
    },
    // 登入失敗的回調函式 Failure callback
    (req, res, next, error) => {
      console.log('line login fail')

      return res.json({ status: 'error', message: { error } })
    }
  )
)

export default router
