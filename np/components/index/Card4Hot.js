import React from "react";
import styles from "./Card4Hot.module.css";
import "@fortawesome/fontawesome-free/css/all.css";

function Card4Hot() {
  return (
    <>
      {/* <a href="#" className={styles.card4Link}> */}
        <div className={`${styles["card4"]}`}>
          <div className={`${styles["card4Img"]}`}>
            <a href="product.html">
              <img
                src="/index-images/image1.png"
                className="{`${styles['card4ImgTop']}`}"
                alt="..."
              />
            </a>
          </div>
          <div className={`${styles["card4Body"]}`}>
            <h5 className={`${styles["card4Title"]}`}>台灣無刺虱目魚肚（五入裝）</h5>
            <div className={`d-flex ${styles["card4Content"]}`}>
              <div className={`d-flex ${styles["card4Text"]}`}>
                <p>$ 600</p>
                <h6>NT$ 300</h6>
              </div>
              <i
                className={`fa-sharp fa-regular fa-heart ${styles.heart}`}
              />
            </div>
            <a className={`d-flex ${styles["card4Btn"]}`} type="button" href="">
              <i className="fa-solid fa-cart-shopping"></i>&emsp;加入購物車
            </a>
          </div>
        </div>
    </>
  );
}

export default Card4Hot;
