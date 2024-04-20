import { useState, useEffect } from "react";
import HeaderComponent from "@/components/header";
import Footer from "@/components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import style from "@/components/product/products.module.scss";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function ProductMainPic() {
  return (
    <>
      <div className={`${style["product-pic"]} d-flex flex-column`}>
        <div className={`${style["p-img"]}`}>
          <img
            className={`${style["object-fit"]}`}
            src="/images/products-image/Rectangle 48.png"
            alt
          />
        </div>
        <ul
          className={`${style["sliders"]} position-relative d-flex flex-row align-items-center justify-content-between my-3`}
        >
          <li
            className={`${style["prov-pic"]} position-absolute d-flex align-items-center justify-content-center`}
          >
            <svg
              className={`w-6 h-6 text-gray-800 dark:text-white`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m15 19-7-7 7-7"
              />
            </svg>
          </li>
          <li className={`${style["pic-item"]}`}>
            <img
              className={`${style["object-fit"]}`}
              src="/images/products-image/Rectangle 51.png"
              alt
            />
          </li>
          <li className={`${style["pic-item"]}`}>
            <img
              className={`${style["object-fit"]}`}
              src="/images/products-image/Rectangle 51.png"
              alt
            />
          </li>
          <li className={`${style["pic-item"]}`}>
            <img
              className={`${style["object-fit"]}`}
              src="/images/products-image/Rectangle 51.png"
              alt
            />
          </li>
          <li className={`${style["pic-item"]}`}>
            <img
              className={`${style["object-fit"]}`}
              src="/images/products-image/Rectangle 51.png"
              alt
            />
          </li>
          <li
            className={`${style["next-pic"]} position-absolute d-flex align-items-center justify-content-center`}
          >
            <svg
              className={`w-6 h-6 text-gray-800 dark:text-white`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m9 5 7 7-7 7"
              />
            </svg>
          </li>
        </ul>
      </div>
    </>
  );
}
