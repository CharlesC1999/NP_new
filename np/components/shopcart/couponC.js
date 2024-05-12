import React from "react";

export default function CouponC({ couponDetail, Index }) {
  return (
    <div key={Index}>
      <div>
        <img src={`@/${couponDetail.coupon_image}`} alt="優惠券" />
      </div>
    </div>
  );
}
