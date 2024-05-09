import React, { useState } from "react";
//style
import style from "@/components/product/productCard02.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import FavIconProduct from "@/components/favor/FavIconProduct";

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
              src={`/images/products/${img}`}
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
              <button
                className={`${style["favorite-btn"]} pe-1 pe-sm-2 d-flex justify-content-center align-items-center`}
                style={{ border: "none" }}
              >
                <FavIconProduct id={id} />
              </button>
            </div>
            <div
              className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
            >
              <div
                className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
              >
                <div
                  className={`${style["price-buy"]} d-flex flex-row align-items-center justify-content-between`}
                >
                  {disPrice !== null ? (
                    <>
                      <div className={`${style["price"]}`}>{disPrice}</div>
                      <div className={`${style["original-price"]} px-3`}>
                        {price}
                      </div>
                    </>
                  ) : (
                    <div className={`${style["price"]}`}>{price}</div>
                  )}
                </div>
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
