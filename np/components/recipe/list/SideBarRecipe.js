import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./SideBarRecipe.module.scss";
import Link from "next/link";

export default function SideBar() {
  return (
    <>
      <div className={`row ${styles["row"]}`}>
        <section className={`${styles["side-bar-wrapper"]} d-flex flex-column`}>
          <div className={`${styles["side-bar-top"]} d-flex flex-column`}>
            <p className={styles["figma-h5"]}>推薦食譜</p>
            <div className={`${styles.line}`}></div>
          </div>
          {/* 食譜卡片 */}
          // 羊肉燉湯
          <Link href={`/recipe/4`} className="text-decoration-none text-dark">
            <div className={`${styles["side-card"]} row d-flex`}>
              <div className="col-6">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/images/recipe/list/11_mrqcobkSlT.jpg"
                  alt=""
                />
              </div>
              <div
                className={`col d-flex flex-column justify-content-between gap-2 ${styles["side-card-content"]}`}
              >
                <p
                  className={`${styles["side-card-title"]} ${styles["figma-h6"]}`}
                >
                  羊肉燉湯
                </p>
                <p className={styles["side-card-description"]}>
                  天冷進補，來碗羊肉燉湯 暖暖身子暖暖胃。
                </p>
                <p className={styles["side-card-date"]}>2022-11-04</p>
              </div>
            </div>
          </Link>
          {/* 檸檬奶油干貝 */}
          <Link href={`/recipe/49`} className="text-decoration-none text-dark">
            <div className={`${styles["side-card"]} row d-flex`}>
              <div className="col-6">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/images/recipe/list/47_FmpcTYkgei.jpg"
                  alt=""
                />
              </div>
              <div
                className={`col d-flex flex-column justify-content-between gap-2 ${styles["side-card-content"]}`}
              >
                <p
                  className={`${styles["side-card-title"]} ${styles["figma-h6"]}`}
                >
                  檸檬奶油干貝
                </p>
                <p className={styles["side-card-description"]}>
                  檸檬奶油干貝是一道美味的海鮮料理，融合了檸檬的清新酸味和奶油的濃郁香氣，為干貝帶來豐富的風味。
                </p>
                <p className={styles["side-card-date"]}>2022-08-05</p>
              </div>
            </div>
          </Link>
          {/* 清蒸比目魚 */}
          <Link href={`/recipe/48`} className="text-decoration-none text-dark">
            <div className={`${styles["side-card"]} row d-flex`}>
              <div className="col-6">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/images/recipe/list/26_ECKPGoqDRo.jpg"
                  alt=""
                />
              </div>
              <div
                className={`col d-flex flex-column justify-content-between gap-2 ${styles["side-card-content"]}`}
              >
                <p
                  className={`${styles["side-card-title"]} ${styles["figma-h6"]}`}
                >
                  清蒸比目魚
                </p>
                <p className={styles["side-card-description"]}>
                  清蒸比目魚，簡潔清爽，保留鮮美原味，是健康輕食的極佳選擇，營養豐富，口感鮮嫩，深受喜愛。
                </p>
                <p className={styles["side-card-date"]}>2023-02-28</p>
              </div>
            </div>
          </Link>
          {/* 熱炒小卷 */}
          <Link href={`/recipe/50`} className="text-decoration-none text-dark">
            <div className={`${styles["side-card"]} row d-flex`}>
              <div className="col-6">
                <img
                  className="w-100 h-100 object-fit-cover"
                  src="/images/recipe/list/42_vpXOAEMBZR.png"
                  alt=""
                />
              </div>
              <div
                className={`col d-flex flex-column justify-content-between gap-2 ${styles["side-card-content"]}`}
              >
                <p
                  className={`${styles["side-card-title"]} ${styles["figma-h6"]}`}
                >
                  熱炒小卷
                </p>
                <p className={styles["side-card-description"]}>
                  小卷又稱小管、透抽、鎖管，主要產在夏、秋兩個季節，是台灣人喜歡的海鮮。
                  小卷含豐富蛋白質、維生素E、鋅，低脂肪、低熱量，是有益身體健康的好食材。
                </p>
                <p className={styles["side-card-date"]}>2022-08-06</p>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </>
  );
}
