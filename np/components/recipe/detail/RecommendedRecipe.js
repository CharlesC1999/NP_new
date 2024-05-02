import { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./RecommendedRecipe.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function RecommendedRecipe() {
  // 放在slider，用來設定偏移，左或右
  const sliderRef = useRef();

  // 向左移動的距離
  const [moveLeft, setMoveLeft] = useState(0);
  // 向右移動的距離
  const [moveRight, setMoveRight] = useState("");

  const handleMoveLeft = () => {
    const newMove = moveLeft + 366;
    setMoveLeft(newMove);
    sliderRef.current.style.right = moveLeft + "px";
    if (moveLeft === 0) {
      setMoveLeft(0);
    }
  };

  return (
    <>
      <div
        className={`col-12 ${styles["figma-h4"]} text-center text-xxl-start ${styles["recommended-recipes-title-m"]}`}
      >
        其他推薦食譜
      </div>
      <div
        ref={sliderRef}
        className={`row ${styles["recipe-cards"]} justify-content-between position-relative start-0`}
      >
        <a
          onClick={() => {
            handleMoveLeft();
          }}
          href="javascript:void(0)"
          className={`position-absolute top-0 bottom-0 pe-0 text-dark d-flex justify-content-center align-items-center  ${styles["prev-btn"]} ${styles["slide-btn"]}`}
        >
          <FaChevronLeft style={{ fontSize: "24px", color: "white" }} />
        </a>
        <a
          href="javascript:void(0)"
          className={`position-absolute top-0 bottom-0 ps-0 d-flex justify-content-center align-items-center text-dark ${styles["next-btn"]} ${styles["slide-btn"]}`}
        >
          <FaChevronRight style={{ fontSize: "24px", color: "white" }} />
        </a>
        {/* 食譜卡片 */}
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
              法式經典油封鴨腿1
            </p>
            <p
              className={`${styles["recipe-description"]} ${styles["truncate"]}`}
            >
              法式經典油封鴨腿
              選用宜蘭的櫻桃鴨，以法式古法鹽漬風乾後浸泡在大量鴨油與香料裡，低溫烘烤至酥爛。
            </p>
          </div>
        </div>
        {/* 食譜卡片 */}
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
              法式經典油封鴨腿2
            </p>
            <p
              className={`${styles["recipe-description"]} ${styles["truncate"]}`}
            >
              法式經典油封鴨腿是一道傳統的法國美食，以鴨腿作為主要材料。首先，將鴨腿以低溫慢烤至皮脆肉嫩，然後浸泡在橄欖油中長時間保存，以增添風味並保持肉質的鮮嫩。這道菜通常搭配著新鮮的草莓或是其他時令水果，以及香草調味的沙拉一同享用。法式經典油封鴨腿擁有豐富的口感和深厚的風味，是法國料理中不可或缺的精品之一。
            </p>
          </div>
        </div>
        {/* 食譜卡片 */}
        <div
          className={`col-4 col-xxl-3 d-none d-xxl-inline-flex ${styles["recipe-card"]} d-flex flex-column`}
          // className={`col-6 col-xxl-3 ${styles['recipe-card']} d-flex flex-column`}
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
              法式經典油封鴨腿3
            </p>
            <p
              className={`${styles["recipe-description"]} ${styles["truncate"]}`}
            >
              法式經典油封鴨腿是一道傳統的法國美食，以鴨腿作為主要材料。首先，將鴨腿以低溫慢烤至皮脆肉嫩，然後浸泡在橄欖油中長時間保存，以增添風味並保持肉質的鮮嫩。這道菜通常搭配著新鮮的草莓或是其他時令水果，以及香草調味的沙拉一同享用。法式經典油封鴨腿擁有豐富的口感和深厚的風味，是法國料理中不可或缺的精品之一。
            </p>
          </div>
        </div>
        {/* 食譜卡片 */}
        <div
          className={`col-4 col-xxl-3 d-none d-xxl-inline-flex ${styles["recipe-card"]} d-flex flex-column`}
          // className={`col-6 col-xxl-3 ${styles['recipe-card']} d-flex flex-column`}
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
              法式經典油封鴨腿4
            </p>
            <p
              className={`${styles["recipe-description"]} ${styles["truncate"]}`}
            >
              法式經典油封鴨腿是一道傳統的法國美食，以鴨腿作為主要材料。首先，將鴨腿以低溫慢烤至皮脆肉嫩，然後浸泡在橄欖油中長時間保存，以增添風味並保持肉質的鮮嫩。這道菜通常搭配著新鮮的草莓或是其他時令水果，以及香草調味的沙拉一同享用。法式經典油封鴨腿擁有豐富的口感和深厚的風味，是法國料理中不可或缺的精品之一。
            </p>
          </div>
        </div>
      </div>
      {/* pagination */}
      <div className="row">
        <div
          className={`${styles["pagination"]} d-flex gap-2 justify-content-center`}
        >
          <div className={`${styles["page"]} ${styles["current"]}`} />
          <div className={styles["page"]} />
          <div className={styles["page"]} />
        </div>
      </div>
    </>
  );
}
