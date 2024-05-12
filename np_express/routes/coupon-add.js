import express from 'express'

const router = express.Router()

// 資料庫使用
import db from '#configs/mysql.js'

// 格式化日期为 'YYYY-MM-DD'
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 列表頁
router.post('/', async function (req, res) {
  const currentDate = new Date()
  // 获取结束日期（当前日期加上30天）
  const endDate = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000) // 加上30天的毫秒数
  const member__i_d = req.body.member__i_d
  const c_name = '首次註冊禮'
  const c_code = '我愛nuritpolls'
  const discount_amount = 10
  const discount_type = '金額'
  const coupon_description = '首次註冊禮'
  const valid_start_date = formatDate(currentDate)
  const valid_end_date = formatDate(endDate)
  const coupon_image = null
  const minimum_spend = 100
  const valid = 1
  const c_status = '可使用'

  // 查询数据库是否已存在该用户领取过该优惠券的记录
  const sqlCouponCheck = `SELECT * FROM coupons WHERE member__i_d = ? AND c_code = ?`

  try {
    const [rows, fields] = await db.query(sqlCouponCheck, [member__i_d, c_code])

    // 如果查询结果中存在记录，则返回已领取过优惠券的提示
    if (rows.length > 0) {
      return res
        .status(400)
        .json({ status: 'error', message: '已領取過此優惠券' })
    }

    // 如果查询结果中不存在记录，则执行新增操作
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
  // 轉為數字，  上面的status要等於下面的req.params.status裡面的status
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
