import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./detail-ingredients.module.scss";

export default function DetailMain() {
  return (
    <>
      <div className={`row ${styles["ingredients-section"]}`}>
        <div
          className={`col-12 ${styles["figma-h4"]} ${styles["ingredient-title-m"]} text-center text-xxl-start`}
        >
          食材
        </div>
        <div
          className={`row ${styles["ingredients"]} d-flex justify-content-center justify-content-xxl-start`}
        >
          <div className={`col-4 col-xl-3 ${styles["ingredient-info"]}`}>
            <div
              className={`${styles["content"]} d-flex justify-content-between`}
            >
              <p>食材</p>
              <p>份量</p>
            </div>
          </div>
          <div className={`col-4 col-xl-3 ${styles["ingredient-info"]}`}>
            <div
              className={`${styles["content"]} d-flex justify-content-between`}
            >
              <p>食材</p>
              <p>份量</p>
            </div>
          </div>
          <div className={`col-4 col-xl-3 ${styles["ingredient-info"]}`}>
            <div
              className={`${styles["content"]} d-flex justify-content-between`}
            >
              <p>食材</p>
              <p>份量</p>
            </div>
          </div>
          <div className={`col-4 col-xl-3 ${styles["ingredient-info"]}`}>
            <div
              className={`${styles["content"]} d-flex justify-content-between`}
            >
              <p>食材</p>
              <p>份量</p>
            </div>
          </div>
          <div className={`col-4 col-xl-3 ${styles["ingredient-info"]}`}>
            <div
              className={`${styles["content"]} d-flex justify-content-between`}
            >
              <p>食材</p>
              <p>份量</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
