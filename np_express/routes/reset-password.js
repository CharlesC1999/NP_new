import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'

// 中介軟體，存取隱私會員資料用
import authenticateToken from '#middlewares/authenticateToken.js'
// 驗証加密密碼字串用
import { compareHash } from '#db-helpers/password-hash.js'
// 資料庫使用
import sequelize from '#configs/db.js'
const { Member } = sequelize.models

// 檢查登入狀態用
router.put('/', authenticateToken, async (req, res) => {
  const id = req.user.id

  // user為來自前端的會員資料(準備要修改的資料)
  const userPassword = req.body

  // 檢查從前端瀏覽器來的資料，哪些為必要(name, ...)，從前端接收的資料為
  if (!userPassword.origin || !userPassword.new) {
    return res.json({ status: 'error', message: '缺少必要資料' })
  }

  // 查詢資料庫目前的資料
  const db = await Member.findByPk(id, {
    raw: true, // 只需要資料表中資料
  })

  // null代表不存在
  if (!db) {
    return res.status(404).json({ status: 'error', message: '查無此會員' })
  }

  // compareHash(登入時的密碼純字串, 資料庫中的密碼hash) 比較密碼正確性
  // isValid=true 代表正確
  const isValid = await compareHash(userPassword.origin, db.Password)

  // isValid=false 代表密碼錯誤
  if (!isValid) {
    return res.json({ status: 'error', message: '密碼錯誤' })
  }

  // 新舊密碼不能相同
  if (userPassword.origin === userPassword.new) {
    return res.json({ status: 'error', message: '新舊密碼不能相同' })
  }

  const salt = bcrypt.genSaltSync(10)
  //   bcrypt加密
  const hashedPassword = bcrypt.hashSync(userPassword.new, salt)

  // 對資料庫執行update
  const [affectedRows] = await Member.update(
    { Password: hashedPassword },
    {
      where: {
        id,
      },
      // 更新時要加密密碼字串 trigger the beforeUpdate hook，function名稱是設定好的，並非自定義
      individualHooks: true,
    }
  )

  // 沒有更新到任何資料 -> 失敗
  if (!affectedRows) {
    return res.json({ status: 'error', message: '更新失敗' })
  }

  // 成功，不帶資料
  return res.json({ status: 'success', data: null, message: '更新成功' })
})

export default router
