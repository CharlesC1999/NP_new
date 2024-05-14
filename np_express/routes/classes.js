import express from 'express'
import moment from 'moment-timezone'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// sequelize db
import sequelize from '#configs/db.js'
// 一般sql
import db from '#configs/mysql.js'
const { Class, Class_images, Speaker, Class_categories } = sequelize.models

router.get('/', async function (req, res) {
  // 預設分頁顯示第一頁，每頁6筆資料
  const {
    page = 1,
    perpage = 6,
    sortBy = 'class__i_d',
    categoryId,
    startDate: formatStartDate,
    endDate: formatEndDate,
    priceStart,
    priceEnd,
  } = req.query
  console.log(req.query, 'gg')
  console.log(categoryId, formatStartDate, formatEndDate)

  const perpageNow = Number(perpage) || 6
  const pageNow = Number(page) || 1
  const limit = perpageNow
  const offset = (pageNow - 1) * perpageNow
  const sortOrder = sortBy || 'class__i_d'
  let whereClause = 'WHERE ci.sort_order = 0'
  // 分類篩選
  if (
    categoryId &&
    categoryId !== 'null' &&
    categoryId !== '0' &&
    categoryId !== 'undefined' &&
    categoryId.trim() !== ''
  ) {
    whereClause += ` AND c.class_category__i_d = ${db.escape(categoryId)}`
  }

  // 日期篩選
  const validStartDate = moment(
    formatStartDate,
    'YYYY-MM-DD HH:mm:ss',
    true
  ).isValid()
    ? db.escape(moment(formatStartDate).format('YYYY-MM-DD HH:mm:ss'))
    : null
  const validEndDate = moment(
    formatEndDate,
    'YYYY-MM-DD HH:mm:ss',
    true
  ).isValid()
    ? db.escape(moment(formatEndDate).format('YYYY-MM-DD HH:mm:ss'))
    : null

  if (validStartDate && validEndDate) {
    whereClause += ` AND c.class_date >= ${validStartDate} AND c.class_date <= ${validEndDate}`
  } else if (validStartDate) {
    whereClause += ` AND c.class_date >= ${validStartDate}`
  } else if (validEndDate) {
    whereClause += ` AND c.class_date <= ${validEndDate}`
  }

  // 價格篩選
  if (priceStart && priceEnd) {
    whereClause += ` AND c.c_discount_price BETWEEN ${db.escape(
      priceStart
    )} AND ${db.escape(priceEnd)}`
  } else if (priceStart) {
    whereClause += ` AND c.c_discount_price >= ${db.escape(priceStart)}`
  } else if (priceEnd) {
    whereClause += ` AND c.c_discount_price <= ${db.escape(priceEnd)}`
  }

  const sqlCate = `
    SELECT c.*, ci.image__u_r_l, s.speaker_name
    FROM class AS c
    JOIN class_image AS ci ON c.class__i_d = ci.f__class__i_d
    JOIN speaker AS s ON c.f__speaker__i_d = s.speaker_id
    JOIN class_categories AS cc ON c.class_category__i_d = cc.class_cate__i_d
    ${whereClause}
    ORDER BY ${sortOrder}
    LIMIT ${limit} OFFSET ${offset}
  `
  console.log(sqlCate)

  const sqlCountCate = `
    SELECT COUNT(*) AS countCate
    FROM class AS c
    JOIN class_image AS ci ON c.class__i_d = ci.f__class__i_d
    JOIN class_categories AS cc ON c.class_category__i_d = cc.class_cate__i_d
    ${whereClause}
  `

  const [classesRawSql] = await db.query(sqlCate)
  // console.log(classesRawSql)
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

// GET - 單筆
router.get('/full/:class__i_d', async function (req, res) {
  // 使用 getIdParam() 將查詢參數（原本是 string）轉為數字
  const class__i_d = req.params.class__i_d
  console.log(class__i_d)

  // 取得該名講師課程資訊（將 class 與 class_image 資料表關聯，圖片有多張時取第一張）
  const ClassDataSql = `
    SELECT c.*, ci.*, s.*
    FROM class AS c
    JOIN class_image AS ci ON c.class__i_d = ci.f__class__i_d
    JOIN speaker AS s ON c.f__speaker__i_d = s.speaker_id
    WHERE c.class__i_d = ${class__i_d}
    GROUP BY c.class__i_d
  `
  const [classAllDetail] = await db.query(ClassDataSql)
  return res.json({
    status: 'success1',
    data: { classAllDetail },
  })
})

export default router
