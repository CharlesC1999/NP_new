import React, { useState } from "react";
//style
import style from "@/components/product/productCard02.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// {
//   "id": "171",
//   "category_id": "19",
//   "name": "新生活鮮奶茶",
//   "description": "◆50%生乳含量 ◆台灣在地魚池茶葉熬煮 ◆使用天然蔗糖 無任何奶粉、香精、人工添加物等等的多餘原料，市面上最天然的鮮奶茶，成分單純，市面上的鮮奶茶即使有標榜使用生乳，但是生乳的比例若非達到50%就稱為『乳飲品』而非『調味乳』。",
//   "price": "95",
//   "stock_quantity": "24",
//   "F_coupon_id": "31",
//   "upload_date": "2022-09-28 00:00:00",
//   "valid": "1"
// }

export default function ProductCard02({ id, name, price }) {
  return (
    <>
      <li key={id} className="list-unstyled">
        <div className={`${style["productCard"]} my-4`}>
          <div className={``}>
            <img
              src="/index-images/egg.png"
              alt="商品圖片"
              className={`${style["object-fit"]}`}
            />
          </div>
          <div className={`${style["product-info"]}`}>
            <h6 className={`${style["product-name"]} my-2`}>{name}</h6>
            <div
              className={`${style["stars-row"]}  d-flex flex-row justify-content-between  mb-3`}
            >
              <div className={`${style["star"]}`}>
                ★<span className={`${style["score"]} px-3`}>(4.2)</span>
              </div>
              <button
                className={`${style["favorite-btn"]} pe-1 pe-sm-2 d-flex justify-content-center align-items-center`}
                style={{ border: "none" }}
              >
                <i className={`fa-regular fa-heart`} />
              </button>
            </div>
            <div
              className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
            >
              <div className={`${style["price"]}`}>{price}</div>
              <div
                className={`${style["price-buy"]} d-flex flex-row align-items-center`}
              >
                <div className={`${style["original-price"]} px-3`}>{price}</div>
                <div
                  typt="submit"
                  className={`${style["btn"]} btn justify-content-center align-centent-center d-flex`}
                >
                  <i
                    className={`fa-solid fa-cart-shopping`}
                    style={{ color: "#3BB77E" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
