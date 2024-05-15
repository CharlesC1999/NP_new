import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
// const { Recipe } = sequelize.models
const { Recipe_Categories } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'

// GET - 得到所有資料
router.get('/', async function (req, res) {
  // * 改成用raw-sql加上join串食譜跟分類
  // const recipes = await Recipe.findAll({ logging: console.log })

  // 從網址查詢字串解構的值
  const {
    page = 1,
    perpage = 6,
    recipe_category__i_d = '',
    sort = 'recipe__i_d',
    order = 'asc',
  } = req.query

  // 分頁用
  // page預設為1，perpage預設為3
  const perpageNow = Number(perpage) || 6
  const pageNow = Number(page) || 1
  const limit = perpageNow
  const offset = (pageNow - 1) * perpageNow

  // 建立資料庫搜尋條件(where從句用)，每個條件用陣列存放，串接時用join(' AND ')
  const conditions = []

  // 食譜類別
  conditions[0] = recipe_category__i_d
    ? `recipe_category__i_d = ${recipe_category__i_d}`
    : ''

  // 去除空字串
  const conditionsValues = conditions.filter((v) => v)

  // 各條件需要先包含在`()`中，因各自內查詢是OR, 與其它的是AND
  const where =
    conditionsValues.length > 0
      ? `WHERE ` + conditionsValues.map((v) => `( ${v} )`).join(` AND `)
      : ''

  // 排序用
  const orderby = `ORDER BY ${sort} ${order}`

  // 食譜join分類表
  const sqlCate = `
  SELECT r.*, rcs.Recipe_cate_Name 
  FROM recipe AS r JOIN recipe_categories AS rcs 
  ON r.recipe_category__i_d = rcs.recipe_cate__i_d 
  ${where} ${orderby}
  LIMIT ${limit} OFFSET ${offset}
  `

  // 查詢總筆數的sql語法
  const sqlCountAll = `SELECT COUNT(*) AS countCate FROM recipe ${where}`

  // 食譜各個類別的筆數，用來顯示在sideBar
  // ---------------------------start----------------------
  // 主食
  const sqlStaple = `SELECT COUNT(*) AS countStaple FROM recipe WHERE recipe_category__i_d = 1`
  const [stapleCount] = await db.query(sqlStaple)
  const finalStapleCount = stapleCount[0].countStaple
  // 醬料
  const sqlSauce = `SELECT COUNT(*) AS countSauce FROM recipe WHERE recipe_category__i_d = 2`
  const [sauceCount] = await db.query(sqlSauce)
  const finalSauceCount = sauceCount[0].countSauce

  //湯品
  const sqlSoup = `SELECT COUNT(*) AS countSoup FROM recipe WHERE recipe_category__i_d = 3`
  const [soupCount] = await db.query(sqlSoup)
  const finalSoupCount = soupCount[0].countSoup

  //飲品
  const sqlDrink = `SELECT COUNT(*) AS countDrink FROM recipe WHERE recipe_category__i_d = 4`
  const [drinkCount] = await db.query(sqlDrink)
  const finalDrinkCount = drinkCount[0].countDrink

  //點心
  const sqlSnack = `SELECT COUNT(*) AS countSnack FROM recipe WHERE recipe_category__i_d = 5`
  const [snackCount] = await db.query(sqlSnack)
  const finalSnackCount = snackCount[0].countSnack

  //沙拉
  const sqlSalad = `SELECT COUNT(*) AS countSalad FROM recipe WHERE recipe_category__i_d = 6`
  const [saladCount] = await db.query(sqlSalad)
  const finalSaladCount = saladCount[0].countSalad

  // ---------------------------end----------------------

  // 食譜join分類表查詢結果
  const [recipesRawSql] = await db.query(sqlCate)
  // 食譜join分類表總筆數(分頁用)
  const [countAllRawSql] = await db.query(sqlCountAll)
  // 回傳總筆數
  const total = countAllRawSql[0].countCate
  // 計算分頁所需的頁數
  const pageCount = Math.ceil(total / Number(perpage)) || 0

  // 給TopBar用的總筆數
  const sqlCountAllTopBar = `SELECT COUNT(*) AS countCate FROM recipe`
  // 主食
  const sqlAllTopBar = `SELECT COUNT(*) AS countAll FROM recipe`
  const [allCountTopBar] = await db.query(sqlAllTopBar)
  const finalAllCountTopBar = allCountTopBar[0].countAll

  // 得到所有食譜分類名稱
  const recipesCategories = await Recipe_Categories.findAll({
    logging: console.log,
  })

  // 標準回傳JSON
  return res.json({
    status: 'success',
    data: {
      recipesCategories,
      recipesRawSql,
      total,
      finalAllCountTopBar,
      pageCount,
      finalStapleCount,
      finalSauceCount,
      finalSoupCount,
      finalDrinkCount,
      finalSnackCount,
      finalSaladCount,
    },
  })
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/recipeId', async function (req, res) {
  const { id } = req.query
  console.log('id=========================', id)
  // 轉為數字
  const recipeId = id

  // 食譜join分類表
  const sqlRecipe = `
    SELECT r.*, rcs.Recipe_cate_Name 
    FROM recipe AS r JOIN recipe_categories AS rcs 
    ON r.recipe_category__i_d = rcs.recipe_cate__i_d 
    WHERE recipe__i_d = ${recipeId}`
  // 回傳的是陣列，後面有一堆看不懂的東西，所以用陣列解構得到對應的資料
  const [recipe] = await db.query(sqlRecipe)
  // 上面得到的資料還是陣列，要取出第一個值，所以用[0]
  const finalRecipe = recipe[0]

  // 取出該食譜的類別ID，要用來得到此類別的所有食譜，放在食譜細節頁的推薦食譜中
  const recipeCategoryId = finalRecipe.recipe_category__i_d
  // 查詢該類別的所有食譜，但不包含自己
  const sqlRecipeCategories = `
  SELECT r.*, rcs.Recipe_cate_Name 
  FROM recipe AS r JOIN recipe_categories AS rcs 
  ON r.recipe_category__i_d = rcs.recipe_cate__i_d 
  WHERE recipe_category__i_d = ${recipeCategoryId} && recipe__i_d != ${recipeId}`
  const [recipeCategories] = await db.query(sqlRecipeCategories)

  // 計算該類別的所有食譜數量，不包含自己
  const sqlRecipesCount = `SELECT COUNT(*) AS countRecipes FROM recipe WHERE recipe_category__i_d = ${recipeCategoryId} && recipe__i_d != ${recipeId}`
  const [RecipesCount] = await db.query(sqlRecipesCount)
  const finalRecipesCount = RecipesCount[0].countRecipes

  return res.json({
    status: 'success',
    data: { finalRecipe, recipeCategories, finalRecipesCount },
  })
})

//GET - 得到食譜的相關商品
router.get('/:recipeId/relatedProducts', async function (req, res) {
  // 轉為數字
  const recipeId = req.params.recipeId

  const sqlRelatedProducts = `
  SELECT rrp.*, p.id, p.product_name AS name, p.product_price AS price, p.discount_price, pi.image_url AS image
  FROM recipe_related_products AS rrp 
  JOIN product AS p ON rrp.product__i_d = p.id
  JOIN product_image AS pi ON p.id = pi.product_id
  WHERE recipe__i_d = ${recipeId}
  `

  const [relatedProducts] = await db.query(sqlRelatedProducts)

  // 如果沒有相關商品，回傳空陣列
  if (relatedProducts.length === 0) {
    return res.json({
      status: 'success',
      message: '查無結果',
      data: { relatedProducts },
    })
  }

  return res.json({ status: 'success', data: { relatedProducts } })
})

export default router
