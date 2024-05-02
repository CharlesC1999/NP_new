import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DetailIngredients.module.scss";

export default function DetailIngredients({ recipe }) {
  // 把食材跟份量拆開
  // 資料大概會長下面這樣，後續再用map處理，並用v[0]跟v[1]取出裡面的兩個值
  // 0: Array [ "羊肉", "250g" ]
  // 1: Array [ "薑", "100g" ]
  // 2: Array [ "蔥", "50g" ]
  const ingredientAry = recipe.ingredients.split(",").map((v) => {
    return v.split("&");
  });
  console.log(ingredientAry);

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
          {ingredientAry.map((v) => {
            return (
              <div className={`col-4 col-xl-3 ${styles["ingredient-info"]}`}>
                <div
                  className={`${styles["content"]} d-flex justify-content-between`}
                >
                  <p>{v[0]}</p>
                  <p>{v[1]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
