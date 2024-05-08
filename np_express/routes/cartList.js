import express from 'express'
const router = express.Router()
// sequelize db
import sequelize from '#configs/db.js'
// 一般sql
import db from '#configs/mysql.js'
// console.log(process.env)

const { Orders, Orders_detail, Orders2 } = sequelize.models

// line pay使用npm套件
import { createLinePayClient } from 'line-pay-merchant'

import { v4 as uuidv4 } from 'uuid'
// import Orders2 from '##/models/Orders2'
import 'dotenv/config.js'

const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})
// console.log(linePayClient)

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
      transactionId, // 从请求中获取交易ID
      orderInfo, // 从请求中获取订单信息
      reservation, // 从请求中获取预留信息
      confirm, // 从请求中获取确认信息
      returnCode, // 从请求中获取返回代码
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
      // packages: [
      //   {
      //     id: packageId,
      //     amount: finalPrice,
      //     products: allProducts,
      //   },
      // ],
      options: { display: { locale: 'zh_TW' } },
    }

    // 創建主訂單
    const order = await Orders.create({
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
      // product_Type: 'Physical',
      transaction_id: transactionId,
      order_info: orderInfo,
      reservation: reservation,
      confirm: confirm,
      return_code: returnCode,
    })

    // 可以在這裡添加商品詳情的處理邏輯(若不行的話刪除試試)
    const productDetails = items.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      class_id: null,
      quantity: item.quantity,
      unit_price: item.pricePerItem,
      total_price: item.totalPrice,
      product_type: 'product',
    }))
    const classDetails = classItems.map((item) => ({
      order_id: orderId,
      product_id: null,
      class_id: item.id,
      quantity: item.quantity,
      unit_price: item.pricePerItem,
      total_price: item.totalPrice,
      product_type: 'class',
    }))
    console.log('Product Details:', productDetails, classDetails)

    try {
      await Orders_detail.bulkCreate([...productDetails, ...classDetails])
    } catch (error) {
      console.error('Failed to create order details:', error)
      // Optionally: rethrow the error or handle it accordingly
    }

    res.json({
      status: 'success',
      data: { lineOrder },
      // Orders_detail_data: { Orders_detail },
    })
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

router.get('/reserve', async (req, res) => {
  if (!req.query.orderId) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }
})

export default router
