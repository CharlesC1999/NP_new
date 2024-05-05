import exp from "constants";
import React from "react";
import styles from "@/components/member/MemberBuyCard.module.scss";
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function MemberBuyCard({ activeCategory, searchTerm }) {




  const [orders, setOrders] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [orders2, setOrders2] = useState([]);
  const [userOrders1, setUserOrders1] = useState([]);
  const [userOrders2, setUserOrders2] = useState([]);
  const [mergedOrders, setMergedOrders] = useState([]);

  let userid = parseInt(localStorage.getItem('userid'))
  console.log(userid);



  
//把order跟orders2合起來，看他有哪些order_id，然後同樣的order_id放一起，形成一筆訂單


  let order_s = orders.filter(item => item.user_id === userid);
  console.log(order_s);
  
  console.log(order_s);
  let order_s2 = orders2.filter(item => item.user_id === userid);
  console.log(order_s2);

  
  useEffect(() => {
    const userid = parseInt(localStorage.getItem('userid'));

    // 篩選出具有相同 user_id 的訂單
    const userOrders1 = orders.filter(item => item.user_id === userid);
    const userOrders2 = orders2.filter(item => item.user_id === userid);

    // 合併兩個訂單陣列
    const mergeOrders = () => {
      const mergedOrders = [];
      userOrders1.forEach(order1 => {
        const matchingOrder = userOrders2.find(order2 => order2.order_id === order1.order_id);
        if (matchingOrder) {
          const total = parseInt(order1.total) + (matchingOrder.C_price * matchingOrder.C_quantity);
          mergedOrders.push({ ...order1, ...matchingOrder, total });
        } else {
          mergedOrders.push({ ...order1, total: parseInt(order1.total) });
        }
      });
      userOrders2.forEach(order2 => {
        const matchingOrder = userOrders1.find(order1 => order1.order_id === order2.order_id);
        if (!matchingOrder) {
          const total = order2.C_price * order2.C_quantity + parseInt(order2.total);
          mergedOrders.push({ ...order2, total });
        }
      });
      setMergedOrders(mergedOrders);
    };

    mergeOrders();
  }, [orders, orders2]);

  console.log(mergedOrders);

  let totalTotalTotal = mergedOrders.reduce((total, order) => total + parseInt(order.total), 0);
console.log(totalTotalTotal);

let totaltotaltotal=0;
const total = order_s.length > 0 ? order_s[0].total : null;
totaltotaltotal+= parseInt(total )
console.log(totaltotaltotal);

// 加上課程的錢錢
const classtotal = order_s2.length > 0 ? order_s2[0].class_tatol : null;
totaltotaltotal+= parseInt(classtotal )
console.log(totaltotaltotal);




  // let couponID = order.coupon_ID;
  // console.log(couponID);

  // 與伺服器要求獲取資料的async函式
  const getOrders = async (cat = '') => {
    const url = 'http://localhost:3005/api/ordertest2/' + cat;

    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url);
      // 解析json格式資料成js的資料
      const data = await res.json();
      console.log(data);

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.orders)) {

        // 設定到狀態中
        // setOrders(data.data.orders);
        let filteredOrders = data.data.orders;
        // 如果存在搜索关键字，则进行过滤
        if (searchTerm) {
          filteredOrders = filteredOrders.filter(order => order.name.includes(searchTerm));
        }
        setOrders(filteredOrders);
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中');
      }
      setOrders(filteredOrders);
    } catch (e) {
      console.log(e);
    }
  };
  const getOrders2 = async (cat = '') => {
    const url = 'http://localhost:3005/api/ordertest3/' + cat;

    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url);
      // 解析json格式資料成js的資料
      const data = await res.json();
      console.log(data);

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.orders2)) {

        // 設定到狀態中
        // setOrders(data.data.orders);
        let filteredOrders = data.data.orders2;
        // 如果存在搜索关键字，则进行过滤
        if (searchTerm) {
          filteredOrders = filteredOrders.filter(order => order.name.includes(searchTerm));
        }
        setOrders2(filteredOrders);
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中');
      }
      setOrders(filteredOrders);
    } catch (e) {
      console.log(e);
    }
  };

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
  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getOrders(activeCategory === '全部' ? '' : activeCategory);
    getOrders2(activeCategory === '全部' ? '' : activeCategory)
    getCoupons()
  }, [activeCategory, searchTerm]);




  return (
    <>

      {mergedOrders.filter(v => v.user_id === userid).map((v, i) => {
        //到時候把57改成當前會員ID(很像不能這樣寫QQ)
        //if(v.member_id===57)
        return (
          <div className={`${styles.buyCard} my-0 my-sm-4`}>
            <div
              className={`${styles.buyCardContent} d-flex flex-row justify-content-between align-items-center`}
            >
              <div className={`${styles.bccolumn}`}>
                <div className={styles.objectFit} >
                  <img className="object-fit-cover"

                    src={`/images/products/${v.image_url}`}
                    alt=""
                  />
                </div>
              </div>
              <div
                className={`${styles.buyItem} d-flex flex-row justify-content-between`}
              >
                <div className={styles.buyItemMain}>
                  <div className={styles.biContent}>{v.name}... </div>
                  <div className={styles.biNumber}>{v.order_date} </div>
                  <div className={styles.biState}>狀態 : {v.status}</div>
                </div>
                <div
                  className={`${styles.biMb} d-flex flex-column justify-content-between`}
                >
                  <div className={`${styles.biMoney} d-flex justify-content-end`}>
                    訂單金額: {v.total}
                  </div>
                  <div className={`d-flex flex-row justify-content-end`}>


                    <Link
                      href={`/member/history-order-detail?order_id=${v.order_id}`}
                      className={`${styles.buyCardBtn}  btn  btn d-flex justify-content-center`}
                    >
                      <span className={`d-none d-sm-flex`}>查看詳情</span>
                      <span className={`d-flex d-sm-none`}>查看</span>
                    </Link>

                    {!showReview && (
                      <buttons
                        className={`${styles.buyCardBtn} btn d-flex justify-content-center ms-3`}
                        onClick={() => setShowReview(true)}
                      >
                        評論
                      </buttons>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {showReview && (
              <div className={`${styles.reviewContainer} mt-3`}>
                <div className={`review-header`}>
                  <span className={`${styles.biContent}`}>評價心得</span>
                </div>
                <div className={`${styles.biNumber} mt-2 review-rating`}>
                  {/* 根據需要生成相應數量的星星評分： */}
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <div className={`${styles.reviewComment} mt-3 `}>
                  <textarea
                    className={`mt-3  ${styles.reviewInput}`}
                    placeholder="請輸入..."
                  ></textarea>
                </div>
                <div
                  className={`mt-3 review-actions d-flex flex-row justify-content-end`}
                >
                  <button
                    className={`${styles.buyCardBtn} btn-submit btn d-flex justify-content-center me-3`}
                    onClick={() => setShowReview(false)} // 点击时隐藏评论区域
                  >
                    取消
                  </button>
                  <button
                    className={`${styles.buyCardBtn} btn-submit btn d-flex justify-content-center`}
                  >
                    提交
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      }
      )}

    </>
  );
}
