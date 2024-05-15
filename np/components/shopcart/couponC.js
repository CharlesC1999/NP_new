import React from "react";
import styles from "./couponC.module.scss";

export default function CouponC({ couponDetail, Index, onSelect }) {
  return (
    <div key={Index}>
      <button
        className={styles.cardSetContainer}
        onClick={() => onSelect(couponDetail)}
      >
        <img
          src={`/images/coupon-image/${couponDetail.coupon_image}`}
          alt="優惠券"
          className={styles.cardImage}
        />
        <div className={styles.couponDetail}>
          <div className={styles.cName}>{couponDetail.c_name}</div>
          <div className={styles.cMinPrice}>
            最低消費金額：{couponDetail.minimum_spend}
          </div>
          <div className={styles.cLastDate}>
            最後使用期限：{couponDetail.valid_end_date}
          </div>
        </div>
      </button>
    </div>
  );
}
