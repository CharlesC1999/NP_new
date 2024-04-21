import React from "react";
import style from "@/components/product/sideBar/discountItem.module.scss";

function DiscountItem() {
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
            優惠商品
          </div>
          <div className={`${style.amount} align-items-center`}>3</div>
        </div>
      </div>
    </>
  );
}

export default DiscountItem;
