import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Orders } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'

// 列表頁
// my-products?brand_ids=1,2&name_like=pixel&price_gte=10000&price_lte=15000&sort=price&order=asc&page=1&perpage=2
router.get('/', async function (req, res) {
  const {
    order_ids = '', // string, 對應 brand_id 欄位,  `brand_id IN (brand_ids)`
  } = req.query
  console.log(order_ids)

  // 測試用
  // 處理如果沒找到資料
  // 建立資料庫搜尋條件(where從句用)，每個條件用陣列存放，串接時用join(' AND ')
  const conditions = []

  // 品牌，brand_ids 使用 `brand_id IN (1,2,3)`
  conditions[1] = order_ids ? `Order_ ID (${order_ids})` : ''

  // 去除空字串
  const conditionsValues = conditions.filter((v) => v)

  // 各條件需要先包含在`()`中，因各自內查詢是OR, 與其它的是AND
  const where =
    conditionsValues.length > 0
      ? `WHERE ` + conditionsValues.map((v) => `( ${v} )`).join(` AND `)
      : ''

  const sqlOrders = `SELECT *
  FROM orders
  JOIN orders_detail ON orders.Order_ID = orders_detail.Order_detail_ID
  LEFT JOIN  product ON orders_detail.commodity_id =product.id 
  AND orders_detail.product_type = 'product'
  LEFT JOIN product_image ON orders_detail.commodity_id =product_image.product_id
  AND orders_detail.product_type = 'product'
  LEFT JOIN  class ON orders_detail.class_id =class.class__i_d
  AND orders_detail.product_type = 'class'
  
 ;
`
  // 最終組合的sql語法(計數用)
  const sqlCount = `SELECT COUNT(*) AS count FROM orders ${where}`

  // 顯示sql語法
  console.log(sqlOrders)
  console.log(sqlCount)

  const [rows, fields] = await db.query(sqlOrders)

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
      orders: rows,
    },
  })
})
//這個orderid式前端抓到的?order_id=1
router.get('/:orderid', async function (req, res) {
  // 轉為數字，  上面的status要等於下面的req.params.status裡面的status
  const orderid = req.params.orderid
  const sqlOrders1 = `SELECT *
  FROM orders_detail
      LEFT JOIN product ON orders_detail.commodity_id = product.id
      AND orders_detail.product_type = 'product'
      LEFT JOIN class ON orders_detail.class_id = class.class__i_d
      AND orders_detail.product_type = 'class'
      LEFT JOIN orders ON orders_detail.Order_detail_ID = orders.Order_ID
      LEFT JOIN member ON orders.user_id = member.id
  WHERE Order_detail_ID = '${orderid}';`

  // WHERE Status= '${ordersStatus}'
  const [rows, fields] = await db.query(sqlOrders1)

  return res.json({
    status: 'success',
    data: {
      orders: rows,
    },
  })
  //return res.json({ status: 'success', data: { status } })
})

export default router
