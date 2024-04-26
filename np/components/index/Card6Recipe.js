import React from "react";
import styles from "./Card6Recipe.module.css";

function Card6Recipe() {
  return (
    <>
      <a href="" className={`text-decoration-none ${styles.Card6RecipeLink}`}>
        <div className={`d-flex ${styles["card6"]}`}>
          <div className={`${styles["card6Img"]}`}>
            <img src="/index-images/Rectangle 2.png" alt="" />
          </div>
          <div className={`${styles["card6Text"]}`}>
            <h5>蹄膀封筍</h5>

            <p>
            遵循古早傳統做法，細火熬煮三小時以上，待蹄膀滷的香濃入味後，再用滷汁將筍乾滷入味。蹄膀肉質Q 軟卻不油膩，外皮彈牙富有膠質，筍乾爽脆。麻竹筍經殺菁發酵後，以人工翻面曝曬讓筍乾成自然褐黃並散發濃厚筍香，搭配出最經典的美味。
            </p>
          </div>
        </div>
      </a>
    </>
  );
}

export default Card6Recipe;
