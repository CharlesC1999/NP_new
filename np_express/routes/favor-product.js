import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

import authenticate from '#middlewares/authenticate.js'
import sequelize from '#configs/db.js'
const { Favor_product} = sequelize.models


// 取得會員頁所需食譜資料
// 獲得某會員id的有加入到我的最愛清單中的食譜id們
// 此路由只有登入會員能使用
// 用於列表頁
// 用於會員中心收藏頁
router.get('/',  async (req, res) => {
  const pids = await Favor_product.findAll({
    attributes: ['pid'],
    where: {
      uid: 1
    },
    raw: true, //只需要資料
  })

  // 將結果中的pid取出變為一個純資料的陣列
  const favorProduct = pids.map((v) => v.pid)
  

  res.json({ status: 'success', data: { favorProduct } })
})

// 會員加入收藏
router.put('/:id', async (req, res, next) => {
  const pid = getIdParam(req)
  const uid = 1

  const existFav = await Favor_product.findOne({ where: { pid, uid } })
  if (existFav) {
    return res.json({ status: 'error', message: '資料已經存在，新增失敗' })
  }

  const newFav = await Favor_product.create({ pid, uid })

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
  const pid = getIdParam(req)
  const uid = 1

  const affectedRows = await Favor_product.destroy({
    where: {
      pid,
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