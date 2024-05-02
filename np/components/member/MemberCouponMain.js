import React from "react";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./MemberCouponMain.module.css"
import Cat from "./Cat"






 const MemberCouponMain =() => {

  
const [coupons, setCoupons] = useState([])

const getCoupons = async () => {
  const url = 'http://localhost:3005/api/coupons'

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
// 樣式2: didMount階段只執行一次
useEffect(() => {
  // 頁面初次渲染之後伺服器要求資料
  getCoupons()
}, [])


  return(
    <> 
  <div className={` ${styles.container1} ${styles.main} ` }>
  {/* 下面是側邊攔 */}
  
  {/* 這邊是主內容那塊 */}
  <div className>
    {/* 主內容的標題 */}
    <div className={styles.title}>
      <div className={styles.titleNow}>優惠券</div>
      <div className={styles.title2}>我的帳戶</div>
    </div>
    {/* 主內容的標題 */}
    <div>
      {/* 分類欄 */}
  <Cat/>
  {/* 分類欄下面的搜尋框 */}
  {/* <div className={styles.searchContainer}>
  <input className={styles.searchBar} type="text" placeholder="Search for items..." />
  <button type="submit" className={styles.searchButton}>
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
      <path fill="none" stroke="#747E85" strokelinecap="round" strokelinejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" />
    </svg>
  </button>
</div> */}
</div>
<div className={styles.coupmain}>
  {/* 可以用的 */}
  {coupons.filter(v=>v.Member_ID===41).map((v, i) => {
    const discountAmount = parseFloat(v.Discount_amount);
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
  displayText = v.Discount_amount;
}
// 确定按钮是否可用
const isButtonDisabled = v.C_status !== '可使用';

    return (
  <div className={styles.couponCard}>
    <div className={styles.couponImg} >
    <span className={styles.cspan} >{displayText}</span>
   
  <span className={styles.cspan2}>效期:{v.Valid_start_date}</span>
  <span className={styles.cspan2}>~{v.Valid_end_date}</span>
    </div>
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消${v.minimum_spend}</div>
        
        <div className={styles.couponDate}>{v.C_name}</div>
      </div>
      <div className={styles.couponButton}>

        {/* 使用条件渲染控制按钮及其文本的显示 */}
        {isButtonDisabled ? (
            <button className={`${styles.couponBtn} btn`} disabled></button>
          ) : (
            <button className={`${styles.couponBtn} btn`}>立即使用</button>
          )}
      </div>
    </div>
  </div>
);
}
)}
  {/* 原本的 */}
  {/* <div className={styles.couponCard}>
    <div className={styles.couponImg} >
      
    </div>
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消$100</div>
        <div className={styles.couponDate}>有效日期:2024/12/31</div>
      </div>
      <div className={styles.couponButton}>
        <button className={`${styles.couponBtn} btn`}>立即使用</button>
      </div>
    </div>
  </div> */}

 
</div>

  </div>
</div>
</>
);

};
export default MemberCouponMain;