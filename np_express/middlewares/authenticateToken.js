import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
import redisClient from '../redisClient.js'
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]
  // console.log(token)
  if (!token) {
    return res.json({
      status: 'error',
      message: '授權失敗，沒有存取令牌',
    })
  }
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    // console.log(user.id)
    // 附加到 req 上讓後續路由可以使用
    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .send({ error: 'Token expired, please log in again.' })
    } else {
      return res.status(403).send({ error: 'Invalid token.' })
    }
  }
}

export default authenticateToken
