import express from 'express'
const router = express.Router()
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
import sequelize from '#configs/db.js'
const { Favor_class } = sequelize.models
import db from '#configs/mysql.js'
import authenticateToken from '#middlewares/authenticateToken.js'

// 取得會員頁所需渲染的課程資料
// 獲得某會員id的有加入到我的最愛清單中的課程id們
// 此路由只有登入會員能使用

router.get('/', authenticateToken, async (req, res) => {
  const userID = req.user.id
  const cids = await Favor_class.findAll({
    attributes: ['cid'],
    where: {
      uid: req.user.id,
    },
    raw: true, //只需要資料
  })
  // 將結果中的cid取出變為一個純資料的陣列
  const favorClass = cids.map((v) => v.cid)
  // 取得會員頁所需課程資料(JOIN class 和 favor-class 資料表)
  // uid 為變數，根據會員 id 返回查詢結果，先用 uid =1 來測試
  const classDataSql = `SELECT class.*,favor_class.uid,favor_class.created_at,class_image.image__u_r_l,speaker.speaker_name
    FROM class
    JOIN class_image ON  class.class__i_d = class_image.f__class__i_d
    JOIN favor_class ON  class.class__i_d = favor_class.cid
    JOIN speaker ON class.f__speaker__i_d = speaker_id
    WHERE favor_class.uid = ${userID} AND class_image.sort_order = 0`
  const [classFavorData] = await db.query(classDataSql)
  res.json({ status: 'success', data: { favorClass, classFavorData } })
})

// 會員加入收藏
router.put('/:id', authenticateToken, async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(400).send('User ID is required')
  }
  const cid = getIdParam(req)
  const uid = req.user.id

  const existFav = await Favor_class.findOne({ where: { cid, uid } })
  if (existFav) {
    return res.json({ status: 'error', message: '資料已經存在，新增失敗' })
  }

  const newFav = await Favor_class.create({ cid, uid })

  // console.log(newFav.id)

  // 沒有新增到資料
  if (!newFav.id) {
    return res.json({
      status: 'error',
      message: '新增失敗',
    })
  }

  return res.json({ status: 'success', data: null })
})
// 會員移除收藏
router.delete('/:id', authenticateToken, async (req, res, next) => {
  const cid = getIdParam(req)
  const uid = req.user.id

  const affectedRows = await Favor_class.destroy({
    where: {
      cid,
      uid,
    },
  })

  // 沒有刪除到任何資料 -> 失敗或沒有資料被刪除
  if (!affectedRows) {
    return res.json({
      status: 'error',
      message: '刪除失敗',
    })
  }

  // 成功
  return res.json({ status: 'success', data: null })
})

export default router
