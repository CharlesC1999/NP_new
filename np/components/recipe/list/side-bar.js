import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./side-bar.module.scss";

export default function SideBar() {
  return (
    <>
      <div className={`d-none d-xxl-block col-3 ${styles["side-bar"]}`}>
        <div className={`row ${styles["row"]}`}>
          <section
            className={`${styles["side-bar-wrapper"]} col-10 d-flex flex-column ms-auto`}
          >
            <div className={`${styles["side-bar-top"]} d-flex flex-column`}>
              <p className={styles["figma-h5"]}>推薦食譜</p>
              <div className={`${styles["green-divider"]} w-25`} />
            </div>
            {/* 食譜卡片 */}
            <div className={`${styles["side-card"]} row d-flex`}>
              <div className="col-6">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/images/recipe/list/side-bar-pic.png"
                  alt=""
                />
              </div>
              <div className="col-5 d-flex flex-column justify-content-between">
                <p
                  className={`${styles["side-card-title"]} ${styles["figma-h6"]}`}
                >
                  法式經典油封鴨腿
                </p>
                <p className={styles["side-card-description"]}>
                  一夜干午仔魚一包
                  3包組這組一夜干午仔魚以新鮮午仔魚經過嚴格製程製成，每包240克，總共3包。透過一夜的自然風乾，保留了午仔魚的鮮味和營養價值。魚肉質鮮嫩，風味獨特，適合當零嘴或配菜，是海味愛好者的美味選擇。
                </p>
                <p className={styles["side-card-date"]}>2023-11-15</p>
              </div>
            </div>
            <div className={`${styles["side-card"]} row d-flex`}>
              <div className="col-6">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/images/recipe/list/side-bar-pic.png"
                  alt=""
                />
              </div>
              <div className="col-5 d-flex flex-column justify-content-between">
                <p
                  className={`${styles["side-card-title"]} ${styles["figma-h6"]}`}
                >
                  法式經典油封鴨腿
                </p>
                <p className={styles["side-card-description"]}>
                  一夜干午仔魚一包
                  3包組這組一夜干午仔魚以新鮮午仔魚經過嚴格製程製成，每包240克，總共3包。透過一夜的自然風乾，保留了午仔魚的鮮味和營養價值。魚肉質鮮嫩，風味獨特，適合當零嘴或配菜，是海味愛好者的美味選擇。
                </p>
                <p className={styles["side-card-date"]}>2023-11-15</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
