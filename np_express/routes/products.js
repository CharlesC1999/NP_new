import express from 'express'
const router = express.Router()
// 資料庫使用
import sequelize from '#configs/db.js'
const { Product } = sequelize.models
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

import db from '#configs/mysql.js'
// router.get('/', async function (req, res) {
//   res.send('product')
// })

// GET - 得到所有會員資料
router.get('/', async function (req, res) {
  const products = await Product.findAll({ logging: console.log })
  // 處理如果沒找到資料

  // 標準回傳JSON
  return res.json({ status: 'success', data: { products } })
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:pid', async function (req, res) {
  // 轉為數字
  const pid = req.params.pid

  const product = await Product.findByPk(pid, {
    raw: true, // 只需要資料表中資料
  })
  console.log(product)
  return res.json({ status: 'success', data: { product } })
})

export default router
