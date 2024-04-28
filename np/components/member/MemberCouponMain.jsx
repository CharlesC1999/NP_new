import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./MemberCouponMain.module.css"
import Cat from "./Cat"

 const MemberCouponMain =() => {
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
  <div className={styles.searchContainer}>
  <input className={styles.searchBar} type="text" placeholder="Search for items..." />
  <button type="submit" className={styles.searchButton}>
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
      <path fill="none" stroke="#747E85" strokelinecap="round" strokelinejoin="round" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" />
    </svg>
  </button>
</div>
</div>
<div className={styles.coupmain}>
  <div className={styles.couponCard}>
    <div className={styles.couponImg} />
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消$100</div>
        <div className={styles.couponDate}>有效日期:2024/12/31</div>
      </div>
      <div className={styles.couponButton}>
        <button className={`${styles.couponBtn} btn`}>立即使用</button>
      </div>
    </div>
  </div>
  <div className={styles.couponCard}>
    <div className={styles.couponImg} />
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消$100</div>
        <div className={styles.couponDate}>有效日期:2024/12/31</div>
      </div>
      <div className={styles.couponButton}>
        <button className={`${styles.couponBtn} btn`}>立即使用</button>
      </div>
    </div>
  </div>
  <div className={styles.couponCard}>
    <div className={styles.couponImg} />
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消$100</div>
        <div className={styles.couponDate}>有效日期:2024/12/31</div>
      </div>
      <div className={styles.couponButton}>
        <button className={`${styles.couponBtn} btn`}>立即使用</button>
      </div>
    </div>
  </div>
  <div className={styles.couponCard}>
    <div className={styles.couponImg} />
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消$100</div>
        <div className={styles.couponDate}>有效日期:2024/12/31</div>
      </div>
      <div className={styles.couponButton}>
        <button className={`${styles.couponBtn} btn`}>立即使用</button>
      </div>
    </div>
  </div>
</div>

  </div>
</div>
</>
);

};
export default MemberCouponMain;