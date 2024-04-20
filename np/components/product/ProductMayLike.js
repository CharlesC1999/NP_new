import { useState, useEffect } from "react";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import style from "@/components/product/products.module.scss";
import ProductCard from "./ProductCard02";
export default function ProductMayLike() {
  return (
    <>
      <div className={`${style["mlike"]} d-flex flex-column my-4`}>
        <h5 className={`${style["h5"]} py-sm-4 mt-5 mt-sm-none`}>你可能喜歡</h5>
        <div className={`${style["line"]} d-sm-flex d-none`} />
        <ul
          className={`${style["product-list"]} d-flex flex-sm-row flex-wrap justify-content-between`}
        >
          {/* <li>
            <div className={`${style["product-card"]} my-4`}>
              <div className={`${style["object-fit"]}`}>
                <img
                  src="/images/products-image/egg.png"
                  alt="商品圖片"
                  className={`${style["product-image"]}`}
                />
              </div>
              <div className={`${style["product-info"]}`}>
                <h6 className={`${style["product-name"]} my-2`}>超級雞蛋</h6>
                <div
                  className={`${style["product-rating"]} ${style["stars-row"]}  d-flex flex-row justify-content-sm-between  mb-3`}
                >
                  <div className={`${style["star"]}`}>
                    ★<span className={`${style["score"]} px-3`}>(4.2)</span>
                  </div>
                  <a className={`${style["favorite-btn"]} pe-3`}>
                    <i className={`fa-regular fa-heart`} />
                  </a>
                </div>
                <div
                  className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
                >
                  <div className={`${style["price"]}`}>$500</div>
                  <div className={`d-flex flex-row align-items-center`}>
                    <div className={`${style["original-price"]} px-3`}>
                      $100
                    </div>
                    <a
                      className={`add-to-cart-btn justify-content-center d-flex align-items-center`}
                    >
                      <FontAwesomeIcon icon={faCartShopping} color="#50BF8B" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li> */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ul>
      </div>
    </>
  );
}
