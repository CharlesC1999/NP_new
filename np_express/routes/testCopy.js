import express from 'express'
const router = express.Router()

import db from '#configs/mysql.js'

// GET - 取得所有資料
router.get('/', async function (req, res) {
  const [Order_IDList] = await db.query('SELECT * FROM database.order;')

  return res.json({ status: 'success', data: Order_IDList })
})

export default router
