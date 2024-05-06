import express from 'express'
const router = express.Router()

router.post('/', (req, res, next) => {
  console.log(req.body)

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

  res.json({ status: 'success' })
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
