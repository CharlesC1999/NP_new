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
    const products = await sequelize.query(
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
        pImg.image_url AS image_urls,
        ROUND(AVG(pReview.rating), 1) AS average_rating,
        GROUP_CONCAT(CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
        
        GROUP_CONCAT(pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
      FROM 
        product AS p
        LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
        LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
      GROUP BY 
        p.id;
      `,
      { type: sequelize.QueryTypes.SELECT }
    )

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'No products found.' })
    }

    return res.json({ status: 'success', data: products })
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
