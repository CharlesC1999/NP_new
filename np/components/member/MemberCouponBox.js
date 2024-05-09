import React from "react";
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./MemberCouponMain.module.css"

// import { useAuth } from "@/contexts/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MemberCouponBox = () => {
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userid");
    if (userIdFromLocalStorage) {
      setUserid(parseInt(userIdFromLocalStorage));
    }
  }, []);


  const [coupons, setCoupons] = useState([])
  const [couponsCondition, setCouponsCondition] = useState([])
  const [receive, setReceive] = useState([])







  const getCoupons = async () => {
    const url = 'http://localhost:3005/api/coupons';

    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url)
      // 解析json格式資料成js的資料
      const data = await res.json()
      console.log(data)

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.coupons)) {
        // 設定到狀態中
        setCoupons(data.data.coupons)
        // console.log('abc');
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (e) {
      console.log(e)
    }
  }
  // const getCouponsCondition = async () => {
  //   const url = 'http://localhost:3005/api/coupons-box';

  //   // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
  //   try {
  //     // fetch預設是使用GET，不需要加method設定
  //     const res = await fetch(url)
  //     // 解析json格式資料成js的資料
  //     const data = await res.json()
  //     console.log(data)

  //     // 為了要確保資料是陣列，所以檢查後再設定
  //     if (Array.isArray(data.data.coupons)) {
  //       // 設定到狀態中
  //       console.log(data.data.coupons);
  //       setCouponsCondition(data.data.coupons)
  //       // console.log('abc');
  //       console.log(couponsCondition);
  //     } else {
  //       console.log('伺服器回傳資料類型錯誤，無法設定到狀態中')
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  const getReceive = async () => {
    const url = 'http://localhost:3005/api/coupon-receive';

    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url)
      // 解析json格式資料成js的資料
      const data = await res.json()
      console.log(data)

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.level)) {
        // 設定到狀態中
        setReceive(data.data.level)
        console.log('abc');
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (e) {
      console.log(e)
    }
  }
  // 取出狀態裡面的數值，當作條件
  console.log(receive);
  let conformCondition1;
  receive.filter(v => v.user_ID === userid).map((v, i) => {
    conformCondition1 = v.total_price_sum
    console.log(conformCondition1);
  });
  console.log(conformCondition1);



  const handleCouponRedeem = async (couponId) => {
    try {
      const url = `http://localhost:3005/api/update-coupon-status/${couponId}`;
      await fetch(url, {
        method: 'PUT'
      });
      toast.success('領取成功祝你全家死光操', {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffac4d" d="M346.7 6C337.6 17 320 42.3 320 72c0 40 15.3 55.3 40 80s40 40 80 40c29.7 0 55-17.6 66-26.7c4-3.3 6-8.2 6-13.3s-2-10-6-13.2c-11.4-9.1-38.3-26.8-74-26.8c-32 0-40 8-40 8s8-8 8-40c0-35.7-17.7-62.6-26.8-74C370 2 365.1 0 360 0s-10 2-13.3 6zM244.6 136c-40 0-77.1 18.1-101.7 48.2l60.5 60.5c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-55.3-55.3 0 .1L2.2 477.9C-2 487-.1 497.8 7 505s17.9 9 27.1 4.8l134.7-62.4-52.1-52.1c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0L199.7 433l100.2-46.4c46.4-21.5 76.2-68 76.2-119.2C376 194.8 317.2 136 244.6 136z"/></svg>
        ),
        progressStyle: { backgroundColor: '#50bf8b' },
      });
      // 更新前端狀態以讓該優惠券消失
      setCoupons(prevCoupons => prevCoupons.filter(coupon => coupon.coupon__i_d !== couponId));
      // alert('領取成功^^');
    } catch (error) {
      console.error('Error updating coupon status:', error);
      alert('Error updating coupon status');
    }
  };








  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getCoupons()
    // getCouponsCondition()
    getReceive()
  }, [])


  return (
    <> <ToastContainer />

      <div className={` ${styles.container1} ${styles.main} `}>
        {/* 下面是側邊攔 */}

        {/* 這邊是主內容那塊 */}
        <div className>
          {/* 主內容的標題 */}
          <div className={styles.title}>
            <div className={styles.titleNow}>優惠券</div>
            <div className={styles.title2}>我的帳戶</div>
            <Link  href={`/member/member-coupon`} className={`${styles.gift} btn`}>返回</Link>
          </div>
          {/* 主內容的標題 */}
          <div className={styles.cpbox}>
            會員等級1專區
            <div className={styles.coupmain}>
              {/* 可以用的 */}
              {coupons.filter(v => v.member__i_d === userid && v.coupon_description === 'LV1才能領' && v.c_status === '已發送').map((v, i) => {

                const discountAmount = parseFloat(v.discount_amount);
                let displayText;
                // 检查 discountAmount 是否是有效的数字
                if (!isNaN(discountAmount)) {
                  // 如果 discountAmount 是有效的数字，根据大小判断是折扣还是固定金额
                  if (discountAmount < 1) {
                    const discountPercent = discountAmount * 10;
                    displayText = `${discountPercent}折`;
                  } else {
                    displayText = `$${discountAmount}`;
                  }
                } else {
                  // 如果 discountAmount 不是有效的数字，直接使用原始值
                  displayText = v.discount_amount;
                }

                 // 确定按钮是否可用，領取條件
                const isButtonDisabled = conformCondition1 >= 0;
                console.log(conformCondition1);
                console.log(isButtonDisabled);
                return (
                  <div className={styles.couponCard} key={v.coupon__i_d}>
                    <div className={styles.couponImg} >
                      <span className={styles.cspan}>{displayText}</span>

                      <span className={styles.cspan2}>效期:{v.valid_start_date}</span>
                      <span className={styles.cspan2}>~{v.valid_start_date}</span>
                    </div>
                    <div className={styles.couponContent}>
                      <div className={styles.couponDetails}>
                        <div className={styles.lowbuy}>低消${v.minimum_spend}</div>

                        <div className={styles.couponDate}>{v.coupon_description}</div>
                      </div>
                      <div className={styles.couponButton}>

                        {isButtonDisabled ? (
                          <button className={`${styles.couponBtn} btn`} onClick={() => handleCouponRedeem(v.coupon__i_d)}>領取</button>
                        ) : (
                          <p className={styles.cantGet}>資格不符</p>
                        )}
                        {/* <Link href={`/product`} className={`${styles.couponBtn} btn`} >領取</Link> */}
                      </div>
                    </div>
                  </div>
                );

              }
              )}





            </div>
          </div>
          <div className={styles.cpbox}>
            會員等級2專區
            <div className={styles.coupmain}>
              {/* 可以用的 */}
              {coupons.filter(v => v.member__i_d === userid && v.coupon_description === 'LV2才能領' && v.c_status === '已發送').map((v, i) => {

                const discountAmount = parseFloat(v.discount_amount);
                let displayText;
                // 检查 discountAmount 是否是有效的数字
                if (!isNaN(discountAmount)) {
                  // 如果 discountAmount 是有效的数字，根据大小判断是折扣还是固定金额
                  if (discountAmount < 1) {
                    const discountPercent = discountAmount * 10;
                    displayText = `${discountPercent}折`;
                  } else {
                    displayText = `$${discountAmount}`;
                  }
                } else {
                  // 如果 discountAmount 不是有效的数字，直接使用原始值
                  displayText = v.discount_amount;
                }

                 // 确定按钮是否可用，領取條件
                const isButtonDisabled = conformCondition1 >= 5000;
                console.log(conformCondition1);
                console.log(isButtonDisabled);
                return (
                  <div className={styles.couponCard} key={v.coupon__i_d}>
                    <div className={styles.couponImg} >
                      <span className={styles.cspan}>{displayText}</span>

                      <span className={styles.cspan2}>效期:{v.valid_start_date}</span>
                      <span className={styles.cspan2}>~{v.valid_start_date}</span>
                    </div>
                    <div className={styles.couponContent}>
                      <div className={styles.couponDetails}>
                        <div className={styles.lowbuy}>低消${v.minimum_spend}</div>

                        <div className={styles.couponDate}>{v.coupon_description}</div>
                      </div>
                      <div className={styles.couponButton}>

                        {isButtonDisabled ? (
                          <button className={`${styles.couponBtn} btn`} onClick={() => handleCouponRedeem(v.coupon__i_d)}>領取</button>
                        ) : (
                          <p className={styles.cantGet}>資格不符</p>
                        )}
                        {/* <Link href={`/product`} className={`${styles.couponBtn} btn`} >領取</Link> */}
                      </div>
                    </div>
                  </div>
                );

              }
              )}





            </div>
          </div>
          <div className={styles.cpbox}>
            會員等級3專區
            <div className={styles.coupmain}>
              {/* 可以用的 */}
              {coupons.filter(v => v.member__i_d === userid && v.coupon_description === 'LV3才能領' && v.c_status === '已發送').map((v, i) => {

                const discountAmount = parseFloat(v.discount_amount);
                let displayText;
                // 检查 discountAmount 是否是有效的数字
                if (!isNaN(discountAmount)) {
                  // 如果 discountAmount 是有效的数字，根据大小判断是折扣还是固定金额
                  if (discountAmount < 1) {
                    const discountPercent = discountAmount * 10;
                    displayText = `${discountPercent}折`;
                  } else {
                    displayText = `$${discountAmount}`;
                  }
                } else {
                  // 如果 discountAmount 不是有效的数字，直接使用原始值
                  displayText = v.discount_amount;
                }

                // 确定按钮是否可用，領取條件
                const isButtonDisabled = conformCondition1 >= 8000;
                console.log(conformCondition1);
                console.log(isButtonDisabled);
                return (
                  <div className={styles.couponCard} key={v.coupon__i_d}>
                    <div className={styles.couponImg} >
                      <span className={styles.cspan}>{displayText}</span>

                      <span className={styles.cspan2}>效期:{v.valid_start_date}</span>
                      <span className={styles.cspan2}>~{v.valid_start_date}</span>
                    </div>
                    <div className={styles.couponContent}>
                      <div className={styles.couponDetails}>
                        <div className={styles.lowbuy}>低消${v.minimum_spend}</div>

                        <div className={styles.couponDate}>{v.coupon_description}</div>
                      </div>
                      <div className={styles.couponButton}>

                        {isButtonDisabled ? (
                          <button className={`${styles.couponBtn} btn`} onClick={() => handleCouponRedeem(v.coupon__i_d)}>領取</button>
                        ) : (
                          <p className={styles.cantGet}>資格不符</p>
                        )}
                        {/* <Link href={`/product`} className={`${styles.couponBtn} btn`} >領取</Link> */}
                      </div>
                    </div>
                  </div>
                );

              }
              )}


             


            </div>
          </div>
          





        </div>
      </div>

    </>
  );

};
export default MemberCouponBox;