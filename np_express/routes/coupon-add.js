import express from 'express'

const router = express.Router()

// 資料庫使用
import db from '#configs/mysql.js'

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 列表頁
router.post('/', async function (req, res) {
  const currentDate = new Date()

  const endDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)
  const member__i_d = req.body.member__i_d
  const c_name = '首次註冊禮'
  const c_code = '我愛nuritpolls'
  const discount_amount = 10
  const discount_type = '金額'
  const coupon_description = '首次註冊禮'
  const valid_start_date = formatDate(currentDate)
  const valid_end_date = formatDate(endDate)
  const coupon_image = 'NPLove.png'
  const minimum_spend = 100
  const valid = 1
  const c_status = '可使用'

  const sqlCouponCheck = `SELECT * FROM coupons WHERE member__i_d = ? AND c_code = ?`

  try {
    const [rows, fields] = await db.query(sqlCouponCheck, [member__i_d, c_code])

    if (rows.length > 0) {
      return res
        .status(400)
        .json({ status: 'error', message: '已領取過此優惠券' })
    }

    const sqlCouponInsert = `INSERT INTO coupons (member__i_d , c_name, c_code , discount_amount,discount_type,coupon_description,valid_start_date,valid_end_date,coupon_image,minimum_spend,valid, 	c_status) 
    VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?);`

    const values = [
      member__i_d,
      c_name,
      c_code,
      discount_amount,
      discount_type,
      coupon_description,
      valid_start_date,
      valid_end_date,
      coupon_image,
      minimum_spend,
      valid,
      c_status,
    ]

    await db.query(sqlCouponInsert, values)
    return res.json({
      status: 'success',
      message: 'Coupon inserted successfully',
    })
  } catch (error) {
    console.error('Error inserting coupon:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Failed to insert coupon' })
  }
})

router.get('/:status', async function (req, res) {
  const couponsStatus = req.params.status

  const sqlOrders = `SELECT * FROM coupons WHERE coupons.C_status = "${couponsStatus}"`

  try {
    const [rows, fields] = await db.query(sqlOrders)
    return res.json({ status: 'success', data: { coupons: rows } })
  } catch (error) {
    console.error('Error fetching coupons:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Failed to fetch coupons' })
  }
})

export default router
