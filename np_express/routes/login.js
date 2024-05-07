// routes/auth.js
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router = express.Router()
import sequelize from '##/configs/db.js'
const { Member } = sequelize.models
import 'dotenv/config.js'

router.post('/', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await Member.findOne({ where: { Account: username } })
    console.log({ Account: username })

    if (user && bcrypt.compareSync(password, user.Password)) {
      const token = jwt.sign(
        { id: user.id, Account: user.Account },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '24h' }
      )
      res.status(200).json({
        token,
        userData: {
          id: user.id,
          name: user.User_name,
          username: user.Account,
          // email: user.Email,
          // phone: user.Phone,
          // gender: user.Gender,
          // birthday: user.date_of_birth,
          address: user.User_image,
          // 其他的到登入頁面抓，不然存放太危險???
        },
      })
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
