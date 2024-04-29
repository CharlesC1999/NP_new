import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Member from '../models/Member.js'
import redisClient from '../redisClient.js'

const router = express.Router()

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  const isLoggedOut = await redisClient.get(token)
  if (isLoggedOut) return res.status(401).send('Token has been logged out')

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    req.token = token // 儲存 token 以便後續使用
    next()
  })
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await Member.findOne({ where: { username } })
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        { username: user.username, id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '2h' }
      )
      res.json({ accessToken })
    } else {
      res.status(400).send('Username or password is incorrect')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

router.delete('/logout', authenticateToken, async (req, res) => {
  const { token } = req
  const expiresIn = 2 * 60 * 60 // 2 hours in seconds
  await redisClient.setEx(token, expiresIn, 'loggedOut')
  res.send('Logged out successfully')
})

export default router
