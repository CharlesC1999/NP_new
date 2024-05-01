import exp from "constants";
import React from "react";
import styles from "@/components/member/MemberBuyCard.module.scss";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MemberBuyCard({activeCategory, searchTerm}) {
  const [orders, setOrders] = useState([]);

  // 與伺服器要求獲取資料的async函式
  const getOrders = async (cat='') => {
    const url = 'http://localhost:3005/api/ordertest2/'+cat;

    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url);
      // 解析json格式資料成js的資料
      const data = await res.json();
      console.log(data);

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.orders)) {
        
         // 設定到狀態中(加搜尋之前原版)
        //  setOrders(data.data.orders);

        let filteredOrders = data.data.orders;
        // 如果存在搜索关键字，则进行过滤
        if (searchTerm) {
          filteredOrders = filteredOrders.filter(order => order.name.includes(searchTerm));
        }
        // 設定到狀態中
        setOrders(filteredOrders);
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中');
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    //加了搜尋所以加了searchTerm
    getOrders(activeCategory==='全部'?'':activeCategory);
  }, [activeCategory, searchTerm]);

  return (
    <>
      {orders.filter(v => v.member_id === 57).map((v, i) => {
        return (
          <div className={`${styles.buyCard} my-0 my-sm-4`} key={v.Order_ID}>
            <div className={`${styles.buyCardContent} d-flex flex-row justify-content-between align-items-center`}>
              <div className={`${styles.bccolumn}`}>
                <div className={styles.objectFit}>
                  <img className="object-fit-cover"
                    src={`/images/products/${v.image_url}`}
                    alt=""
                  />
                </div>
              </div>
              <div className={`${styles.buyItem} d-flex flex-row justify-content-between`}>
                <div className={styles.buyItemMain}>
                  <div className={styles.biContent}>{v.name}... </div>
                  <div className={styles.biNumber}>訂單日期:{v.order_date} </div>
                  <div className={styles.biState}>狀態 : {v.status}</div>
                </div>
                <div className={`${styles.biMb} d-flex flex-column justify-content-between`}>
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
                    <a
                      href
                      className={`${styles.buyCardBtn} btn d-flex justify-content-center ms-3`}
                    >
                      評論
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
