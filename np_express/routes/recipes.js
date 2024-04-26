import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Recipe } = sequelize.models

// GET - 得到所有資料
router.get('/', async function (req, res) {
  const recipes = await Recipe.findAll({ logging: console.log })
  // 處理如果沒找到資料

  // 標準回傳JSON
  return res.json({ status: 'success', data: { recipes } })
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