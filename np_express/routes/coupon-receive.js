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

  const sqlLevel = `SELECT user_ID, order_status, SUM(order_total_price) AS total_price_sum
  FROM orders
  WHERE order_status = '已完成'
  GROUP BY user_ID, order_status ;`
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
