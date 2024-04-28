import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Cat.module.css";

function Cat() {
  const [activeCategory, setActiveCategory] = useState(""); // 初始狀態為空字符串

  useEffect(() => {
    // 在組件首次渲染時設置初始狀態為"全部"
    setActiveCategory("全部");
  }, []); // 空的依賴數組表示只在組件首次渲染時運行

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <>
      <div className={styles.couponcat}>
        <div
          className={styles.ccat}
          style={{ color: activeCategory === "全部" ? "var(--green02)" : "inherit" }}
          onClick={() => handleCategoryClick("全部")}
        >
          <a href="#">全部</a>
        </div>
        <div
          className={styles.ccat}
          style={{ color: activeCategory === "可使用" ? "var(--green02)" : "inherit" }}
          onClick={() => handleCategoryClick("可使用")}
        >
          <a href="#">可使用</a>
        </div>
        <div
          className={styles.ccat}
          style={{ color: activeCategory === "已使用" ? "var(--green02)" : "inherit" }}
          onClick={() => handleCategoryClick("已使用")}
        >
          <a href="#">已使用</a>
        </div>
        <div
          className={styles.ccat}
          style={{ color: activeCategory === "已失效" ? "var(--green02)" : "inherit" }}
          onClick={() => handleCategoryClick("已失效")}
        >
          <a href="#">已失效</a>
        </div>
      </div>
    </>
  );
}

export default Cat;
