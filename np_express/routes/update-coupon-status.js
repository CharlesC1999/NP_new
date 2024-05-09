import express from 'express'
const router = express.Router()

// 檢查空物件, 轉換req.params為數字
import { getIdParam } from '#db-helpers/db-tool.js'

// 資料庫使用
import sequelize from '#configs/db.js'
const { Orders } = sequelize.models

// 一般sql
import db from '#configs/mysql.js'

// 列表頁
// my-products?brand_ids=1,2&name_like=pixel&price_gte=10000&price_lte=15000&sort=price&order=asc&page=1&perpage=2

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.put('/:couponID', async function (req, res) {
  // 轉為數字，  上面的status要等於下面的req.params.status裡面的status
  const couponID = req.params.couponID
  console.log(couponID)
  // const sqlOrders = `UPDATE coupons
  // SET C_status = '已使用'
  // WHERE Coupon_ID = 1;`

  const sqlOrders = `UPDATE coupons
  SET C_status = '可使用'
  WHERE coupon__i_d  = "${couponID}";`
  // WHERE Status= '${ordersStatus}'
  const [rows, fields] = await db.query(sqlOrders)

  return res.json({
    status: 'success',
    data: {
      orders: rows,
    },
  })

  //return res.json({ status: 'success', data: { status } })
})

export default router
