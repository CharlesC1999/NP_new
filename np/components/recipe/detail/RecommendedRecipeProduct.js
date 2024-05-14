import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./RecommendedRecipeProduct.module.scss";
import { useRouter } from "next/router";

export default function RecommendedRecipe({ recipes }) {
  const router = useRouter();
  const handleRecipeCheckout = () => {
    router.push(`/recipe?recipeId${recipes.recipe__i_d}`);
  };
  return (
    <>
      <div
        className={`col-12 mb-5 justify-content-center ${styles["figma-h4"]} text-align-center text-xxl-start ${styles["recommended-recipes-title-m"]}`}
      >
        其他推薦食譜
      </div>
      <div
        className={`row ${styles["recipe-cards"]} justify-content-between position-relative flex-nowrap`}
      >
        {recipes.map((v, i) => {
          return (
            // 食譜卡片
            <div
              key={v.id}
              onClick={() => {
                router.push(`/recipe/recipeId?id=${v.recipe__i_d}`);
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
    </>
  );
}
