import express from 'express'
const router = express.Router()
// 資料庫使用
import sequelize from '#configs/db.js'
const { Product } = sequelize.models
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

import db from '#configs/mysql.js'

async function fetchCategoryCounts() {
  const categoryCountsQuery = `
    SELECT
    (SELECT COUNT(*) FROM product WHERE category_id = 1) AS 蔬菜,
  (SELECT COUNT(*) FROM product WHERE category_id = 2) AS 水果,
  (SELECT COUNT(*) FROM product WHERE category_id IN (8, 9, 10, 11, 21)) AS 肉類,
  (SELECT COUNT(*) FROM product WHERE category_id = 4) AS 季節水產,
  (SELECT COUNT(*) FROM product WHERE category_id = 5) AS 蛋,
  (SELECT COUNT(*) FROM product WHERE category_id = 7) AS 素料,
  (SELECT COUNT(*) FROM product WHERE category_id IN (12, 13)) AS 豆乳製品,
  (SELECT COUNT(*) FROM product WHERE category_id = 14) AS 優惠蔬菜,
  (SELECT COUNT(*) FROM product WHERE category_id = 15) AS 優惠水果,
      (SELECT COUNT(*) FROM product WHERE category_id = 16) AS 優惠素料,
      (SELECT COUNT(*) FROM product WHERE category_id = 17) AS 優惠肉類,
      (SELECT COUNT(*) FROM product WHERE category_id = 18) AS 優惠蛋類,
      (SELECT COUNT(*) FROM product WHERE category_id = 19) AS 優惠豆乳製品,
      (SELECT COUNT(*) FROM product WHERE category_id = 20) AS 優惠季節水產,
      (SELECT COUNT(*) FROM product WHERE category_id = 22) AS 豪華禮盒組
  `

  try {
    const result = await sequelize.query(categoryCountsQuery, {
      type: sequelize.QueryTypes.SELECT,
    })
    return result[0]
  } catch (error) {
    console.error('Error fetching category counts:', error)
    throw new Error('Failed to fetch category counts')
  }
}

