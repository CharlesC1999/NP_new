import React from "react";

import styles from "@/components/product/sideBar/productSidebarDiscount.module.scss";
import DiscountItem from "@/components/product/sideBar/DiscountItem";
export default function ProductSidebarDiscount() {
  return (
    <>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5>優惠活動</h5>
        </div>
        <div className={`${styles.line}`}></div>
        <DiscountItem />
        <DiscountItem />
        <DiscountItem />
        <DiscountItem />
        <DiscountItem />
      </div>
    </>
  );
}
