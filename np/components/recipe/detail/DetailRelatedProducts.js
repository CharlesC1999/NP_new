import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DetailRelatedProducts.module.scss"


export default function DetailRelatedProducts() {
  return (
    <>
                <div className={`row ${styles["related-products-section"]}`}>
              <div
                className={`col-12 ${styles["figma-h4"]} text-center text-xxl-start ${styles["related-ingredient-title-m"]}`}
              >
                相關食材
              </div>
              <div
                className={`col-12 col-xxl-10 ${styles["related-products"]} mx-auto`}
              >
                <div
                  className={`${styles["related-products-top"]} d-flex justify-content-between`}
                >
                  <div
                    className={`${styles["top-left"]} d-flex align-items-end`}
                  >
                    <input type="checkbox" />
                    <p className={styles["check-all"]}>全選</p>
                  </div>
                  <div className={`${styles["top-right"]} d-xxl-flex d-none`}>
                    <p>數量</p>
                    <p>小計</p>
                  </div>
                </div>
                <div
                  className={`${styles["related-products-middle"]} d-flex flex-column flex-xxl-row justify-content-between`}
                >
                  <div
                    className={`col-12 col-xxl-7 ${styles["middle-left"]} d-flex align-items-center`}
                  >
                    <input type="checkbox" />
                    <div className={styles["product-pic"]}>
                      <img
                        className="w-100 h-100 object-fit-cover"
                        src="/images/recipe/detail/eb0c2b4dc60ca444aaa6979ae5467f7a.jpg"
                        alt=""
                      />
                    </div>
                    <div className={styles["product-description"]}>
                      <p
                        className={`${styles["product-name"]} ${styles["figma-h5"]}`}
                      >
                        商品名稱
                      </p>
                      <div
                        className={`${styles["portion-and-price"]} d-flex gap-2`}
                      >
                        <p className={styles["portion"]}>份量</p>
                        <p className={styles["divider"]}>|</p>
                        <p className={styles["price"]}>單價 $ 165</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles["middle-right"]} d-flex align-items-center`}
                  >
                    <div
                      className={`${styles["quantity"]} d-flex align-items-center`}
                    >
                      <button
                        type="button"
                        className={`btn btn-primary ${styles["figma-h5"]}`}
                      >
                        -
                      </button>
                      <p className={styles["figma-h6"]}>1</p>
                      <button
                        type="button"
                        className={`btn btn-primary ${styles["figma-h5"]}`}
                      >
                        +
                      </button>
                    </div>
                    <p
                      className={`${styles["subtotal"]} ${styles["figma-h6"]}`}
                    >
                      $ 165
                    </p>
                  </div>
                </div>
                <div
                  className={`${styles["related-products-bottom"]} d-flex flex-column flex-xxl-row justify-content-end align-items-center gap-3`}
                >
                  <p className={styles["total"]}>共選擇8項商品，共計1,320元</p>
                  <button type="button" className="btn btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      height={15}
                      viewBox="0 0 15 15"
                      fill="none"
                    >
                      <mask
                        id="mask0_2921_33112"
                        style={{ maskType: "luminance" }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={15}
                        height={15}
                      >
                        <path
                          d="M14.5 0.662109H0.5V14.6621H14.5V0.662109Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask0_2921_33112)">
                        <path
                          d="M14.5 2.41211H2.9745L2.95 2.20736C2.89986 1.78177 2.69531 1.38937 2.37512 1.10455C2.05493 0.819739 1.64137 0.662309 1.21283 0.662109H0.5V1.82878H1.21283C1.35571 1.8288 1.49361 1.88125 1.60038 1.97619C1.70716 2.07114 1.77536 2.20196 1.79208 2.34386L2.71667 10.2002C2.7668 10.6258 2.97136 11.0182 3.29155 11.303C3.61174 11.5878 4.0253 11.7453 4.45383 11.7454H12.1666V10.5788H4.45383C4.31086 10.5788 4.17289 10.5262 4.06611 10.4311C3.95932 10.3361 3.89117 10.2051 3.87458 10.0631L3.79817 9.4121H13.2376L14.5 2.41211ZM12.2623 8.24543H3.66108L3.11217 3.57878H13.1041L12.2623 8.24543Z"
                          fill="#F7F8F5"
                        />
                        <path
                          d="M4.58317 14.6617C5.2275 14.6617 5.74984 14.1394 5.74984 13.495C5.74984 12.8507 5.2275 12.3284 4.58317 12.3284C3.93884 12.3284 3.4165 12.8507 3.4165 13.495C3.4165 14.1394 3.93884 14.6617 4.58317 14.6617Z"
                          fill="#F7F8F5"
                        />
                        <path
                          d="M10.4167 14.6617C11.061 14.6617 11.5833 14.1394 11.5833 13.495C11.5833 12.8507 11.061 12.3284 10.4167 12.3284C9.77238 12.3284 9.25 12.8507 9.25 13.495C9.25 14.1394 9.77238 14.6617 10.4167 14.6617Z"
                          fill="#F7F8F5"
                        />
                      </g>
                    </svg>
                    加入購物車
                  </button>
                </div>
              </div>
            </div>

    </>
  )
}
