import { useState, useEffect } from "react";
//components
import HeaderComponent from "@/components/header";
import Footer from "@/components/footer";
//styles
import style from "@/styles/Product/products.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
//Font Awsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProductCard.module.css";

function ProductMainText() {
  return (
    <>
      <div className={`${style["product-text"]} d-flex flex-column`}>
        <div className={`${style["h3"]} mb-3`}>台灣無刺虱目魚肚X5片</div>
        <p className={`${style["p"]} my-2`}>
          以純海水放養的虱目魚，無土味且營養價值高。產地位於紅樹林溼地，水中含豐富有機質及浮游生物，提供充分的天然養份。生態養殖虱目魚活動力高，因而肉質極富彈性，肉色偏粉紅，是老饕心中的夢幻滋味。
        </p>
        <div className={`${style["d-price"]}`}>$100</div>
        <div className={`${style["price"]}`}>$320</div>
        <div
          className={`${style["star-row"]} d-flex flex-row my-2 align-items-center justify-content-between`}
        >
          <div
            className={`${style["star"]} pe-2 d-flex flex-row align-items-center justify-content-between`}
          >
            <div>
              <i className={`fa-solid fa-star`} />
            </div>
            <div className={`${style["star-text"]} ps-2 `}>(125則評論)</div>
          </div>
          <a className={`${style["favorite-btn"]} ${style["icon-link"]} `}>
            <i className={`fa-regular fa-heart`} style={{ color: "#50BF8B" }} />
          </a>
        </div>
        <input
          className={`${style["amount"]} ps-4 my-2`}
          type="number"
          defaultValue={1}
        />
        <button
          type="submit"
          className={`${style["buy-btn"]}  my-2 btn d-flex justify-content-center align-items-center`}
        >
          &nbsp;&nbsp;加入購物車{" "}
          <i
            className={`${style["fa-cart-shopping"]} fa-solid fa-cart-shopping ms-2`}
          ></i>
        </button>
      </div>
    </>
  );
}

export default ProductMainText;
