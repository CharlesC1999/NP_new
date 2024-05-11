import express from 'express'
const router = express.Router()
import authenticateToken from '#middlewares/authenticateToken.js'
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

import authenticate from '#middlewares/authenticate.js'
import sequelize from '#configs/db.js'
const { Favor_recipe } = sequelize.models
import db from '#configs/mysql.js'

// 取得會員頁所需渲染的食譜資料
// 獲得某會員id的有加入到我的最愛清單中的食譜id們
// 此路由只有登入會員能使用
router.get('/', authenticateToken, async (req, res) => {
  const userID = req.user.id
  const rids = await Favor_recipe.findAll({
    attributes: ['rid'],
    where: {
      uid: req.user.id,
    },
    raw: true, //只需要資料
  })

  // 將結果中的rid取出變為一個純資料的陣列
  const favorRecipe = rids.map((v) => v.rid)

  // 取得會員頁所需食譜資料
  // uid 為變數，根據會員 id 返回查詢結果，先用 uid =1 來測試
  const recipeDataSql = `SELECT recipe.*,favor_recipe.uid,favor_recipe.created_at,recipe_categories.Recipe_cate_Name
  FROM recipe
  JOIN favor_recipe ON recipe.recipe__i_d = favor_recipe.rid 
JOIN recipe_categories ON recipe.recipe_category__i_d = recipe_categories.recipe_cate__i_d
  WHERE uid =${userID}`
  const [recipeFavorData] = await db.query(recipeDataSql)
  res.json({ status: 'success', data: { favorRecipe, recipeFavorData } })
})

// 會員加入收藏
router.put('/:id', authenticateToken,async (req, res, next) => {
  const rid = getIdParam(req)
  const uid = req.user.id

  const existFav = await Favor_recipe.findOne({ where: { rid, uid } })
  if (existFav) {
    return res.json({ status: 'error', message: '資料已經存在，新增失敗' })
  }

  const newFav = await Favor_recipe.create({ rid, uid })

  // console.log(newFav.id)

  // 沒有新增到資料
  if (!newFav.id) {
    return res.json({
      status: 'error',
      message: '新增失敗',
    })
  }

  return res.json({ status: 'success', data: null })
})
// 會員移除收藏
router.delete('/:id', authenticateToken,async (req, res, next) => {
  const rid = getIdParam(req)
  const uid = req.user.id

  const affectedRows = await Favor_recipe.destroy({
    where: {
      rid,
      uid,
    },
  })

  // 沒有刪除到任何資料 -> 失敗或沒有資料被刪除
  if (!affectedRows) {
    return res.json({
      status: 'error',
      message: '刪除失敗',
    })
  }

  // 成功
  return res.json({ status: 'success', data: null })
})

export default router
