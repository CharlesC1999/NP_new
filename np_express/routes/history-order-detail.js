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

  //這是包含圖片的跟一大堆的還有總價重新命名的
  const sqlOrders = `SELECT orders.order_id,user_id, order_date, name, status, shipping_address, quantity, discription, MAX(image_url) AS image_url,  sum(Quantity*price) AS total
  FROM orders
  JOIN order_commodity_item on orders.Order_ID = order_commodity_item.Order_ID
  Join product on order_commodity_item.product_id = product.ID
  JOIN product_image ON order_commodity_item.Product_ID = product_image.F_product_id
  GROUP BY orders.order_id;`

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
  FROM orders
  JOIN order_commodity_item ON orders.Order_ID = order_commodity_item.Order_ID
  Join product on order_commodity_item.product_id = product.ID
  join member on orders.User_ID = member.id
  where orders.Order_ID =  ${orderid};`

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

router.delete('/:orderid', async function (req, res) {
  // 轉為數字，  上面的status要等於下面的req.params.status裡面的status
  const orderid = req.params.orderid

  const sqlOrders1 = `UPDATE orders
  
  WHERE Order_ID = "${orderid}";`
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
