import express from 'express'
const router = express.Router()
// sequelize db
import sequelize from '#configs/db.js'
// 一般sql
import db from '#configs/mysql.js'
// console.log(process.env)
import moment from 'moment-timezone'

const { Orders, Orders_detail, Coupons } = sequelize.models

// line pay使用npm套件
import { createLinePayClient } from 'line-pay-merchant'

import { v4 as uuidv4 } from 'uuid'
// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'
// import Orders2 from '##/models/Orders2'
import 'dotenv/config.js'
import authenticateToken from '#middlewares/authenticateToken.js'

// 定義安全的私鑰字串
const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})
// console.log(linePayClient)

// 這邊是看哪個會員登入連到cart index
// router.get('/', authenticateToken, async (req, res) => {
//   const userID = req.user.id
//   console.log(userID)
//   // const cartIds =

//   try {
//     const coupons = await Coupons.findAll({
//       where: { userId: req.user.id, c_status: '可使用' },
//     })
//     res.json(coupons)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Internal Server Error' })
//   }
// })

// 下面是 line pay 的路由
router.post('/', async (req, res, next) => {
  // , authenticateToken
  console.log(req.body)
  // const ordeData = req.body
  // const orderId = res.json({ status: 'success' })

  // 從請求中提取訂單資訊
  // const userID = req.user.id
  // const cids = await F
  try {
    const {
      items,
      productItems,
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
      userId,
    } = req.body

    // 生成一個隨機的訂單編號
    const orderId = uuidv4()
    // 生成一个随机的包裹 ID
    const packageId = uuidv4()

    const allProducts = [...items, ...productItems]
    // 要傳送給line pay的訂單資訊
    const lineOrder = {
      orderId: orderId,
      currency: 'TWD',
      amount: req.body.finalPrice,
      packages: [
        {
          id: packageId,
          amount: req.body.finalPrice,
          products: [
            {
              name: '全部商品',
              quantity: 1,
              price: req.body.finalPrice,
            },
          ],
        },
      ],
      options: { display: { locale: 'zh_TW' } },
    }
    let orderDate = new Date()
    let orderDateUTC8 = orderDate.setHours(orderDate.getHours() + 8)

    console.log('lineOrder', lineOrder)
    // 創建主訂單
    const order = await Orders.create({
      order_id: orderId, // 使用生成的 UUID
      user_id: userId, // 這裡假設 user_id 是已知的
      amount_total: totalPrice,
      payment_method: paymentMethod,
      order_date: orderDateUTC8,
      recipient_name: receiverName,
      order_status: '已完成',
      shipping_address: receiverAddress,
      contact_phone: phoneNumber,
      o_coupon_id: couponId,
      discount_Amount: discountPrice,
      order_total_price: finalPrice,
      status: 'paid',
      transaction_id: transactionId,
      order_info: JSON.stringify(lineOrder),
      reservation: reservation,
      confirm: confirm,
      return_code: returnCode,
    })

    // 可以在這裡添加商品詳情的處理邏輯(若不行的話刪除試試)
    const classDetails = items.map((item) => ({
      order_detail_id: orderId,
      commodity_id: null,
      thing_id: null,
      class_id: item.id,
      quantity: item.quantity,
      unit_price: item.pricePerItem,
      total_price: item.totalPrice,
      product_type: 'class',
    }))
    const productDetails = productItems.map((item) => ({
      order_detail_id: orderId,
      commodity_id: item.id,
      thing_id: null,
      class_id: null,
      quantity: item.quantity,
      unit_price: item.pricePerItem,
      total_price: item.totalProductPrice,
      product_type: 'product',
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
  // console.log(req.orderId)
  // console.log('Received', req.query)
  // console.log('Received orderId:', req.query.orderId)

  if (!req.query) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }

  const orderId = req.query.orderId

  console.log('orderId', orderId)
  // 設定重新導向與失敗導向的網址
  const redirectUrls = {
    confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
    cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
  }

  // // 從資料庫取得訂單資料
  const orderRecord = await Orders.findByPk(orderId, {
    raw: true, // 只需要資料表中資料
  })
  // console.log('orderRecord:', orderRecord)
  // // order_info記錄要向line pay要求的訂單json
  const order = JSON.parse(orderRecord.order_info)
  console.log('order', order)

  console.log('JSON being sent:', JSON.stringify({ ...order, redirectUrls }))
  // //
  try {
    // 向line pay傳送的訂單資料
    const linePayResponse = await linePayClient.request.send({
      body: { ...order, redirectUrls },
    })

    const reservation = JSON.parse(JSON.stringify(order))

    reservation.returnCode = linePayResponse.body.returnCode
    reservation.returnMessage = linePayResponse.body.returnMessage
    reservation.transactionId = linePayResponse.body.info.transactionId
    reservation.paymentAccessToken =
      linePayResponse.body.info.paymentAccessToken

    console.log(`預計付款資料(Reservation)已建立。資料如下:`)
    console.log(reservation)

    // 儲存在資料庫
    const result = await Orders.update(
      {
        reservation: JSON.stringify(reservation),
        transaction_id: reservation.transactionId,
      },
      {
        where: {
          order_id: orderId,
        },
      }
    )

    console.log(result)
    console.log(linePayResponse.body.info.paymentUrl.web)
    const paymentUrl = linePayResponse.body.info.paymentUrl.web
    res.json({ paymentUrl: paymentUrl })
    // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
    // res.redirect(linePayResponse.body.info.paymentUrl.web)
  } catch (error) {
    console.log('error', error)
  }
})

router.get('/confirm', async (req, res) => {
  console.log(req.query)
  const transactionId = req.query.transactionId

  const dbOrder = await Orders.findOne({
    where: { transaction_id: transactionId },
    raw: true, // 只需要資料表中資料
  })

  console.log(dbOrder)

  const transaction = JSON.parse(dbOrder.reservation)

  console.log(transaction)

  const amount = transaction.amount

  try {
    const linePayResponse = await linePayClient.confirm.send({
      transactionId: transactionId,
      body: {
        currency: 'TWD',
        amount: amount,
      },
    })
    console.log(linePayResponse)

    let status = 'paid'

    if (linePayResponse.body.returnCode !== '0000') {
      status = 'fail'
    }

    // 更新資料庫的訂單狀態
    const result = await Orders.update(
      {
        status,
        return_code: linePayResponse.body.returnCode,
        confirm: JSON.stringify(linePayResponse.body),
      },
      {
        where: {
          order_id: dbOrder.transaction_id,
        },
      }
    )
    // 更改優惠券變成已使用
    if (dbOrder.o_coupon_id) {
      console.log(
        `Attempting to update coupon status for coupon__i_d: ${dbOrder.o_coupon_id}`
      )
      const updateResult = await Coupons.update(
        { C_status: '已使用' },
        { where: { Coupon_ID: dbOrder.o_coupon_id } }
      )
      console.log(`Update result: ${updateResult}`)
    }

    return res.json({ status: 'success', data: linePayResponse.body })
  } catch (error) {
    return res.json({ status: 'fail', data: error.data })
  }
})

export default router
