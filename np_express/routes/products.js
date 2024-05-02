import express from 'express'
const router = express.Router()
// 資料庫使用
import sequelize from '#configs/db.js'
const { Product } = sequelize.models
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

import db from '#configs/mysql.js'
// router.get('/', async function (req, res) {
//   res.send('product')
// })

// GET - 得到所有會員資料
router.get('/', async function (req, res) {
  try {
    const {
      page = 1,
      perpage = 20,
      price_gte = 50,
      price_lte = 100,
      sort = 'price', // string, 排序欄位 用於 ORDER BY
      order = 'asc', // string, 排序順序 用於 ORDER BY 'asc' | 'desc', 預設為'asc'
      category_id = '', // string, 對應 brand_id 欄位,  `brand_id IN (brand_ids)`
    } = req.query
    //當前頁碼
    const pageNow = Number(page) || 1
    //一頁幾筆
    const perpageNow = Number(perpage) || 20
    const limit = perpageNow

    //offset 從第幾筆開始
    const offset = (pageNow - 1) * perpageNow
    const categoryQuery = `
    SELECT DISTINCT id AS cateId, name AS cateName, parent_id AS parentId
    FROM product_categories
  `

    const productQuery = `
  SELECT 
    p.id, 
    p.product_name, 
    p.product_price, 
    p.product_stock, 
    p.product_description,
    p.valid, 
    p.upload_date,
    p.category_id, 
    pCate.name AS cate_name,
    pCate.parent_id,
    pCate.id AS CateID,
    pImg.image_url AS image_urls,
    ROUND(AVG(pReview.rating), 1) AS average_rating,
    GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
    GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
  FROM 
    product AS p
    LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
    LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
    LEFT JOIN product_categories AS pCate ON p.category_id= pCate.id
  GROUP BY 
    p.id
  LIMIT :limit OFFSET :offset
`
    const [products, categories] = await Promise.all([
      sequelize.query(productQuery, {
        replacements: { limit, offset },
        type: sequelize.QueryTypes.SELECT,
      }),
      sequelize.query(categoryQuery, { type: sequelize.QueryTypes.SELECT }),
    ])
    //計數 product獲取總行數
    const sqlCount = `SELECT COUNT(*) AS count FROM product`
    //執行
    const [result] = await db.query(sqlCount, {
      type: sequelize.QueryTypes.SELECT,
    })
    console.log('Count Query Results:', result)
    //總行數結果是數字
    const totalRecords = result[0].count
    console.log('Total records:', totalRecords)
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'No products found.' })
    }
    const totalPages = Math.ceil(totalRecords / perpageNow)
    console.log('Total pages:', totalPages)

    // console.log('pageNow:', pageNow)
    res.json({
      status: 'success',
      data: {
        products: products,
        categories: categories,
        totalRecords: totalRecords,
        totalPages: totalPages,
        currentPage: pageNow,
      },
    })
    console.log('Total pages:', totalPages) // 检查总页数是否正确计算
  } catch (error) {
    console.error('Error fetching products:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error.' })
  }
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:pid', async function (req, res) {
  const pid = parseInt(req.params.pid) // 將id轉成數字

  try {
    //執行資料庫搜尋 query
    const [results, metadata] = await sequelize.query(
      `
      SELECT 
      p.id, 
      p.product_name, 
      p.category_id, 
      p.product_price, 
      p.product_stock, 
      p.product_description,
      p.valid, 
      p.upload_date,
      ROUND(AVG(pReview.rating), 1) AS average_rating,
      GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
      GROUP_CONCAT(pImg.image_url ORDER BY pImg.sort_order) AS image_urls,
      GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
    FROM 
      product AS p
      LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
      LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
    WHERE 
      p.id = :productId
    GROUP BY 
      p.id;
    `,
      {
        replacements: { productId: pid }, // Ensure using safe parameter passing
        type: sequelize.QueryTypes.SELECT,
      }
    )

    if (!results) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Product not found.' })
    }

    return res.json({ status: 'success', data: results })
  } catch (error) {
    console.error('Error fetching product:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error.' })
  }
})

export default router
