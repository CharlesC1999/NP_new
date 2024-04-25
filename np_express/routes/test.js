import express from 'express'
const router = express.Router()

import { getIdParam } from '##/db-helpers/db-tool.js'

import sequelize from '##/configs/db.js'
const { Speaker } = sequelize.models

// GET - 取得所有資料
router.get('/', async function (req, res) {
  const speakers = await Speaker.findAll({ logging: console.log })
  // 回傳 JSON
  return res.json({ status: 'success', data: { speakers } })
})

// GET - 取得單筆資料
router.get('/:id', async function (req, res) {
  // 轉為數字
  const id = getIdParam(req)

  const speaker = await Speaker.findByPk(id, {
    raw: true, //只需要資料表中資料
  })
  return res.json({ status: 'success', data: { speaker } })
})

export default router
