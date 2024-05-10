// import React from "react";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles3 from "../../styles/member-styles/shopStyle3.module.css";

import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useRouter } from 'next/router'
import Link from "next/link";

//抓取登入狀態
import { useAuth } from "@/contexts/AuthContext";
const HistoryOrderDetail = () => {

  //抓取登入狀態
  const { auth, logout } = useAuth();
  //確認一下有沒有抓到
  console.log(auth);
  // 物件狀態的初始值，通常需要把每個屬性的初始值寫出
  // !!注意!! 初次render(渲染)會使用初始值
  // !!注意!! 在應用程式執行過程中，務必要保持狀態維持同樣的資料類型
  const [orderDetail, setOrderDetail] = useState([])
  const [coupons, setCoupons] = useState([])
 
  const couponid = orderDetail.length > 0 ? orderDetail[0].O_coupon_id : null;
  console.log(couponid);
  const couponIdExists = coupons.some(item => item.coupon__i_d  === couponid);
  console.log(couponIdExists);
  let useCoupon;
  
  if (couponIdExists) {
    let coupon = coupons.find(item => item.coupon__i_d === couponid);
    let couponName = coupon.c_name;
    let couponDiscount = coupon.discount_amount;
    console.log(couponDiscount);
    const discountAmount = parseFloat(couponDiscount);
    let displayText;
    // 检查 discountAmount 是否是有效的数字
    if (!isNaN(discountAmount)) {
      // 如果 discountAmount 是有效的数字，根据大小判断是折扣还是固定金额
      if (discountAmount < 1) {
        const discountPercent = discountAmount * 10;
        displayText = `${discountPercent}折`;
      } else {
        displayText = `折$${discountAmount}`;
      }
    } else {
      // 如果 discountAmount 不是有效的数字，直接使用原始值
      displayText = v.discount_amount;
    }
    useCoupon = couponName + "/" + displayText;
  } else {
    useCoupon = "未使用優惠券";
  }
  console.log(orderDetail);
  console.log(coupons);
  // const totaltotal = orderDetail.reduce((total, order) => {
  //   return total + (order.price * order.quantity);
  // }, 0);

  // console.log(totaltotal); // 打印所有商品價格的總和
  // let totaltotal = orderDetail.reduce((total, order) => {
  //   return total + (order.price * order.quantity);
  // }, 0);
  // let totaltotal = orderDetail.reduce((total, order) => {
  //   return total + (order.price * order.quantity);
  // }, 0);

  //拿出總價 //取出狀態裡的某個東西
  let totalPrice;
  orderDetail.forEach((v, i) => {
    totalPrice = v.order_total_price
    console.log(totalPrice);
  });
  console.log(totalPrice);



  // if (couponIdExists) {
  //   // 如果有適用的優惠券，計算折扣後的總價
  //   let coupon = coupons.find(item => item.coupon_id === couponid);
  //   let couponDiscount = parseFloat(coupon.Discount_amount);

  //   if (!isNaN(couponDiscount)) {
  //     if (couponDiscount > 0) {
  //       // 現金折扣
  //       totaltotal -= couponDiscount;
  //     } else {
  //       // 折扣率
  //       totaltotal *= (1 + couponDiscount);
  //     }
  //   }
  // }

  // console.log(totaltotal);





  // 宣告出router物件，在其中可以得到兩個有用值
  // router.query，是一個物件，其中有動態路由的參數值pid
  // router.isReady，是一個布林值，代表本頁面元件已完成水合作用，可以得到pid值
  const router = useRouter()

  // 與伺服器要求獲取資料的async函式
  const getOrderDetail = async (order_id) => {
    const url = `http://localhost:3005/api/history-order-item-detail/${order_id}`

    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url)
      // 解析json格式資料成js的資料
      const data = await res.json()
      console.log(data.data.orders)

      // 為了要確保資料是物件，所以檢查後再設定
      if (typeof data === 'object' && data !== null) {
        // 設定到狀態中
        setOrderDetail(data.data.orders)
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (e) {
      console.log(e)
    }
  }
  const getCoupons = async () => {
    const url = `http://localhost:3005/api/coupons`

    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url)
      // 解析json格式資料成js的資料
      const data = await res.json()
      console.log(data.data.coupons)

      // 為了要確保資料是物件，所以檢查後再設定
      if (typeof data === 'object' && data !== null) {
        // 設定到狀態中
        setCoupons(data.data.coupons)
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (e) {
      console.log(e)
    }
  }






  
  // 樣式2: 頁面初次渲染之後伺服器要求資料
  // 需要監聽router.isReady，當它為true時，才能得到pid
  useEffect(() => {
    console.log('isReady', router.isReady, 'query', router.query)
    // 確保能得從router.query到pid後，再向伺服器要求對應資料
    if (router.isReady) {
      getOrderDetail(router.query.order_id)
      getCoupons()
    }
    // eslint-disable-next-line
  }, [router.isReady])
  // eslint會作多餘的檢查，不需要加router.query在相依陣列中


  return (
    <>

      <Header />
      
      {/* 要抓登入狀態才能看到的區塊 */}
      {auth.isLoggedIn ? (
     
        <div className={styles3.out}>
        
          <div className={`${styles3.desktop}  ${styles3.container2}  container `}>
            
            {/* 欄位一顯示商品 */}
            <section
              className={`${styles3.section} ${styles3.mgt} mb-2 fw-bold `}
              style={{ color: "#50bf8b" }}
            >
              商品購買明細
            </section>
            <section className={`${styles3.ProductBorder} ${styles3.section}`}>
              <div className={`${styles3.topBar} row py-3`}>

                <div className={`${styles3.fc} col text-center`}>名稱</div>
                <div className={`${styles3.fc} col text-center`}>價格</div>
                <div className={`${styles3.fc} col text-center`}>數量</div>
                <div className={`${styles3.fc} col text-center`}>小計</div>

              </div>
              {orderDetail.filter(v => v.product_type === 'product').map((v, i) => {

                return (
                  <div className="row py-2" key={v.Order_Item_ID}>

                    <div className={`${styles3.fb} col text-center pt-2`}>{v.product_name}</div>
                    <div className={`${styles3.fb} col text-center pt-2`}>{v.product_price}</div>
                    <div className={`${styles3.fb} col text-center pt-2`}>{v.quantity}</div>
                    <div className={`${styles3.fb} col text-center pt-2`}>{v.product_price * v.quantity}</div>

                  </div>

                )
              }
              )}



            </section>
            {/* 欄位二顯示課程 */}
            <section
              className={`${styles3.section} ${styles3.mgt} mb-2 fw-bold `}
              style={{ color: "#50bf8b" }}
            >
              課程購買明細
            </section>
            <section className={`${styles3.ProductBorder} ${styles3.section}`}>
              <div className={`${styles3.topBar} row py-3`}>

                <div className={`${styles3.fc} col text-center`}>名稱</div>
                <div className={`${styles3.fc} col text-center`}>價格</div>
                <div className={`${styles3.fc} col text-center`}>數量</div>
                <div className={`${styles3.fc} col text-center`}>小計</div>

              </div>

              {orderDetail.filter(v => v.product_type === 'class').map((v, i) => {

                return (

                  <div className="row py-2" key={v.Order_Item_ID}>

                    <div className={`${styles3.fb} col text-center pt-2`}>{v.class_name}</div>
                    <div className={`${styles3.fb} col text-center pt-2`}>{v.c_price}</div>
                    <div className={`${styles3.fb} col text-center pt-2`}>{v.quantity}</div>
                    <div className={`${styles3.fb} col text-center pt-2`}>{v.c_price * v.quantity}</div>

                  </div>
                )
              }
              )}




            </section>

            {/*總價 */}

            <div className={`${styles3.totalPrice} row`}>



              <div className={`${styles3.orderEnd} `}>
                優惠券: {useCoupon}

              </div>
              {/* <div className={`${styles3.orderEnd} `}>
                運費: 0元

              </div> */}

              <div className={`${styles3.orderEnd} `}>
                合計: {totalPrice} 元
              </div>
            </div>
            {orderDetail.map((v, i) => {
              //怪怪的，要問老師
              if (i === 0)
                return (
                  <section className={`${styles3.section} ${styles3.ProductBorder} mt-4`} key={i}>
                    <div className={`${styles3.topBar} row`}>
                      <div
                        className={`${styles3.section} ${styles3.mgt} mb-2 fw-bold pt-2`}
                      >
                        付款方式與運送方式
                      </div>
                    </div>
                    <div className="row py-2">
                      <div className={`${styles3.fb} pt-2 col-2`}>配送方式</div>
                      <div className={`${styles3.fb} pt-2 col-2`}>宅配</div>
                    </div>
                    <div className="row py-2">
                      <div className={`${styles3.fb} pt-2 col-2`}>付款方式</div>
                      <div className={`${styles3.fb} pt-2 col-2`}>{v.payment_method}</div>
                    </div>
                    <div className="row py-2">
                      <div className={`${styles3.fb} pt-2 col-2`}>收件者</div>
                      <div className={`${styles3.fb} pt-2 col-2`}>{v.recipient_name}</div>
                    </div>
                    <div className="row py-2">
                      <div className={`${styles3.fb} pt-2 col-2`}>Email</div>
                      <div className={`${styles3.fb} pt-2 col-2`}>{v.email}</div>
                    </div>
                    <div className="row py-2">
                      <div className={`${styles3.fb} pt-2 col-2`}>取貨地址</div>
                      <div className="col-4 fb pt-2">{v.shipping_address}</div>
                    </div>

                  </section>
                )
            }
            )}

            {/* 折價券、付款 */}
            <div
              className={`${styles3.pay2} d-flex justify-content-center py-4`}
              style={{ width: "100%" }}
            >
              <div
                href=""
                className={`${styles3.keepbuy} ${styles3.a} d-flex justify-content-center align-items-center mt-1`}
                type="submit"
                style={{}}
              >
                <div className={`${styles3.back} fw-bold pt-1`}><Link href="/member/member-buy" alt="">返回上一頁</Link></div>
              </div>

            </div>
            {/* </form> */}
            {/* </div> */}
          </div>

          {/* 手機 */}

          <div className={`${styles3.mobile}  ${styles3.container2} container`}>
            {/*  */}


            {/* 商品明細欄位 */}

            <section
              className={`${styles3.ProductBorder} ${styles3.section} mt-5`}
              style={{ width: 345, marginTop: 100 }}
            >
              <div className={`${styles3.topBar} row`}>
                <div className={`${styles3.fc} col`}>商品購買明細</div>
              </div>
              {orderDetail.filter(v => v.product_type === 'product').map((v, i) => {

                return (
                  <div key={v.Order_Item_ID}>
                    <div className="row py-2 mt-1">
                      <div className={`${styles3.fc} row ps-4 `}>{v.product_name} X {v.quantity}</div>

                      <div className="row mt-4">

                        <div className={`${styles3.fb} col fw-bold`}>{v.product_price}</div>
                      </div>
                    </div>



                    <div
                      className="row py-2 pt-3"
                      style={{ borderTop: "1px solid #78cea6" }}
                    >
                      <div className={`${styles3.fb} col`}>小計 </div>
                      <div
                        className={`${styles3.fb} col text-center text-success fw-bold`}
                      >
                       {v.product_price * v.quantity}
                      </div>
                    </div>
                  </div>

                )
              }
              )}

            </section>

            <section
              className={`${styles3.ProductBorder} ${styles3.section} mt-5`}
              style={{ width: 345, marginTop: 100 }}
            >
              <div className={`${styles3.topBar} row`}>
                <div className={`${styles3.fc} col`}>課程購買明細</div>
              </div>
              {orderDetail.filter(v => v.product_type === 'class').map((v, i) => {

                return (
                  <div key={v.Order_Item_ID}>
                    <div className="row py-2 mt-1">
                      <div className={`${styles3.fc} row ps-4 `}>{v.class_name} X {v.quantity}</div>

                      <div className="row mt-4">

                        <div className={`${styles3.fb} col fw-bold`}>{v.c_price * v.quantity}</div>
                      </div>
                    </div>



                    <div
                      className="row py-2 pt-3"
                      style={{ borderTop: "1px solid #78cea6" }}
                    >
                      <div className={`${styles3.fb} col`}>小計 </div>
                      <div
                        className={`${styles3.fb} col text-center text-success fw-bold`}
                      >
                        {v.c_price * v.quantity}
                      </div>
                    </div>
                  </div>

                )
              }
              )}
              <div className={`${styles3.totalPrice} row`}>
                <div className={`${styles3.orderEnd} `}>
                  優惠券: {useCoupon}

                </div>
                {/* <div className={`${styles3.orderEnd} `}>
                  運費: 之後有再加上吧

                </div> */}
                <div className={`${styles3.orderEnd} `}>
                  總價:  {totalPrice}元
                </div>
              </div>
            </section>

            {/* 商品欄位手機板 */}
            {orderDetail.map((v, i) => {
              //怪怪的，要問老師
              if (i === 0)
                return (
                  <section
                    key={v.i}
                    className={`${styles3.ProductBorder} ${styles3.section} mt-5`}
                    style={{ width: 345 }}
                  >
                    <div className={`${styles3.topBar} row`}>
                      <div className={`${styles3.fc} col`}>收件資訊</div>
                    </div>
                    <div className="row py-2">
                      <div className={`${styles3.fb} col mt-1`}>配送方式</div>
                      <div className={`${styles3.fb} col mt-1`}>宅配</div>
                    </div>
                    <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
                      <div className={`${styles3.fb} col mt-1`}>付款方式</div>
                      <div className={`${styles3.fb} col mt-1`}>{v.payment_method}</div>
                    </div>
                    <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
                      <div className={`${styles3.fb} col mt-1`}>收件者</div>
                      <div className={`${styles3.fb} col mt-1`}>{v.recipient_name}</div>
                    </div>
                    <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
                      <div className={`${styles3.fb} col mt-1`}>Email</div>
                      <div className={`${styles3.fb} col mt-1`}>{v.email}</div>
                    </div>
                    <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
                      <div className={`${styles3.fb} col mt-1`}>取貨地址</div>
                      <div className={`${styles3.fb} col mt-1`}>{v.shipping_address}</div>
                    </div>

                  </section>
                )
            }
            )}

            {/* 折價券、付款 */}
            <div
              className={`${styles3.pay2} d-flex justify-content-center py-4`}
              style={{ width: "100%" }}
            >
              <div
                className={`${styles3.pay2} d-flex justify-content-center py-4`}
                style={{ width: "100%" }}
              >
                <div
                  href=""
                  className={`${styles3.keepbuy} d-flex justify-content-center align-items-center mt-1`}
                  type="submit"
                  style={{}}
                >
                  <div className={`${styles3.back} fw-bold pt-1`}><Link href="/member/member-buy" alt="">返回上頁</Link></div>
                </div>

              </div>
              {/* </form> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      ) : (<a href="http://localhost:3000/member/login"><h1>請登入</h1></a>)}



      <Footer />

    </>
  );
};
export default HistoryOrderDetail;
