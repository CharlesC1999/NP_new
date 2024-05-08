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
router.get('/useCoupon', async function (req, res) {
  const {
    coupon_ids = '', // string, 對應 brand_id 欄位,  `brand_id IN (brand_ids)`
  } = req.query
  console.log(coupon_ids)

  // 測試用
  // console.log(
  //   page,
  //   perpage,
  //   name_like,
  //   brand_ids,
  //   sort,
  //   order,
  //   price_gte,
  //   price_lte
  // )
  // 處理如果沒找到資料
  // 建立資料庫搜尋條件(where從句用)，每個條件用陣列存放，串接時用join(' AND ')
  const conditions = []

  // 品牌，brand_ids 使用 `brand_id IN (1,2,3)`
  conditions[1] = coupon_ids ? `Coupon_ ID (${coupon_ids})` : ''

  // 去除空字串
  const conditionsValues = conditions.filter((v) => v)

  // 各條件需要先包含在`()`中，因各自內查詢是OR, 與其它的是AND
  const where =
    conditionsValues.length > 0
      ? `WHERE ` + conditionsValues.map((v) => `( ${v} )`).join(` AND `)
      : ''

  // 分頁用
  // page預設為1，perpage預設為3
  // const perpageNow = Number(perpage) || 3
  // const pageNow = Number(page) || 1
  // const limit = perpageNow
  // page=1 offset=0; page=2 offset= perpage * 1; ...
  // const offset = (pageNow - 1) * perpageNow

  //   最終組合的sql語法
  const sqlCoupons = `SELECT * FROM coupons `

  // 最終組合的sql語法(計數用)
  const sqlCount = `SELECT COUNT(*) AS count FROM coupons ${where}`

  // 顯示sql語法
  console.log(sqlCoupons)
  console.log(sqlCount)

  const [rows, fields] = await db.query(sqlCoupons)

  console.log(rows)

  const [rows2] = await db.query(sqlCount)

  // 回傳總筆數
  const total = rows2[0].count

  // 計算頁數
  // const pageCount = Math.ceil(total / Number(perpage)) || 0
  //抓狀態

  return res.json({
    status: 'success',
    data: {
      total,
      coupons: rows,
    },
  })
})
router.get('/', async function (req, res) {
  // 轉為數字，  上面的status要等於下面的req.params.status裡面的status
  //   const couponsStatus = req.params.status

  const sqlOrders = `UPDATE coupons
  SET C_status = '已使用'
  WHERE Coupon_ID = 1;`

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
