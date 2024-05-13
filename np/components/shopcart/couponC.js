import React from "react";
import styles from "./couponC.module.scss";

export default function CouponC({ couponDetail, Index }) {
  return (
    <div key={Index}>
      <div className={styles.cardSetContainer}>
        <img src={`@/${couponDetail.coupon_image}`} alt="優惠券" />
        <div className={styles.cName}>{couponDetail.c_name}</div>
      </div>
    </div>
  );
}
