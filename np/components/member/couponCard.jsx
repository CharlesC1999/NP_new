import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./couponCard.module.css";


function CouponCard(){
  return (
<>
   <div className={styles.couponCard}>
  <div className={styles.couponImg} />
  <div className={styles.couponContent }>
    <div className={styles.couponDetails}>
      <div className={styles.lowbuy}>低消$100</div>
      <div className={styles.couponDate}>有效日期:2024/12/31</div>
    </div>
    <div className={styles.couponButton}>
      <button className={`${styles.couponBtn} btn btn-primary`}>立即使用</button>
    </div>
  </div>
</div>
</>
)
}

export default CouponCard
