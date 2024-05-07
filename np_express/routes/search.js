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
          product_name: { [Op.like]: `%${searchText}%` },
        },
      }),
      Class.findAll({
        where: {
          Class_name: { [Op.like]: `%${searchText}%` },
        },
      }),
      Recipe.findAll({
        where: {
          Title_R_name: { [Op.like]: `%${searchText}%` },
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
    const { searchText } = req.body

    // 執行產品查詢
    const products = await Product.findAll({
      where: {
        product_name: {
          [Op.like]: `%${searchText}%`,
        },
      },
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
    const classes = await Class.findAll({
      where: {
        Class_name: {
          [Op.like]: `%${searchText}%`,
        },
      },
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
    const recipes = await Recipe.findAll({
      where: {
        Title_R_name: {
          [Op.like]: `%${searchText}%`,
        },
      },
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
