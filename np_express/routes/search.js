// 在後端處理搜索
import express from 'express'
const router = express.Router()
import { Op } from 'sequelize'
import sequelize from '##/configs/db.js'
const { Product, Class, Recipe } = sequelize.models
import 'dotenv/config.js'

router.post('/findAll', async (req, res) => {
  console.log('bonA')

  try {
    // 從請求體中獲取搜尋條件
    const { searchText } = req.body

    // 並行執行所有查詢
    const [products, classes, recipes] = await Promise.all([
      Product.findAll({
        where: {
          name: { [sequelize.Op.like]: `%${searchText}%` },
        },
      }),
      Class.findAll({
        where: {
          name: { [sequelize.Op.like]: `%${searchText}%` },
        },
      }),
      Recipe.findAll({
        where: {
          name: { [sequelize.Op.like]: `%${searchText}%` },
        },
      }),
    ])

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
    // 從請求體中獲取搜尋條件，例如 'searchText'
    const { searchText } = req.body
    // 使用 Sequelize 模型進行搜尋，這裡假設 'name' 是要搜尋的欄位
    const products = await Product.findAll({
      where: {
        product_name: {
          [Op.like]: `%${searchText}%`, // 使用 LIKE 查詢匹配名稱
        },
      },
    })

    // 檢查是否找到商品
    if (products.length > 0) {
      res.json(products) // 返回查找到的商品數據
    } else {
      res.status(404).send('No products found') // 沒有找到商品時返回 404
    }
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).send('Error searching for products') // 處理任何可能的錯誤
  }
})

router.post('/findClass', async (req, res) => {
  console.log('bonC')

  try {
    // 從請求體中獲取搜尋條件，例如 'searchText'
    const { searchText } = req.body
    // 使用 Sequelize 模型進行搜尋，這裡假設 'name' 是要搜尋的欄位
    const classes = await Class.findAll({
      where: {
        Class_name: {
          [Op.like]: `%${searchText}%`, // 使用 LIKE 查詢匹配名稱
        },
      },
    })

    // 檢查是否找到商品
    if (classes.length > 0) {
      res.json(classes) // 返回查找到的商品數據
    } else {
      res.status(404).send('No classes found') // 沒有找到商品時返回 404
    }
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).send('Error searching for products') // 處理任何可能的錯誤
  }
})

router.post('/findRecipe', async (req, res) => {
  console.log('bonR')

  try {
    // 從請求體中獲取搜尋條件，例如 'searchText'
    const { searchText } = req.body
    // 使用 Sequelize 模型進行搜尋，這裡假設 'name' 是要搜尋的欄位
    const recipes = await Recipe.findAll({
      where: {
        Title_R_name: {
          [Op.like]: `%${searchText}%`, // 使用 LIKE 查詢匹配名稱
        },
      },
    })

    // 檢查是否找到商品
    if (recipes.length > 0) {
      res.json(recipes) // 返回查找到的商品數據
    } else {
      res.status(404).send('No recipes found') // 沒有找到商品時返回 404
    }
  } catch (error) {
    console.error('Error searching products:', error)
    res.status(500).send('Error searching for products') // 處理任何可能的錯誤
  }
})

export default router
