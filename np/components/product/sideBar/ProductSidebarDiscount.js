import React from "react";

import styles from "@/components/product/sideBar/productSidebarDiscount.module.scss";
import DiscountItem from "@/components/product/sideBar/DiscountItem";
export default function ProductSidebarDiscount({
  DisCountCategories,
  handleCategoryClick,
  categoryCounts,
}) {
  return (
    <>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5>優惠活動</h5>
        </div>
        <div className={`${styles.line}`}></div>
        {DisCountCategories.map((category) => (
          <div
            key={category.cateId}
            onClick={() => handleCategoryClick(category.cateId)}
          >
            <DiscountItem
              category_name={category.cateName}
              categoryCounts={categoryCounts}
            />
          </div>
        ))}
      </div>
    </>
  );
}
