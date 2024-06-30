import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Coupons } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'

// 列表頁
// my-products?brand_ids=1,2&name_like=pixel&price_gte=10000&price_lte=15000&sort=price&order=asc&page=1&perpage=2
router.get('/', async function (req, res) {
  const {
    coupon_condition_ids = '', // string, 對應 brand_id 欄位,  `brand_id IN (brand_ids)`
  } = req.query
  console.log(coupon_condition_ids)

  const conditions = []

  // 品牌，brand_ids 使用 `brand_id IN (1,2,3)`
  conditions[1] = coupon_condition_ids
    ? `coupon_condition_id (${coupon_condition_ids})`
    : ''

  // 去除空字串
  const conditionsValues = conditions.filter((v) => v)

  // 各條件需要先包含在`()`中，因各自內查詢是OR, 與其它的是AND
  const where =
    conditionsValues.length > 0
      ? `WHERE ` + conditionsValues.map((v) => `( ${v} )`).join(` AND `)
      : ''

  const sqlCouponsBox = `SELECT * FROM coupon_condition`

  const sqlCount = `SELECT COUNT(*) AS count FROM coupon_condition ${where}`

  // 顯示sql語法
  console.log(sqlCouponsBox)
  console.log(sqlCount)

  const [rows, fields] = await db.query(sqlCouponsBox)

  console.log(rows)

  const [rows2] = await db.query(sqlCount)

  // 回傳總筆數
  const total = rows2[0].count

  return res.json({
    status: 'success',
    data: {
      total,
      coupons: rows,
    },
  })
})
router.get('/:status', async function (req, res) {
  const couponsStatus = req.params.status

  const sqlOrders = `SELECT * FROM coupon_condition
  `

  // WHERE Status= '${ordersStatus}'
  const [rows, fields] = await db.query(sqlOrders)

  return res.json({
    status: 'success',
    data: {
      coupons: rows,
    },
  })
  //return res.json({ status: 'success', data: { status } })
})

export default router
