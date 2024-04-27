import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Recipe } = sequelize.models
const { Recipe_Categories } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'

// GET - 得到所有資料
router.get('/', async function (req, res) {
  const recipes = await Recipe.findAll({ logging: console.log })
  // 處理如果沒找到資料

  const sqlCate =
    'SELECT r.*, rcs.Recipe_cate_Name FROM recipe AS r JOIN recipe_categories AS rcs ON r.recipe_category__i_d = rcs.recipe_cate__i_d'

  const [rows] = await db.query(sqlCate)

  //得到所有食譜分類名稱
  const recipesCategories = await Recipe_Categories.findAll({
    logging: console.log,
  })

  // 標準回傳JSON
  return res.json({
    status: 'success',
    data: { recipes, recipesCategories, products: rows },
  })
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:recipeId', async function (req, res) {
  // 轉為數字
  const recipeId = req.params.recipeId

  const recipe = await Recipe.findByPk(recipeId, {
    raw: true, // 只需要資料表中資料
  })

  return res.json({ status: 'success', data: { recipe } })
})

export default router
