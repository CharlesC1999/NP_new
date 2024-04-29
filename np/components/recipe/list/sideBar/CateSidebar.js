import { useState, useEffect } from "react";
import styles from "./CateSidebar.module.css";

function CateSidebar({ setRecipeCategory, handleConditionsChange }) {
  //食譜類別state初始值
  const [categories, setCategories] = useState([]);

  //取得食譜分類名稱
  const getCategories = async () => {
    const url = "http://localhost:3005/api/recipes";

    try {
      const res = await fetch(url);
      const data = await res.json();
      //檢查得到的資料是array才設定給state (供map使用)
      if (Array.isArray(data.data.recipesCategories)) {
        setCategories(data.data.recipesCategories);
      } else {
        console.log("資料類型錯誤，無法設定state");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {/* 顯示所有類別的食譜 */}
      <div
        onClick={() => {
          setRecipeCategory("");
        }}
        className={`d-flex gap-3 flex-column mt-3 ${styles["pointer"]}`}
      >
        <div className={`d-flex ${styles.sideBox}`}>
          <div className={styles.sideImg}>
            <img src="/index-images/category-1.png" alt />
          </div>
          <div className={styles.sideText}>
            <h6 className={styles.left}>全部</h6>
            <h6 className={styles.right}>3</h6>
          </div>
        </div>
      </div>

      {categories.map((v, i) => {
        return (
          <div
            onClick={() => {
              setRecipeCategory(v.Recipe_cate_ID);
            }}
            className={`d-flex gap-3 flex-column mt-3 ${styles["pointer"]}`}
          >
            <div className={`d-flex ${styles.sideBox}`}>
              <div className={styles.sideImg}>
                <img src="/index-images/category-1.png" alt />
              </div>
              <div className={styles.sideText}>
                <h6 className={styles.left}>{v.Recipe_cate_name}</h6>
                <h6 className={styles.right}>3</h6>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CateSidebar;
