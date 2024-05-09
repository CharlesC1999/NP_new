import React from "react";
import styles from "./Card4Hot.module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import FavIconProduct from "../favor/FavIconProduct";
function Card4Hot({ id, name, price, d_price, image }) {
  return (
    <>
      <div className={`${styles["card4"]}`}>
        <div className={`${styles["card4Img"]}`}>
          <a href={`/product/${id}`}>
            <img
              src={`/images/products/${image}`}
              className="{`${styles['card4ImgTop']}`}"
              alt="..."
            />
          </a>
        </div>
        <div className={`${styles["card4Body"]}`}>
          <h5 className={`${styles["card4Title"]}`}>{name}</h5>
          <div className={`d-flex ${styles["card4Content"]}`}>
            <div className={`d-flex ${styles["card4Text"]}`}>
              <p>$ {price}</p>
              <h6>NT$ {d_price}</h6>
            </div>
            <div>
              <FavIconProduct id={id} />
            </div>
          </div>
          <a className={`d-flex ${styles["card4Btn"]}`} type="button" href="#">
            <i className="fa-solid fa-cart-shopping"></i>&emsp;加入購物車
          </a>
        </div>
      </div>
    </>
  );
}

export default Card4Hot;
