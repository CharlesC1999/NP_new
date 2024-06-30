// 在後端處理搜索
import express from 'express'
const router = express.Router()
// import { Op } from 'sequelize'
import sequelize from '##/configs/db.js'
// const { Product, Class, Recipe } = sequelize.models
import 'dotenv/config.js'

router.post('/findAll', async (req, res) => {
  console.log('bonA')

  try {
    // 從請求體中獲取搜尋條件
    const { searchText } = req.body //測試用 "肉"，直接在路由跑，要把{}拿掉
    // 並行執行所有查詢
    const sqlP = `
    SELECT *, ROUND(AVG(product_review.rating), 1) AS average_rating FROM product 
    JOIN product_categories ON product.category_id = product_categories.id 
    JOIN product_image ON product.id = product_image.product_id 
    JOIN product_review ON product.id = product_review.product_id 
    WHERE product_name LIKE :searchText AND product_image.sort_order = 0 
    GROUP BY product.id, product_categories.name, product_image.image_url
    `
    const sqlC = `SELECT * FROM class 
    JOIN class_categories ON class.class_category__i_d = class_categories.class_cate__i_d 
    JOIN class_image ON class.class__i_d = class_image.f__class__i_d 
    JOIN speaker ON class.f__speaker__i_d = speaker.speaker_id 
    WHERE class_name LIKE :searchText AND class_image.sort_order = 0`

    const sqlR = `SELECT * FROM recipe 
    JOIN recipe_categories ON recipe.recipe_category__i_d = recipe_categories.recipe_cate__i_d 
    WHERE 	title__r_name LIKE :searchText`

    const products = await sequelize.query(sqlP, {
      replacements: { searchText: `%${searchText}%` },
      type: sequelize.QueryTypes.SELECT,
    })
    const classes = await sequelize.query(sqlC, {
      replacements: { searchText: `%${searchText}%` },
      type: sequelize.QueryTypes.SELECT,
    })
    const recipes = await sequelize.query(sqlR, {
      replacements: { searchText: `%${searchText}%` },
      type: sequelize.QueryTypes.SELECT,
    })
    // 返回結果
    res.json({
      products,
      classes,
      recipes,
    })
  } catch (error) {
    console.error('Error searching across tables:', error)
    res.status(500).send('Error searching across tables')
  }
})

router.post('/findProduct', async (req, res) => {
  console.log('bonP')

  try {
    const { searchText } = req.body //測試用 "肉"
    console.log(searchText)
    // 執行產品查詢
    const sql = `
    SELECT *, ROUND(AVG(product_review.rating), 1) AS average_rating FROM product 
    JOIN product_categories ON product.category_id = product_categories.id 
    JOIN product_image ON product.id = product_image.product_id 
    JOIN product_review ON product.id = product_review.product_id 
    WHERE product_name LIKE :searchText AND product_image.sort_order = 0 
    GROUP BY product.id, product_categories.name, product_image.image_url
    `

    const products = await sequelize.query(sql, {
      replacements: { searchText: `%${searchText}%` },
      type: sequelize.QueryTypes.SELECT,
    })

    // 返回結果，其中 classes 和 recipes 為空陣列
    res.json({
      products,
      classes: [], // 故意回傳空陣列
      recipes: [], // 故意回傳空陣列
    })
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).send('Error searching for products')
  }
})

router.post('/findClass', async (req, res) => {
  console.log('bonC')

  try {
    const { searchText } = req.body

    // 執行產品查詢
    const sql =
      'SELECT * FROM class JOIN class_categories ON class.class_category__i_d = class_categories.class_cate__i_d JOIN class_image ON class.class__i_d = class_image.f__class__i_d JOIN speaker ON class.f__speaker__i_d = speaker.speaker_id WHERE class_name LIKE :searchText AND class_image.sort_order = 0'

    const classes = await sequelize.query(sql, {
      replacements: { searchText: `%${searchText}%` },
      type: sequelize.QueryTypes.SELECT,
    })

    // 返回結果，其中 classes 和 recipes 為空陣列
    res.json({
      products: [], // 故意回傳空陣列
      classes,
      recipes: [], // 故意回傳空陣列
    })
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).send('Error searching for products')
  }
})

router.post('/findRecipe', async (req, res) => {
  console.log('bonR')

  try {
    const { searchText } = req.body

    // 執行產品查詢
    const sql =
      'SELECT * FROM recipe JOIN recipe_categories ON recipe.recipe_category__i_d = recipe_categories.recipe_cate__i_d WHERE 	title__r_name LIKE :searchText'

    const recipes = await sequelize.query(sql, {
      replacements: { searchText: `%${searchText}%` },
      type: sequelize.QueryTypes.SELECT,
    })

    // 返回結果，其中 classes 和 recipes 為空陣列
    res.json({
      products: [], // 故意回傳空陣列
      classes: [], // 故意回傳空陣列
      recipes,
    })
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).send('Error searching for products')
  }
})

export default router
