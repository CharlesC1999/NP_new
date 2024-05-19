import React from "react";
import style from "@/components/product/sideBar/discountItem.module.scss";

function DiscountItem({ category_name, categoryCounts }) {
  return (
    <>
      <div
        className="d-flex gap-3 flex-column mt-3"
        style={{ cursor: "pointer" }}
      >
        <div
          className={`${style.sideBox} d-flex align-items-center justify-content-between p-2`}
        >
          <div className={`${style.discountText} align-items-center`}>
            <i class="fa-solid fa-tags me-2"></i>
            {category_name}
          </div>
          <div className={`${style.amount} align-items-center`}>
            {" "}
            {/* {categoryCounts[category_name] || 0}{" "} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default DiscountItem;
