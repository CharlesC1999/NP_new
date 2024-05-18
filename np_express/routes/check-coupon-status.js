import express from 'express'
import db from '#configs/mysql.js'

const router = express.Router()

// 检查用户是否已领取优惠券
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId // 从查询参数中获取 userID

    // 查询数据库是否已存在该用户领取过优惠券的记录
    const sqlCouponCheck = `SELECT * FROM coupons WHERE member__i_d = ? AND coupon_description = 'LV1才能領'`
    const [rows, fields] = await db.query(sqlCouponCheck, [userId])

    // 如果查询结果中不存在记录，则返回 false
    if (rows.length === 0) {
      return res.json({ hasCoupon: false })
    } else {
      return res.json({ hasCoupon: true })
    }
  } catch (error) {
    console.error('Error checking coupon status:', error)
    return res.status(500).json({ error: error.message })
  }
})

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
// 发放优惠券
// 发放优惠券
router.post('/', async (req, res) => {
  try {
    const userId = req.body.userId // 从请求体中获取 userID

    // 定义优惠券信息数组
    const coupons = [
      {
        c_name: 'LV1專屬',
        c_code: 'LV1才能領',
        coupon_description: 'LV1才能領',
        discount_amount: 100,
        minimum_spend: 1000,
      },
      {
        c_name: 'LV2專屬',
        c_code: 'LV2才能領',
        coupon_description: 'LV2才能領',
        discount_amount: 200,
        minimum_spend: 2000,
      },
      {
        c_name: 'LV3專屬',
        c_code: 'LV3才能領',
        coupon_description: 'LV3才能領',
        discount_amount: 300,
        minimum_spend: 3000,
      },
      {
        c_name: 'LV4專屬',
        c_code: 'LV4才能領',
        coupon_description: 'LV4才能領',
        discount_amount: 400,
        minimum_spend: 4000,
      },
      {
        c_name: 'LV5專屬',
        c_code: 'LV5才能領',
        coupon_description: 'LV5才能領',
        discount_amount: 500,
        minimum_spend: 5000,
      },
    ]

    // 查询用户已领取的优惠券
    const sqlCouponCheck = `SELECT coupon_description FROM coupons WHERE member__i_d = ?`
    const [rows, fields] = await db.query(sqlCouponCheck, [userId])

    // 提取已领取的优惠券描述
    const receivedCoupons = rows.map((row) => row.coupon_description)

    // 筛选出用户未领取的其他优惠券（不包括已领取的优惠券）
    const unreceivedCoupons = coupons.filter(
      (coupon) => !receivedCoupons.includes(coupon.coupon_description)
    )

    // 如果用户未领取的其他优惠券不为空，则为用户发放这些优惠券
    if (unreceivedCoupons.length > 0) {
      // 遍历未领取的优惠券信息，为用户发放
      for (const coupon of unreceivedCoupons) {
        // 生成优惠券信息
        const {
          c_name,
          c_code,
          coupon_description,
          discount_amount,
          minimum_spend,
        } = coupon
        const valid_start_date = formatDate(new Date())
        const valid_end_date = formatDate(
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        ) // 加上30天的毫秒数
        const coupon_image = '-100.png'
        const valid = 1
        const c_status = '已發送'

        // 将优惠券信息插入到数据库中
        const sqlCouponInsert = `INSERT INTO coupons (member__i_d , c_name, c_code , discount_amount,discount_type,coupon_description,valid_start_date,valid_end_date,coupon_image,minimum_spend,valid, c_status) 
          VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?);`

        const values = [
          userId,
          c_name,
          c_code,
          discount_amount,
          '金額',
          coupon_description,
          valid_start_date,
          valid_end_date,
          coupon_image,
          minimum_spend,
          valid,
          c_status,
        ]
        console.log(values)

        await db.query(sqlCouponInsert, values)
      }

      // 通知用户发放成功
      return res.json({ status: 'success', message: '优惠券发放成功' })
    } else {
      // 如果用户已领取过所有优惠券，则返回提示信息
      return res.json({ status: 'error', message: '用户已领取过所有优惠券' })
    }
  } catch (error) {
    console.error('Error sending coupons:', error)
    return res.status(500).json({ error: error.message })
  }
})

export default router
