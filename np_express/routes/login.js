// routes/auth.js
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router = express.Router()
import sequelize from '##/configs/db.js'
const { Member } = sequelize.models

router.post('/', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await Member.findOne({ where: { Account: username } })
    console.log({ Account: username })

    if (user && bcrypt.compareSync(password, user.Password)) {
      const token = jwt.sign(
        { id: user.id, Account: user.Account },
        'your-secret-key',
        { expiresIn: '25m' }
      )
      res.status(200).json({ token })
    } else {
      res.status(401).json({ message: 'Authentication failed' })
    }
  } catch (error) {
    console.error('Database error:', error)
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

export default router