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
  // 改成用raw-sql加上join串食譜跟分類
  // const recipes = await Recipe.findAll({ logging: console.log })

  // 從網址查詢字串解構的值
  const { page = 1, perpage = 6 } = req.query

  // 分頁用
  // page預設為1，perpage預設為3
  const perpageNow = Number(perpage) || 6
  const pageNow = Number(page) || 1
  const limit = perpageNow
  const offset = (pageNow - 1) * perpageNow

  // 食譜join分類表
  const sqlCate = `
  SELECT r.*, rcs.Recipe_cate_Name 
  FROM recipe AS r JOIN recipe_categories AS rcs 
  ON r.recipe_category__i_d = rcs.recipe_cate__i_d 
  LIMIT ${limit} OFFSET ${offset}
  `
  const sqlCountCate = `SELECT COUNT(*) AS countCate FROM recipe`

  // 食譜join分類表查詢結果
  const [recipesRawSql] = await db.query(sqlCate)
  // 食譜join分類表總筆數(分頁用)
  const [countCateRawSql] = await db.query(sqlCountCate)
  // 回傳總筆數
  const total = countCateRawSql[0].countCate
  // 計算分頁所需的頁數
  const pageCount = Math.ceil(total / Number(perpage)) || 0

  // 得到所有食譜分類名稱
  const recipesCategories = await Recipe_Categories.findAll({
    logging: console.log,
  })

  // 標準回傳JSON
  return res.json({
    status: 'success',
    data: { recipesCategories, recipesRawSql, total, pageCount },
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
