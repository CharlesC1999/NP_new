import express from 'express'
import db from '#configs/mysql.js'
const router = express.Router()

router.get('/getCouponsDetail', async (req, res) => {
  const { member } = req.query

  console.log('Request received for /getCouponsDetail')
  const sql = `SELECT cu.* FROM coupons AS cu WHERE cu.member__i_d = ${member} AND cu.c_status = "可使用"`
  console.log(member, 'gggggg')
  console.log(sql)

  try {
    const [couponsSql, fields] = await db.query(sql)
    return res.json({ status: 'success', data: { couponsSql } })
  } catch (error) {
    console.error('Error fetching coupons:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' })
  }
})

export default router
