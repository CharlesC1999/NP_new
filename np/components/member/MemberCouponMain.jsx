import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./MemberCoupon.module.css"


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
  <div className={styles.couponcat}>
    <div className={styles.ccathover}><a href>全部</a></div>
    <div className={styles.ccat}><a href>待付款</a></div>
    <div className={styles.ccat}> <a href>待出貨</a></div>
    <div className={styles.ccat}><a href>待收貨</a></div>
    <div className={styles.ccat}><a href>已完成</a></div>
    <div className={styles.ccat}><a href>取消</a></div>
  </div>
  {/* 分類欄下面的搜尋框 */}
  <div className={styles.mainsearch}>
    <div className={styles.mscontent}>Search for ltemss...</div>
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d7b4236db983404c60a8e6f407043967fd36bb8b4dd9dd5af142d2320770caa?" className={styles.img} />
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