router.get('/', async function (req, res) {
  try {
    const {
      page = 1,
      perpage = 20,
      price_gte = '',
      price_lte = '',
      sort = 'id',
      order = 'asc',
      category_id = '',
      discount_id,
      rating,
    } = req.query

    const pageNow = Number(page) || 1
    const perpageNow = Number(perpage) || 20
    const limit = perpageNow
    const offset = (pageNow - 1) * perpageNow

    const conditions = []
    if (price_gte) conditions.push(`product_price >= ${price_gte}`)
    if (price_lte) conditions.push(`product_price <= ${price_lte}`)
    if (category_id) {
      const ids = category_id.split(',').map((id) => id.trim())
      const subCategoryQuery = `SELECT id FROM product_categories WHERE parent_id IN (${ids.join(',')})`
      const categoriesWithChildren = await sequelize.query(subCategoryQuery, {
        type: sequelize.QueryTypes.SELECT,
      })
      const childIds = categoriesWithChildren.map((cat) => cat.id)
      if (childIds.length > 0) {
        conditions.push(`category_id IN (${childIds.join(',')})`)
      } else {
        conditions.push(`category_id IN (${ids.join(',')})`)
      }
    }
    if (discount_id) conditions.push(`category_id = ${discount_id}`)
    const conditionsValues = conditions.filter((v) => v)

    const where =
      conditionsValues.length > 0
        ? `WHERE ` + conditionsValues.map((v) => `( ${v} )`).join(` AND `)
        : ''

    let orderByClause = sort ? `ORDER BY ${sort} ${order}` : 'ORDER BY id ASC'

    let ratingclause = ''
    if (rating) {
      ratingclause = `HAVING ROUND(AVG(pReview.rating), 1) >= ${rating} AND ROUND(AVG(pReview.rating), 1) < ${Number(rating) + 1}  `
    }
    const mayLikeProducts = await sequelize.query(
      `SELECT p.product_name, p.product_price, p.id , pImage.image_url
      FROM product AS p
      JOIN product_image AS pImage ON p.id = pImage.product_id
      ORDER BY RAND()
      LIMIT 5;`,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    )

    const productQuery = `
    SELECT 
      p.id, 
      p.product_name, 
      p.product_price, 
      p.discount_price,
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
      LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
      ${where}
      GROUP BY p.id
      ${ratingclause}
      ${orderByClause}
      LIMIT ${limit} OFFSET ${offset}
    `
    const disCountproductQuery = `
    SELECT 
      p.id, 
      p.product_name, 
      p.product_price, 
      p.discount_price,
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
      LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
      WHERE category_id = 23
      LIMIT ${limit} OFFSET ${offset}
    `
    const categoryQuery = `
    SELECT DISTINCT id AS cateId, name AS cateName, parent_id AS parentId
    FROM product_categories
    `
    const categoryQueryDisCount = `
    SELECT DISTINCT id AS cateId, name AS cateName, parent_id AS parentId
    FROM product_categories WHERE id IN(14,15,16,17,18,19,20,23)
    `
    const [products, categories, categoryDisCount, disCountproduct] =
      await Promise.all([
        sequelize.query(productQuery, { type: sequelize.QueryTypes.SELECT }),
        sequelize.query(categoryQuery, { type: sequelize.QueryTypes.SELECT }),
        sequelize.query(categoryQueryDisCount, {
          type: sequelize.QueryTypes.SELECT,
        }),
        sequelize.query(disCountproductQuery, {
          type: sequelize.QueryTypes.SELECT,
        }),
      ])

    const productQueryCount = `
    SELECT COUNT(*) AS count
    FROM (
      SELECT p.id
      FROM product AS p
      LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
      LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
      LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
      ${where}
      GROUP BY p.id ${ratingclause}
    ) AS subquery
    `
    console.log(disCountproduct)
    const resultCount = await sequelize.query(productQueryCount, {
      type: sequelize.QueryTypes.SELECT,
    })
    const totalRecords = resultCount[0].count
    const categoryCounts = await fetchCategoryCounts()
    const totalPages = Math.ceil(totalRecords / perpageNow)
    res.json({
      status: 'success',
      data: {
        products: products,
        categories: categories,
        totalRecords: totalRecords,
        totalPages: totalPages,
        currentPage: pageNow,
        categoryCounts: categoryCounts,
        mayLikeProducts: mayLikeProducts,
        categoryDisCount: categoryDisCount,
        disCountproduct: disCountproduct,
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    // console.log(productQuery)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
      error: error.message,
    })
  }
})

router.get('/disCount', async function (req, res) {
  try {
    const {
      page = 1,
      perpage = 16,
      sort = 'id',
      order = 'asc',
      discount_id = '',
    } = req.query

    const pageNow = Number(page) || 1 //點擊的頁碼數字

    const perpageNow = Number(perpage) || 16 //顯示幾筆？
    const limit = perpageNow

    const offset = (pageNow - 1) * perpageNow //第一筆索引

    const conditions = []
    if (discount_id) {
      const ids = discount_id.split(',').map((id) => id.trim())
      conditions.push(`category_id IN (${ids.join(',')})`)
    } else {
      // 否則，使用預設的優惠分類ID
      conditions.push(`category_id IN (14,15,16,17,18,19,20,23)`)
    }
    const conditionsValues = conditions.filter((v) => v)

    const where =
      conditionsValues.length > 0
        ? `WHERE ` + conditionsValues.map((v) => `( ${v} )`).join(` AND `)
        : ''

    let orderByClause = sort ? `ORDER BY ${sort} ${order}` : 'ORDER BY id ASC'

    const mayLikeProductsQuery = `SELECT p.product_name, p.product_price, p.id , pImage.image_url , p.upload_date
    FROM product AS p
    JOIN product_image AS pImage ON p.id = pImage.product_id
    ORDER BY upload_date DESC
    LIMIT 5`

    const disCountproductQuery = `
    SELECT 
    p.id, 
    p.product_name, 
    p.product_price, 
    p.discount_price,
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
    GROUP_CONCAT(DISTINCT CONCAT_WS('|', pReview.comment, pReview.rating, pReview.user_id, DATE_FORMAT(pReview.created_at, '%Y-%m-%d %T'))) AS review_details,
    GROUP_CONCAT(DISTINCT pImg.sort_order ORDER BY pImg.sort_order) AS sort_orders
FROM 
    product AS p
    LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
    LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
    LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
    ${where}
GROUP BY 
    p.id
    ${orderByClause}
    LIMIT ${limit} OFFSET ${offset}`

    const categoryQuery = `
    SELECT DISTINCT id AS cateId, name AS cateName, parent_id AS parentId
    FROM product_categories
    `
    const categoryQueryDisCount = `
    SELECT DISTINCT id AS cateId, name AS cateName, parent_id AS parentId
    FROM product_categories WHERE id IN(14,15,16,17,18,19,20,23)
    `
    const disCountproductCount = `
    SELECT COUNT(*) AS count
    FROM (
      SELECT p.id
      FROM product AS p
      LEFT JOIN product_review AS pReview ON p.id = pReview.product_id
      LEFT JOIN product_image AS pImg ON p.id = pImg.product_id
      LEFT JOIN product_categories AS pCate ON p.category_id = pCate.id
      ${where}
      GROUP BY p.id 
    ) AS subquery
    `
    const [
      categories,
      categoryDisCount,
      disCountproduct,
      resultCount,
      mayLikeProducts,
    ] = await Promise.all([
      sequelize.query(categoryQuery, { type: sequelize.QueryTypes.SELECT }),
      sequelize.query(categoryQueryDisCount, {
        type: sequelize.QueryTypes.SELECT,
      }),
      sequelize.query(disCountproductQuery, {
        type: sequelize.QueryTypes.SELECT,
      }),
      sequelize.query(disCountproductCount, {
        type: sequelize.QueryTypes.SELECT,
      }),
      sequelize.query(mayLikeProductsQuery, {
        type: sequelize.QueryTypes.SELECT,
      }),
    ])

    const totalRecords = resultCount[0].count
    console.log('Total records:', totalRecords) //76
    const categoryCounts = await fetchCategoryCounts()
    const totalPages = Math.ceil(totalRecords / perpageNow)
    console.log(totalPages) //4
    console.log(disCountproductQuery)
    console.log('Received page:', pageNow, 'and perpage:', perpageNow)
    console.log('Calculated offset:', offset)
    res.json({
      status: 'success',
      data: {
        totalRecords: totalRecords, //總筆數
        totalPages: totalPages, //總頁數
        currentPage: pageNow, //現在第一筆索引
        categories: categories,
        categoryCounts: categoryCounts,
        mayLikeProducts: mayLikeProducts,
        categoryDisCount: categoryDisCount,
        disCountproduct: disCountproduct,
        disCountproductCount: disCountproductCount,
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
      error: error.message,
    })
  }
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/productId', async function (req, res) {
  const { id } = req.query
  const productId = id // 將id轉成數字

  try {
    const recipes = await sequelize.query(
      `SELECT * FROM recipe
      WHERE recipe__i_d IN (4,49,48,50)`,
      { type: sequelize.QueryTypes.SELECT }
    )

    const categories = await sequelize.query(
      `SELECT DISTINCT id AS cateId, name AS cateName, parent_id AS parentId, cate_png AS catePng FROM product_categories`,
      { type: sequelize.QueryTypes.SELECT }
    )

    const mayLikeProducts = await sequelize.query(
      `SELECT p.product_name, p.id, p.product_price, pImage.image_url
       FROM product AS p
       JOIN product_image AS pImage ON p.id = pImage.product_id
       WHERE p.category_id = (SELECT category_id FROM product WHERE id = :productId)
         AND p.id <> :productId
       LIMIT 5;`,
      {
        replacements: { productId }, // 使用參數化查詢來提升安全性
        type: sequelize.QueryTypes.SELECT,
      }
    )

    const categoryCounts = await fetchCategoryCounts()
    //執行資料庫搜尋 query
    const [results, metadata] = await sequelize.query(
      `
      SELECT
      p.id,
      p.product_name,
      p.category_id,
      p.product_price,
      p.discount_price,
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
        replacements: { productId: productId }, // Ensure using safe parameter passing
        type: sequelize.QueryTypes.SELECT,
      }
    )

    if (!results) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Product not found.' })
    }
    console.log(recipes)
    console.log(mayLikeProducts)
    return res.json({
      status: 'success',
      data: results, // 注意：确保只发送单个产品详情
      mayLikeProducts,
      categories,
      categoryCounts: await fetchCategoryCounts(),
      recipes,
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error.' })
  }
})

export default router
