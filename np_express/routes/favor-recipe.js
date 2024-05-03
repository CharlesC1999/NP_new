import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

import authenticate from '#middlewares/authenticate.js'
import sequelize from '#configs/db.js'
const { Favor_recipe} = sequelize.models
import db from '#configs/mysql.js'

// 取得會員頁所需渲染的食譜資料
// 獲得某會員id的有加入到我的最愛清單中的食譜id們
// 此路由只有登入會員能使用
router.get('/',  async (req, res) => {
  const rids = await Favor_recipe.findAll({
    attributes: ['rid'],
    where: {
      uid: 1
    },
    raw: true, //只需要資料
  })

  // 將結果中的rid取出變為一個純資料的陣列
  const favorRecipe = rids.map((v) => v.rid)

  // 取得會員頁所需食譜資料
  // uid 為變數，根據會員 id 返回查詢結果，先用 uid =1 來測試
  const recipeDataSql = `SELECT recipe.*,favor_recipe.uid
  FROM recipe
  JOIN favor_recipe ON recipe.recipe__i_d = favor_recipe.rid 
  WHERE uid =1
  `
  const [recipeFavorData] = await db.query(recipeDataSql)
  res.json({ status: 'success', data: { favorRecipe,recipeFavorData} })
})

// 會員加入收藏
router.put('/:id', async (req, res, next) => {
  const rid = getIdParam(req)
  const uid = 1

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
router.delete('/:id',  async (req, res, next) => {
  const rid = getIdParam(req)
  const uid = 1

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