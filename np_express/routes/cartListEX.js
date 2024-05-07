// import express from 'express'
// const router = express.Router()
// import { getIdParam } from '#db-helpers/db-tool.js'

// // import sequelize from '#configs/db.js'
// // const { Order } = sequelize.models

// // import db from '##/configs/mysql'

// // 确保在路由前添加body-parser中间件来解析JSON请求体
// router.use(express.json())

// router.post('/', async function (req, res, next) {
//   console.log(req.body)

//   // 要新增的订单数据
//   const {
//     inputText,
//     inputEmail,
//     inputNumber,
//     inputPackageName,
//     inputPackageNumber,
//     inputAddress,
//     selectedPayment,
//   } = req.body

//   // 检查所有必要的字段是否存在
//   if (
//     !inputText ||
//     !inputEmail ||
//     !inputNumber ||
//     !inputPackageName ||
//     !inputPackageNumber ||
//     !inputAddress ||
//     !selectedPayment
//   ) {
//     return res.status(400).json({ status: 'error', message: '缺少必要资料' })
//   }

//   // 處理這些數據
//   const result = processOrderData(
//     inputText,
//     inputEmail,
//     inputNumber,
//     inputPackageName,
//     inputPackageNumber,
//     inputAddress,
//     selectedPayment
//   )

//   // 返回處理結果
//   res.json({ status: 'success', result })
// })

// // function processOrderData(inputText, inputEmail, inputNumber) {
// //   // 進行一些業務邏輯處理
// //   return {
// //     message: 'Order processed',
// //     data: {
// //       text: inputText,
// //       email: inputEmail,
// //       number: inputNumber
// //     }
// //   };
// // }

// // })
// //   try {
// //     // 假设有一个Order模型用于添加数据到数据库
// //     const newOrder = await Order.create({
// //       inputText,
// //       inputEmail,
// //       inputNumber,
// //       inputPackageName,
// //       inputPackageNumber,
// //       inputAddress,
// //       selectedPayment,
// //     })

// //     // 响应客户端
// //     return res
// //       .status(201)
// //       .json({ status: 'success', message: '订单已成功创建', order: newOrder })
// //   } catch (error) {
// //     console.error('提交订单出错:', error)
// //     return res
// //       .status(500)
// //       .json({
// //         status: 'error',
// //         message: '服务器内部错误',
// //         error: error.message,
// //       })
// //   }
// // })

// export default router

import express from 'express'
const router = express.Router()
// import session from 'express-session'
// const app = express()
// // session設定
// app.use(
//   session({
//     secret: '12345', // 这个是用于加密 session ID 的密钥
//     resave: false, // 强制保存 session 即使它没有变化
//     saveUninitialized: false, // 强制将未初始化的 session 保存
//     // cookie: { secure: true }, // 如果你的网站完全使用 HTTPS，设置
//   })
// )

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

router.post('/', (req, res, next) => {
  console.log(req.body)

  const {
    inputText,
    inputEmail,
    inputNumber,
    inputPackageName,
    inputPackageNumber,
    inputAddress,
    selectedPayment,
  } = req.body
  if (
    !inputText ||
    !inputEmail ||
    !inputNumber ||
    !inputPackageName ||
    !inputPackageNumber ||
    !inputAddress ||
    !selectedPayment
  ) {
    return res.status(400).json({ status: 'error', message: '缺少必要资料' })
  }
  // const allData=
  const orderDetails = {
    inputText,
    inputEmail,
    inputNumber,
    inputPackageName,
    inputPackageNumber,
    inputAddress,
    selectedPayment,
  }
  req.session.orderDetails = orderDetails
  console.log(req.session.orderDetails)
  console.log(orderDetails)
  //
  res.json({ status: 'success', data: orderDetails })
})

// 第2支路由傳到前端別的頁面
router.get('/cart/payment-info', (req, res) => {
  if (req.session.orderDetails) {
    // 如果会话中有订单详情，则发送给前端
    console.log(req.session.orderDetails)
    res.json({ status: 'success', data: req.session.orderDetails })
  } else {
    // 如果会话中没有订单详情，返回一个错误消息
    res.status(404).json({ status: 'error', message: 'No order details found' })
  }
})
export default router
