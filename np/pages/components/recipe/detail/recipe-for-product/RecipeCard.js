import React from "react";
import styles from "./RecipeCard.module.scss";

export default function RecipeCard() {
  return (
    <>
      <div
        className={`col-6 col-xxl-3 ${styles["recipe-card"]} d-flex flex-column`}
      >
        <div className={`${styles["card-pic"]} w-100`}>
          <img
            className="w-100 h-100 object-fit-cover"
            src="/images/recipe/detail/38f958b0414526b33f0cd55c033c8be6.jpg"
            alt=""
          />
        </div>
        <div
          className={`${styles["card-content"]} d-flex flex-column align-items-center`}
        >
          <p className={`${styles["recipe-name"]} ${styles["figma-h5"]}`}>
            法式經典油封鴨腿
          </p>
          <p
            className={`${styles["recipe-description"]} ${styles["truncate"]}`}
          >
            法式經典油封鴨腿
            選用宜蘭的櫻桃鴨，以法式古法鹽漬風乾後浸泡在大量鴨油與香料裡，低溫烘烤至酥爛。
          </p>
        </div>
      </div>
    </>
  );
}
