import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Orders } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'

router.post('/add-review', async (req, res) => {
  const { userid, activeProductId, comment, rating, created_at } = req.body

  // 先檢查是否已經有評論

  try {
    // 插入新的評論
    const insertQuery = `INSERT INTO product_review (user_id, product_id, comment, rating, created_at)
                         VALUES (?, ?, ?, ?, ?)`
    const result = await db.query(insertQuery, [
      userid,
      activeProductId,
      comment,
      rating,
      created_at,
    ])

    console.log(result)
    res.status(201).json({ message: 'Review added successfully' })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ message: 'Failed to add review' })
  }
})

// 列表頁
// my-products?brand_ids=1,2&name_like=pixel&price_gte=10000&price_lte=15000&sort=price&order=asc&page=1&perpage=2
router.get('/', async function (req, res) {
  const {
    order_ids = '', // string, 對應 brand_id 欄位,  `brand_id IN (brand_ids)`
  } = req.query
  // console.log(order_ids)

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
  conditions[1] = order_ids ? `Order_ ID (${order_ids})` : ''
  // conditions[2] = order_ids ? `Order_ ID (${order_ids})` : ''

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

  // 最終組合的sql語法
  // const sqlOrders = `SELECT *
  // FROM orders
  // JOIN order_item ON orders.Order_ID = order_item.Order_detail_ID
  // LEFT JOIN  product ON order_item.thing_ID =product.id
  // AND order_item.itemType = 1
  // LEFT JOIN product_image ON order_item.thing_ID =product_image.product_id
  // AND order_item.itemType = 1
  // LEFT JOIN  class ON order_item.thing_ID =class.class__i_d
  // AND order_item.itemType = 2

  // GROUP BY orders.order_Id
  // ORDER BY orders.Order_date DESC ;

  const sqlOrders = `
  SELECT orders.*, orders_detail.*, product.*, product_image.image_url, class.class_name
  FROM orders
  JOIN orders_detail ON orders.Order_ID = orders_detail.order_detail_id
  LEFT JOIN product ON orders_detail.commodity_id = product.id AND orders_detail.product_type = 'product'
  LEFT JOIN product_image ON orders_detail.commodity_id = product_image.product_id AND orders_detail.product_type = 'product'
  LEFT JOIN class ON orders_detail.class_id = class.class__i_d AND orders_detail.product_type = 'class'
  ${where}
  GROUP BY orders.order_Id
  ORDER BY orders.Order_date DESC;

`

  // 最終組合的sql語法(計數用)
  const sqlCount = `SELECT COUNT(*) AS count FROM orders ${where}`
  try {
    const [orders, fields] = await db.query(sqlOrders)
    const enhancedOrders = await Promise.all(
      orders.map(async (order) => {
        const reviewCheckQuery = `SELECT 1 FROM product_review WHERE product_id = ? AND user_id = ? LIMIT 1`
        const [hasReviewed] = await db.query(reviewCheckQuery, [
          order.commodity_id,
          order.user_id,
        ])
        order.has_reviewed = hasReviewed.length > 0 ? 1 : 0
        return order
      })
    )

    const [totalResult] = await db.query(sqlCount)
    const total = totalResult[0].count

    res.json({
      status: 'success',
      data: {
        total,
        orders: enhancedOrders,
      },
    })
  } catch (error) {
    console.error('Database error:', error)
    res
      .status(500)
      .json({ status: 'error', message: 'Failed to retrieve orders' })
  }
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:status', async function (req, res) {
  // 轉為數字，  上面的status要等於下面的req.params.status裡面的status
  const ordersStatus = req.params.status

  // const sqlOrders = `SELECT *
  // FROM orders
  // JOIN order_item ON orders.Order_ID = order_item.Order_detail_ID
  // LEFT JOIN  product ON order_item.thing_ID =product.id
  // AND order_item.itemType = 1
  // LEFT JOIN product_image ON order_item.thing_ID =product_image.product_id
  // AND order_item.itemType = 1
  // LEFT JOIN  class ON order_item.thing_ID =class.class__i_d
  // AND order_item.itemType = 2
  // WHERE orders.status = "${ordersStatus}"
  // GROUP BY orders.order_Id
  // ORDER BY orders.Order_date DESC;`

  //   const sqlOrders = `SELECT *
  //   FROM orders
  //   JOIN orders_detail ON orders.Order_ID = orders_detail.Order_detail_ID
  //   LEFT JOIN  product ON orders_detail.commodity_id =product.id
  //   AND orders_detail.product_type = 'product'
  //   LEFT JOIN product_image ON orders_detail.commodity_id =product_image.product_id
  //   AND orders_detail.product_type = 'product'
  //   LEFT JOIN  class ON orders_detail.class_id =class.class__i_d
  //   AND orders_detail.product_type = 'class'
  //   WHERE orders.status = "${ordersStatus}"
  //   GROUP BY orders.order_Id
  //   ORDER BY orders.Order_date DESC ;
  // `
  const sqlOrders = `SELECT *
FROM orders
JOIN orders_detail ON orders.Order_ID = orders_detail.order_detail_id
LEFT JOIN  product ON orders_detail.commodity_id =product.id 
AND orders_detail.product_type = 'product'
LEFT JOIN product_image ON orders_detail.commodity_id =product_image.product_id
AND orders_detail.product_type = 'product'
LEFT JOIN  class ON orders_detail.class_id =class.class__i_d
AND orders_detail.product_type = 'class'
WHERE orders.order_status = "${ordersStatus}"
GROUP BY orders.order_Id
ORDER BY orders.Order_date DESC
;
`
  // WHERE Status= '${ordersStatus}'
  const [rows, fields] = await db.query(sqlOrders)

  return res.json({
    status: 'success',
    data: {
      orders: rows,
    },
  })
  //return res.json({ status: 'success', data: { status } })
})

export default router
