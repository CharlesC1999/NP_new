import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/use-cart";
//style
import style from "@/components/search/productCard02.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import FavIconProduct from "@/components/favor/FavIconProduct";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ProductCard02({ productsData, Index, qty = 1 }) {
  console.log(productsData, "classDW");
  const { id, product_name, product_price, image_url } = productsData;
  console.log(id, product_name, product_price, image_url, qty);
  const { auth } = useAuth();
  const { addProduct } = useCart();
  const MySwal = withReactContent(Swal);
  const notify = (productName) => {
    MySwal.fire({
      title: "成功加入",
      text: productName + "已成功加入購物車!",
      icon: "success",
    });
  };
  const goProductDetail = (id) => {
    // 方法一
    // Router.push(`/class-page/class-detail/${class__i_d}`);
    // 方法二
    Router.push({
      pathname: "/product/productId",
      query: { id: id },
    });
  };
  return (
    <>
      <li key={productsData.id} className="list-unstyled mx-auto ">
        <div className={`${style["productCard"]} mb-4 mx-1`}>
          <div
            className={`${style["CardImg"]}`}
            onClick={() => goProductDetail(productsData.id)}
          >
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
                  onClick={(e) => {
                    e.preventDefault();
                    if (!auth.isLoggedIn) {
                      return toast.error("請先登入再使用!");
                    }
                    console.log("Adding product:", {
                      id,
                      image_url,
                      product_name,
                      product_price,
                      qty,
                    });
                    notify(product_name);
                    addProduct({
                      id,
                      image_url,
                      product_name,
                      product_price,
                      qty,
                    });
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
