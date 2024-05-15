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
    level_ids = '', // string, 對應 brand_id 欄位,  `brand_id IN (brand_ids)`
  } = req.query
  console.log(level_ids)

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
  conditions[1] = level_ids ? `level_id (${level_ids})` : ''

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
  //   const sqlLevel = `SELECT * , sum(product.price * order_commodity_item.Quantity)
  //   FROM member
  //   join orders on member.id = orders.User_ID
  //   join order_commodity_item on orders.Order_ID = order_commodity_item.Order_ID
  //   join product on order_commodity_item.Product_ID = product.id
  //   group by member.id; `

  // const sqlLevel = `SELECT User_ID, sum(price* Quantity) as total
  // FROM member
  // join orders on member.id = orders.User_ID
  // join order_commodity_item on orders.Order_ID = order_commodity_item.Order_ID
  // join product on order_commodity_item.Product_ID = product.id
  // group by user_id;`
  // const sqlLevel = `SELECT User_ID, sum(price* Quantity) as total
  // FROM member
  // join orders on member.id = orders.User_ID
  // join order_commodity_item on orders.Order_ID = order_commodity_item.Order_ID
  // join product on order_commodity_item.Product_ID = product.id
  // where orders.Status = '已完成'
  // group by user_id;`
  // const sqlLevel = `SELECT total_price, user_id, status
  // FROM orders ;`
  const sqlLevel = `SELECT user_ID, order_status, SUM(order_total_price) AS total_price_sum
  FROM orders
  WHERE order_status = '已完成'
  GROUP BY user_ID, status ;`
  // 最終組合的sql語法(計數用)
  // const sqlCount = `SELECT COUNT(*) AS count FROM member_level ${where}`

  // 顯示sql語法
  console.log(sqlLevel)
  // console.log(sqlCount)

  const [rows, fields] = await db.query(sqlLevel)

  console.log(rows)

  // const [rows2] = await db.query(sqlCount)

  // 回傳總筆數
  // const total = rows2[0].count

  // 計算頁數
  //   const pageCount = Math.ceil(total / Number(perpage)) || 0
  //抓狀態

  return res.json({
    status: 'success',
    data: {
      level: rows,
    },
  })
})

export default router
