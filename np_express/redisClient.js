import redis from 'redis'
const redisClient = redis.createClient({ url: 'redis://localhost:6379' })
redisClient.connect().catch(console.error)

export default redisClient
