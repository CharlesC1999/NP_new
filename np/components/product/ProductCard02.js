import React, { useState } from "react";
//style
import style from "@/components/product/productCard02.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

//fontAwsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductCard02() {
  return (
    <>
      <li className="list-unstyled">
        <div className={`${style["productCard"]} my-4`}>
          <div className={``}>
            <img
              src="/index-images/egg.png"
              alt="商品圖片"
              className={`${style["object-fit"]}`}
            />
          </div>
          <div className={`${style["product-info"]}`}>
            <h6 className={`${style["product-name"]} my-2`}>超級雞蛋</h6>
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
              <div className={`${style["price"]}`}>$500</div>
              <div
                className={`${style["price-buy"]} d-flex flex-row align-items-center`}
              >
                <div className={`${style["original-price"]} px-3`}>$100</div>
                <div
                  typt="submit"
                  className={`${style["btn"]} btn justify-content-center align-centent-center d-flex`}
                  // style={{
                  //   backgroundColor: "#DEF9EC",
                  //   border: "none",
                  //   borderRadius: "5px",
                  //   width: "35px",
                  //   height: "30px",
                  // }}
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
