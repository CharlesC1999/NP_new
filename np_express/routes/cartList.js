import express from 'express'
const router = express.Router()
// sequelize db
import sequelize from '#configs/db.js'
// 一般sql
import db from '#configs/mysql.js'

const { Orders } = sequelize.models

import { v4 as uuidv4 } from 'uuid'

router.post('/', (req, res, next) => {
  console.log(req.body)
  const ordeData = req.body
  const orderId = res.json({ status: 'success' })
})
// const {
//   inputText,
//   inputEmail,
//   inputNumber,
//   inputPackageName,
//   inputPackageNumber,
//   inputAddress,
//   selectedPayment,
// } = req.body
// if (
//   !inputText ||
//   !inputEmail ||
//   !inputNumber ||
//   !inputPackageName ||
//   !inputPackageNumber ||
//   !inputAddress ||
//   !selectedPayment
// ) {
//   return res.status(400).json({ status: 'error', message: '缺少必要资料' })
// }
// // const allData=
// const orderDetails = {
//   inputText,
//   inputEmail,
//   inputNumber,
//   inputPackageName,
//   inputPackageNumber,
//   inputAddress,
//   selectedPayment,
// }

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
