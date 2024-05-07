import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Cat.module.css";

function CatBuy({activeCategory, setActiveCategory}) {
  // 直接在useState中設置初始狀態為"全部"
 // const [activeCategory, setActiveCategory] = useState("全部");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // useEffect可以保持不變，因為它只在客戶端渲染時運行，而不會影響服務器端渲染
  useEffect(() => {
    // Do something if needed
  }, []);

  return (
    <>
      <div className={styles.couponcat}>
        <div className={styles.ccat}>
          <a
            href=""
            style={{ color: activeCategory === "全部" ? "var(--green02)" : "inherit" }}
            onClick={(e) => {
              e.preventDefault(); // 阻止默認行為
              handleCategoryClick("全部"); // 處理點擊事件
            }}
          >
            全部
          </a>
        </div>
        <div className={styles.ccat}>
          <a
            href=""
            style={{ color: activeCategory === "處理中" ? "var(--green02)" : "inherit" }}
            onClick={(e) => {
              e.preventDefault(); // 阻止默認行為
              handleCategoryClick("處理中"); // 處理點擊事件
            }}
          >
            訂單處理中
          </a>
        </div>
        <div className={styles.ccat}>
          <a
            href="#"
            style={{ color: activeCategory === "已出貨" ? "var(--green02)" : "inherit" }}
            onClick={(e) => {
              e.preventDefault(); // 阻止默認行為
              handleCategoryClick("已出貨"); // 處理點擊事件
            }}
          >
            已出貨
          </a>
        </div>
        <div className={styles.ccat}>
          <a
            href=""
            style={{ color: activeCategory === "已完成" ? "var(--green02)" : "inherit" }}
            onClick={(e) => {
              e.preventDefault(); // 阻止默認行為
              handleCategoryClick("已完成"); // 處理點擊事件
            }}
          >
            已完成
          </a>
        </div>
        <div className={styles.ccat}>
          <a
            href=""
            style={{ color: activeCategory === "取消" ? "var(--green02)" : "inherit" }}
            onClick={(e) => {
              e.preventDefault(); // 阻止默認行為
              handleCategoryClick("取消"); // 處理點擊事件
            }}
          >
            取消
          </a>
        </div>
        <div className={styles.ccat}>
          <a
            href=""
            style={{ color: activeCategory === "已退款" ? "var(--green02)" : "inherit" }}
            onClick={(e) => {
              e.preventDefault(); // 阻止默認行為
              handleCategoryClick("已退款"); // 處理點擊事件
            }}
          >
            退貨/退款
          </a>
        </div>
      </div>
    </>
  );
}

export default CatBuy;
