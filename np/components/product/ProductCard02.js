import React, { useState } from "react";
//style
import style from "@/components/product/productCard02.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductCard02({
  id,
  name,
  price,
  disPrice,
  img,
  average_rating,
}) {
  return (
    <>
      <li key={id} className="list-unstyled">
        <div className={`${style["productCard"]} my-4`}>
          <div className={`${style["CardImg"]}`}>
            <img
              src={`/index-images/p-image/${img}`}
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
                ★
                <span className={`${style["score"]} px-3`}>
                  ({average_rating})
                </span>
              </div>
              <FavIconProduct id={id} />
            </div>
            <div
              className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
            >
              <div
                className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
              >
                <div
                  type="submit"
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
