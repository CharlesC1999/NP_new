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
      order_id: orderId, // 使用生成的 UUID
      user_id: 1, // 這裡假設 user_id 是已知的
      amount_total: totalPrice,
      payment_method: paymentMethod,
      order_date: new Date(),
      recipient_name: receiverName,
      order_status: 'Pending',
      shipping_address: receiverAddress,
      contact_phone: phoneNumber,
      o_coupon_id: couponId,
      discount_Amount: discountPrice,
      // product_Type: 'Physical',
      order_total_price: finalPrice,
      status: '已完成',
      transaction_id: transactionId,
      order_info: orderInfo,
      reservation: reservation,
      confirm: confirm,
      return_code: returnCode,
    })

    // 可以在這裡添加商品詳情的處理邏輯(若不行的話刪除試試)
    const productDetails = items.map((item) => ({
      order_detail_id: orderId,
      commodity_id: item.id,
      thing_id: null,
      class_id: null,
      quantity: item.quantity,
      unit_price: item.pricePerItem,
      total_price: item.totalPrice,
      product_type: 'product',
    }))
    const classDetails = classItems.map((item) => ({
      order_detail_id: orderId,
      commodity_id: null,
      thing_id: null,
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
  // console.log(req.body)
  if (!req.query.lineOrder) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }

  const orderId = req.query.orderId

  // 設定重新導向與失敗導向的網址
  const redirectUrls = {
    confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
    cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
  }

  // 從資料庫取得訂單資料
  const orderRecord = await Orders.findByPk(id, {
    raw: true, // 只需要資料表中資料
  })

  // const orderRecord = await findOne('orders', { order_id: orderId })

  // order_info記錄要向line pay要求的訂單json
  const order = JSON.parse(orderRecord.order_info)

  //const order = cache.get(orderId)
  console.log(`獲得訂單資料，內容如下：`)
  console.log(order)

  //
  try {
    // 向line pay傳送的訂單資料
    const linePayResponse = await linePayClient.request.send({
      body: { ...order, redirectUrls },
    })

    // 深拷貝一份order資料
    const reservation = JSON.parse(JSON.stringify(order))

    reservation.returnCode = linePayResponse.body.returnCode
    reservation.returnMessage = linePayResponse.body.returnMessage
    reservation.transactionId = linePayResponse.body.info.transactionId
    reservation.paymentAccessToken =
      linePayResponse.body.info.paymentAccessToken

    console.log(`預計付款資料(Reservation)已建立。資料如下:`)
    console.log(reservation)

    // 在db儲存reservation資料
    const result = await Purchase_Order.update(
      {
        reservation: JSON.stringify(reservation),
        transaction_id: reservation.transactionId,
      },
      {
        where: {
          id: orderId,
        },
      }
    )

    // console.log(result)

    // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
    res.redirect(linePayResponse.body.info.paymentUrl.web)
  } catch (e) {
    console.log('error', e)
  }
  //
})

export default router
