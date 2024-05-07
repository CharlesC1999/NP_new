import express from 'express'
const router = express.Router()
// sequelize db
import sequelize from '#configs/db.js'
// 一般sql
import db from '#configs/mysql.js'

const { Orders, Order_details, Orders2 } = sequelize.models

import { v4 as uuidv4 } from 'uuid'
// import Orders2 from '##/models/Orders2'
import 'dotenv/config.js'

router.post('/', async (req, res, next) => {
  console.log(req.body)
  // const ordeData = req.body
  // const orderId = res.json({ status: 'success' })

  // 從請求中提取訂單資訊
  try {
    const {
      items,
      classItems,
      totalPrice,
      couponId,
      discountPrice,
      finalPrice,
      receiverName,
      phoneNumber,
      receiverAddress,
      paymentMethod,
    } = req.body

    // 生成一個隨機的訂單編號
    const orderId = uuidv4()
    // 生成一个随机的包裹 ID
    const packageId = uuidv4()

    const allProducts = [...items, ...classItems]
    // 要傳送給line pay的訂單資訊
    const lineOrder = {
      id: orderId,
      currency: 'TWD',
      amount: finalPrice,
      packages: [
        {
          id: packageId,
          amount: finalPrice,
          products: allProducts,
        },
      ],
      options: { display: { locale: 'zh_TW' } },
    }

    // 創建主訂單
    const order = await Orders2.create({
      id: orderId, // 使用生成的 UUID
      user_id: 1, // 這裡假設 user_id 是已知的
      total_amount: finalPrice,
      payment_method: paymentMethod,
      order_date: new Date(),
      order_status: 'Pending',
      recipient_name: receiverName,
      shipping_address: receiverAddress,
      contact_phone: phoneNumber,
      coupon_id: couponId,
      discount_Amount: discountPrice,
      product_Type: 'Physical',
    })

    // 可以在這裡添加商品詳情的處理邏輯

    res.json({ status: 'success', data: { lineOrder } })
  } catch (error) {
    console.error('Error creating order:', error)
    console.log(error) // 臨時增加，用於開發階段查看錯誤詳情
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: error.message,
    })
  }
})
// 重新導向到line-pay，進行交易(純導向不回應前端)
// 資料格式參考 https://enylin.github.io/line-pay-merchant/api-reference/request.html#example

export default router
