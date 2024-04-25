import express from 'express'
import mysql from 'mysql2/promise'

const router = express.Router()

// 資料庫連接配置
const dbConfig = {
  host: 'localhost',
  user: 'admin',
  password: '12345',
  database: 'nutripolls',
}

// GET - 取得所有資料
router.get('/', async function (req, res) {
  const connection = await mysql.createConnection(dbConfig)
  try {
    const [speakers] = await connection.query('SELECT * FROM test')
    res.json({ status: 'success', data: { speakers } })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  } finally {
    await connection.end()
  }
})

// GET - 取得單筆資料
router.get('/:id', async function (req, res) {
  const id = parseInt(req.params.id, 10) // 確保 id 是數字
  const connection = await mysql.createConnection(dbConfig)
  try {
    const [speaker] = await connection.query(
      'SELECT * FROM test WHERE speaker_id = ?',
      [id]
    )
    res.json({ status: 'success', data: { speaker: speaker[0] } })
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  } finally {
    await connection.end()
  }
})

export default router
