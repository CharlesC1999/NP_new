import React from "react";
import styles from "./classCardMobileGrid.module.css";

const ProductCardMobileList = () => {
  return (
    <article className={styles.productCard}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a77577212d296ba1986c456e093d58e9a0d931127736f72d9307baa502fffcb?apiKey=05ed34dfc33e48adbcf96f614bb553e5&"
        alt="松露菜飯 product image"
        className={styles.productImage}
        loading="lazy"
      />
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>松露菜飯</h3>
        <div className={styles.productDate}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14px"
            height="14px"
            viewBox="0 0 24 24"
          >
            <path
              fill="#747e85"
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
            />
            <rect width={2} height={7} x={11} y={6} fill="#747e85" rx={1}>
              <animateTransform
                attributeName="transform"
                dur="18s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </rect>
            <rect width={2} height={9} x={11} y={11} fill="#747e85" rx={1}>
              <animateTransform
                attributeName="transform"
                dur="1.5s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </rect>
          </svg>
          <time dateTime="2024-05-26">2024 5月26日</time>
        </div>
        <div className={styles.productPricing}>
          <div className={styles.currentPrice}>$NT599</div>
          <div className={styles.originalPrice}>$999</div>
        </div>
        <div className={styles.productActions}>
          <a href="#" className={styles.actionLink}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cd0fa22651251ac90a3950b65de848025a94b63de491d78368103e6b2f1d098?apiKey=05ed34dfc33e48adbcf96f614bb553e5&"
              alt="Action icon"
              className={styles.actionIcon}
              loading="lazy"
            />
          </a>
          <a href="#" className={styles.actionLink}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b411245b92da64153133ecab20b8c3cb9120218c710e6bcdd22fd909b1d6230?apiKey=05ed34dfc33e48adbcf96f614bb553e5&"
              alt="Action icon"
              className={styles.actionIcon}
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductCardMobileList;
