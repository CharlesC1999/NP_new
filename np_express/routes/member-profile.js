import express from 'express'
const router = express.Router()
// 中介軟體，存取隱私會員資料用
import authenticateToken from '#middlewares/authenticateToken.js'
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
// 資料庫使用
import sequelize from '#configs/db.js'
const { Member } = sequelize.models

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:id', authenticateToken, async function (req, res) {
  // 轉為數字
  const id = getIdParam(req)

  // ??? 如果直接改網址的路由參數，就阻擋
  // 檢查是否為授權會員，只有授權會員可以存取自己的資料
  if (req.user.id !== id) {
    return res.json({ status: 'error', message: '存取會員資料失敗' })
  }

  // *** 加上raw:true會把回傳的資料轉換為原始 JavaScript 物件形式
  const user = await Member.findByPk(id, {
    raw: true, // 只需要資料表中資料
  })

  // 不回傳密碼
  delete user.Password

  return res.json({ status: 'success', data: { user } })
})

export default router
