import express from 'express'
const router = express.Router()

// 引入 Sequelize 配置和模型
import sequelize from '##/configs/db.js'
const { Member } = sequelize.models

// 定義 GET 路由處理 '/' 請求，不用再多輸入
router.get('/', async (req, res) => {
  const { Email } = req.query
  console.log('Received email check request for:', Email)
  try {
    // 使用 Sequelize 的 count 方法來確定特定 email 是否存在
    console.log('Checking database for email:', Email)
    const count = await Member.count({
      where: { Email: Email },
    })
    // 如果 count 大於 0，表示找到了至少一個符合的結果
    console.log('Database check complete, count:', count)
    res.status(200).json({ exists: count > 0 })
  } catch (error) {
    console.error('Database query failed:', error)
    res.status(500).json({ message: 'Database query failed' })
  }
})

export default router
