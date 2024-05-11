import React, { useState } from "react";
//style
import style from "@/components/product/productCard02.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import FavIconProduct from "@/components/favor/FavIconProduct";

// 購物車加入按鈕加入購物車
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/use-cart";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
export default function ProductCard02({
  id,
  name,
  price,
  disPrice,
  img,
  image,
  average_rating,
}) {
  // 購物車加入按鈕加入購物車
  const { addProduct } = useCart();
  const { auth } = useAuth();
  const MySwal = withReactContent(Swal);
  const notify = (productName) => {
    MySwal.fire({
      title: "成功加入",
      text: productName + "已成功加入購物車!",
      icon: "success",
    });
  };
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
                    <div className={`${style["price"]}`}>$ {price}</div>
                  )}
                </div>
                <a
                  type="button"
                  className={`${style["btn"]} btn justify-content-center align-centent-center d-flex`}
                  onClick={() => {
                    if (!auth.isLoggedIn) {
                      return toast.error("請先登入再使用!");
                    }
                    console.log("Adding product:", {
                      id,
                      name,
                      price,
                      image,
                    });
                    notify(name);
                    addProduct({ id, name, price, image });
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
