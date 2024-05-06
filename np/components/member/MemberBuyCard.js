import exp from "constants";
import React from "react";
import styles from "@/components/member/MemberBuyCard.module.scss";
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function MemberBuyCard({ activeCategory, searchTerm }) {




  const [orders, setOrders] = useState([]);
  const [showReview, setShowReview] = useState(false);
 

  console.log(orders);


  let userid = parseInt(localStorage.getItem('userid'))
  console.log(userid);


 

  // 資料表1商品訂單
  const getOrders = async (cat = '') => {
    const url = 'http://localhost:3005/api/orders/' + cat;

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
        console.log(filteredOrders);
        // 如果存在搜索关键字，则进行过滤
        if (searchTerm) {
          filteredOrders = filteredOrders.filter(order => {
            const title = order.name || order.Class_name;
            return title.includes(searchTerm);
          });
        }
        setOrders(filteredOrders);
        console.log(searchTerm);
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中');
      }
      setOrders(filteredOrders);
    } catch (e) {
      console.log(e);
    }
  };

  //資料表3優惠券
 
  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getOrders(activeCategory === '全部' ? '' : activeCategory);
    
    
  }, [activeCategory, searchTerm]);




  return (
    <>

      {orders.filter(v => v.User_ID === userid).map((v, i) => {
          const title = v.name || v.Class_name;
        //到時候把57改成當前會員ID(很像不能這樣寫QQ)
        //if(v.member_id===57)
        return (
          <div className={`${styles.buyCard} my-0 my-sm-4`} key={v.Order_ID}>
            <div
              className={`${styles.buyCardContent} d-flex flex-row justify-content-between align-items-center`}
            >
              <div className={`${styles.bccolumn}`}>
                <div className={styles.objectFit} >
                  {/* {v.image_url &&<img className="object-fit-cover"

                    src={`/images/products/${v.image_url}`}
                    alt=""
                  />} */}
                  {v.name ? (
                    <img
                      className="object-fit-cover"
                      src={`/images/products/${v.image_url}`}
                      alt=""
                    />
                  ) : (
                    <img
                      className="object-fit-cover"
                      src={`/images/member/classs.jpg`}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div
                className={`${styles.buyItem} d-flex flex-row justify-content-between`}
              >
                <div className={styles.buyItemMain}>
                  <div className={styles.biContent}>{title}...</div>
                  <div className={styles.biNumber}>{v.Order_date} </div>
                  <div className={styles.biState}>狀態 : {v.Status}</div>
                </div>
                <div
                  className={`${styles.biMb} d-flex flex-column justify-content-between`}
                >
                  <div className={`${styles.biMoney} d-flex justify-content-end`}>
                    訂單金額: {v.total_price}
                  </div>
                  <div className={`d-flex flex-row justify-content-end`}>


                    <Link
                      href={`/member/history-order-detail?order_id=${v.Order_ID}`}
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
