import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// sequelize db
import sequelize from '#configs/db.js'
// 一般sql
import db from '#configs/mysql.js'
const { Class, Class_images, Speaker } = sequelize.models

router.get('/', async function (req, res) {
  // 預設分頁顯示第一頁，每頁6筆資料
  const { page = 1, perpage = 6 } = req.query

  const perpageNow = Number(perpage) || 6
  const pageNow = Number(page) || 1
  const limit = perpageNow
  const offset = (pageNow - 1) * perpageNow

  const sqlCate = `
  SELECT c.*, ci.image__u_r_l, s.speaker_name
  FROM class AS c
  JOIN class_image AS ci ON c.class__i_d = ci.f__class__i_d
  JOIN speaker AS s ON c.f__speaker__i_d = s.speaker_id
  WHERE ci.sort_order = 0
  LIMIT ${limit} OFFSET ${offset}
  `
  const sqlCountCate = `SELECT COUNT(*) AS countCate FROM class`

  const [classesRawSql] = await db.query(sqlCate)
  const [countCateRawSql] = await db.query(sqlCountCate)
  const total = countCateRawSql[0].countCate
  const pageCount = Math.ceil(total / Number(perpage)) || 0

  // 得到所有食譜分類名稱
  // const classesCategories = await Class_Categories.findAll({
  //   logging: console.log,
  // })

  // 標準回傳JSON
  return res.json({
    status: 'success',
    data: { classesRawSql, total, pageCount },
  })
})

// GET - 得到所有資料
router.get('/:classId', async function (req, res) {
  // 轉為數字
  const classId = req.params.classId

  const classData = await Class.findByPk(classId, {
    raw: true, // 只需要資料表中資料
  })

  return res.json({ status: 'success', data: { classData } })
})

export default router