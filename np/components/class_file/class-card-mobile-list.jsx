import React from "react";
import styles from "./classCardMobileList.module.css";

const ProductCardMobileList = () => {
  return (
    <article className={styles.productCard}>
      <figure className={styles.productImageWrapper}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/78d6e95220ed902c7fc924d45f41800d751471165f7af4da41420c24df21d509?apiKey=05ed34dfc33e48adbcf96f614bb553e5&"
          alt="Product Image"
          className={styles.productImage}
        />
      </figure>
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>營養師手做年菜上桌</h3>
        <div className={styles.productMeta}>
          <div className={styles.productDate}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12px"
              height="12px"
              viewBox="0 0 24 24"
            >
              <path
                fill="#454545"
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
              />
              <rect width={2} height={7} x={11} y={6} fill="#454545" rx={1}>
                <animateTransform
                  attributeName="transform"
                  dur="18s"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 12 12;360 12 12"
                />
              </rect>
              <rect width={2} height={9} x={11} y={11} fill="#454545" rx={1}>
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
          <div className={styles.productAuthor}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12px"
              height="12px"
              viewBox="0 0 36 36"
            >
              <path
                fill="#454545"
                d="M30.61 24.52a17.16 17.16 0 0 0-25.22 0a1.51 1.51 0 0 0-.39 1v6A1.5 1.5 0 0 0 6.5 33h23a1.5 1.5 0 0 0 1.5-1.5v-6a1.51 1.51 0 0 0-.39-.98"
                className={styles.clrISolidClrISolidPath1}
              />
              <circle
                cx={18}
                cy={10}
                r={7}
                fill="#454545"
                className={styles.clrISolidClrISolidPath2}
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
            <span>Walt White</span>
          </div>
        </div>
        <div className={styles.productPricing}>
          <span className={styles.currentPrice}>$NT599</span>
          <span className={styles.originalPrice}>$999</span>
        </div>
        <div className={styles.productActions}>
          <a href="#" className={styles.actionLink}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4cd0fa22651251ac90a3950b65de848025a94b63de491d78368103e6b2f1d098?apiKey=05ed34dfc33e48adbcf96f614bb553e5&"
              alt="Action 1"
              className={styles.actionIcon}
            />
          </a>
          <a href="#" className={styles.actionLink}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/12c463020f554bb50b1abfb8cf140b741c2e5808718fcfa591bf4f71dd337745?apiKey=05ed34dfc33e48adbcf96f614bb553e5&"
              alt="Action 2"
              className={styles.actionIcon}
            />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductCardMobileList;
