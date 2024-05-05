import { useState, useEffect } from "react";

//styles
import style from "@/styles/Product/products.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";
import FavIconProduct from "../favor/FavIconProduct";

const notifyBtn = () => toast("已加入購物車 🛒");

function ProductMainText({
  id,
  name,
  price,
  description,
  discount_price,
  review_comments,
  average_rating,
  upload_date,
}) {
  return (
    <>
      <div className={`${style["product-text"]} d-flex flex-column`}>
        <div className={`${style["h3"]} mb-3`}>{name}</div>
        <p className={`${style["p"]} my-2`}>{description}</p>
        <div className={`${style["d-price"]}`}>{discount_price}</div>
        <div className={`${style["price"]}`}>${price}</div>
        <div
          className={`${style["star-row"]} d-flex flex-row my-2 align-items-center justify-content-between`}
        >
          <div
            className={`${style["star"]} pe-2 d-flex flex-row align-items-center justify-content-between`}
          >
            <div>
              <i className={`fa-solid fa-star`} />
              {average_rating}
            </div>
            <div className={`${style["star-text"]} ps-2 `}>(則評論)</div>
          </div>
         <FavIconProduct id={id}/>
        </div>
        <input
          className={`${style["amount"]} ps-4 my-2`}
          type="number"
          defaultValue={1}
        />
        <button
          type="submit"
          className={`${style["buy-btn"]}  my-2 btn d-flex justify-content-center align-items-center`}
          onClick={notifyBtn}
        >
          &nbsp;&nbsp;加入購物車{" "}
          <i
            className={`${style["fa-cart-shopping"]} fa-solid fa-cart-shopping ms-2`}
          ></i>
        </button>
      </div>
      <Toaster />
    </>
  );
}

export default ProductMainText;
