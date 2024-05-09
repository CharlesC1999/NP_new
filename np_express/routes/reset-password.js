import express from 'express'
const router = express.Router()

// 中介軟體，存取隱私會員資料用
import authenticateToken from '#middlewares/authenticateToken.js'
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
// 資料庫使用
import sequelize from '#configs/db.js'
const { Member } = sequelize.models

// 檢查登入狀態用
router.get('/:id/password', authenticateToken, async (req, res) => {

    const id = getIdParam(req)

    // 檢查是否為授權會員，只有授權會員可以存取自己的資料
    if (req.user.id !== id) {
      return res.json({ status: 'error', message: '存取會員資料失敗' })
    }

    return res.json({status: 'success', message: '存取會員資料成功'})
  

  // TODO 暫時註解
  //   // 查詢資料庫目前的資料
  //   const user = await Member.findByPk(req.user.id, {
  //     raw: true, // 只需要資料表中資料
  //   })
  //   // 不回傳密碼值
  //   delete user.Password
  //   return res.json({ status: 'success', data: { user } })
})

export default router
