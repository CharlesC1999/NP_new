import express from 'express'
const router = express.Router()
// 處理傳送表單資料用
import multer from 'multer'
const upload = multer()

// 中介軟體，存取隱私會員資料用
import authenticateToken from '#middlewares/authenticateToken.js'
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
// 資料庫使用
import sequelize from '#configs/db.js'
const { Member } = sequelize.models

// 檢查登入狀態用
router.get('/check', authenticateToken, async (req, res) => {
  // 查詢資料庫目前的資料
  const user = await Member.findByPk(req.user.id, {
    raw: true, // 只需要資料表中資料
  })

  // 不回傳密碼值
  delete user.Password
  return res.json({ status: 'success', data: { user } })
})

// PUT - 更新會員資料(排除更新密碼)
router.put(
  '/update-profile',
  authenticateToken,
  upload.none(),
  async function (req, res) {
    console.log('req.body:----------------------', req.body)
    const id = req.user.id

    // user為來自前端的會員資料(準備要修改的資料)
    const user = req.body

    // 檢查從前端瀏覽器來的資料，哪些為必要(name, ...)
    if (!user.User_name || !user.Email || !user.Phone || !user.Gender) {
      return res.json({ status: 'error', message: '缺少必要資料' })
    }

    // 查詢資料庫目前的資料
    const dbUser = await Member.findByPk(id, {
      raw: true, // 只需要資料表中資料
    })

    // null代表不存在
    if (!dbUser) {
      return res.json({ status: 'error', message: '使用者不存在' })
    }

    // 檢查信箱是否已重覆
    const checkeEmail = await Member.findOne({ where: { Email: user.Email } })

    if (checkeEmail && checkeEmail.id !== id) {
      return res.json({ status: 'error', message: '信箱已經被註冊' })
    }

    // TODO 暫時不讓使用者更新生日
    // 有些特殊欄位的值沒有時要略過更新，不然會造成資料庫錯誤
    // if (!user.birth_date) {
    //   delete user.birth_date
    // }

    // 對資料庫執行update
    const [affectedRows] = await Member.update(user, {
      where: {
        id,
      },
    })

    // 沒有更新到任何資料 -> 失敗或沒有資料被更新
    if (!affectedRows) {
      return res.json({ status: 'error', message: '更新失敗或沒有資料被更新' })
    }

    // 更新成功後，找出更新的資料，updatedUser為更新後的會員資料
    const updatedUser = await Member.findByPk(id, {
      raw: true, // 只需要資料表中資料
    })

    // password資料不需要回應給瀏覽器
    delete updatedUser.Password
    //console.log(updatedUser)
    // 回傳
    return res.json({
      status: 'success',
      data: { user: updatedUser },
      message: '更新成功',
    })
  }
)

export default router
