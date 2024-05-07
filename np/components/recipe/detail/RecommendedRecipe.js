import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./RecommendedRecipe.module.scss";
import { useRouter } from "next/router";

export default function RecommendedRecipe({
  sliderRef,
  recommendedRecipes = [],
}) {
  const router = useRouter();
  return (
    <>
      <div
        className={`col-12 ${styles["figma-h4"]} text-center text-xxl-start ${styles["recommended-recipes-title-m"]}`}
      >
        其他推薦食譜
      </div>
      <div
        ref={sliderRef}
        className={`row ${styles["recipe-cards"]} justify-content-between position-relative flex-nowrap`}
      >
        {recommendedRecipes.map((v, i) => {
          return (
            // 食譜卡片
            <div
              onClick={() => {
                router.push(`/recipe/${v.recipe__i_d}`);
              }}
              className={`col-6 col-xxl-3 ${styles["recipe-card"]} d-flex flex-column`}
            >
              <div className={`${styles["card-pic"]} w-100`}>
                <img
                  className="w-100 h-100 object-fit-cover"
                  src={`/images/recipe/list/${v.image__u_r_l}`}
                  alt=""
                />
              </div>
              <div
                className={`${styles["card-content"]} d-flex flex-column align-items-center`}
              >
                <p className={`${styles["recipe-name"]} ${styles["figma-h5"]}`}>
                  {v.title__r_name}
                </p>
                <p
                  className={`${styles["recipe-description"]} ${styles["truncate"]}`}
                >
                  {v.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* pagination */}
      {/* <div className="row">
        <div
          className={`${styles["pagination"]} d-flex gap-2 justify-content-center`}
        >
          <div className={`${styles["page"]} ${styles["current"]}`} />
          <div className={styles["page"]} />
          <div className={styles["page"]} />
        </div>
      </div> */}
    </>
  );
}
