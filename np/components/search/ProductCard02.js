import React, { useState } from "react";
//style
import style from "@/components/product/productCard02.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import FavIconProduct from "@/components/favor/FavIconProduct";

export default function ProductCard02({ productsData, Index }) {
  console.log(productsData, "classDW");
  return (
    <>
      <li key={productsData.id} className="list-unstyled mx-auto ">
        <div className={`${style["productCard"]} mb-4 mx-1`}>
          <div className={`${style["CardImg"]}`}>
            <img
              src={`/images/products/${productsData.image_url}`}
              alt="商品圖片"
              className={`${style["object-fit"]}`}
            />
          </div>

          <div className={`${style["product-info"]}`}>
            <h6 className={`${style["product-name"]} my-2`}>
              {productsData.product_name}
            </h6>
            <div
              className={`${style["stars-row"]}  d-flex flex-row justify-content-between  mb-3`}
            >
              <div className={`${style["star"]}`}>
                ★
                <span className={`${style["score"]} px-3`}>
                  ({productsData.average_rating})
                </span>
              </div>
              <FavIconProduct id={productsData.id} />
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
                  {productsData.discount_price !== null ? (
                    <>
                      <div className={`${style["price"]}`}>
                        {productsData.discount_price}
                      </div>
                      <div className={`${style["original-price"]} px-3`}>
                        {productsData.product_price}
                      </div>
                    </>
                  ) : (
                    <div className={`${style["price"]}`}>
                      $ {productsData.product_price}
                    </div>
                  )}
                </div>
                <a
                  type="button"
                  className={`${style["btn"]} btn justify-content-center align-centent-center d-flex`}
                  onClick={() => {
                    if (!auth.isLoggedIn) {
                      return toast.error("請先登入再使用!");
                    }

                    // notify(productsData.product_name);
                    // addProduct({ productsData.id, productsData.product_name, productsData.price, productsData.image_url });
                  }}
                >
                  <i
                    className={`fa-solid fa-cart-shopping`}
                    style={{ color: "#3BB77E" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
