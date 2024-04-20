import { useState, useEffect } from "react";
import HeaderComponent from "@/components/header";
import Footer from "@/components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import style from "@/components/product/products.module.scss";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

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
            <i className={`fa-regular fa-heart`} />
          </a>
        </div>
        <input
          className={`${style["amount"]} ps-4 my-2`}
          type="number"
          defaultValue={1}
        />
        <button
          type="submit"
          className={`${style["buy-btn"]}  my-2 btn btn-outline-success`}
        >
          <span className={``}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              class="aBitMargin mobile-none"
            >
              <path
                fill="none"
                stroke="#50BF8B"
                stroke-width="2"
                d="M5 5h17l-2 9H7L4 2H0m7 12l1 4h13m-2 5a1 1 0 1 1 0-2a1 1 0 0 1 0 2ZM9 23a1 1 0 1 1 0-2a1 1 0 0 1 0 2Z"
              />
            </svg>
          </span>
          &nbsp;&nbsp;加入購物車
        </button>
      </div>
    </>
  );
}

export default ProductMainText;
