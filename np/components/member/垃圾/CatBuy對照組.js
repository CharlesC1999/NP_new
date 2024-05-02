import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Cat.module.css";

function CatBuy() {
  // 直接在useState中設置初始狀態為"全部"
  const [activeCategory, setActiveCategory] = useState("全部");

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
            href="#"
            style={{ color: activeCategory === "全部" ? "var(--green02)" : "inherit" }}
            onClick={() => handleCategoryClick("全部")}
          >
            全部
          </a>
        </div>
        <div className={styles.ccat}>
          <a
            href="#"
            style={{ color: activeCategory === "待出貨" ? "var(--green02)" : "inherit" }}
            onClick={() => handleCategoryClick("待出貨")}
          >
            待出貨
          </a>
        </div>
        <div className={styles.ccat}>
          <a
            href="#"
            style={{ color: activeCategory === "待收貨" ? "var(--green02)" : "inherit" }}
            onClick={() => handleCategoryClick("待收貨")}
          >
            待收貨
          </a>
        </div>
        <div className={styles.ccat}>
          <a
            href="#"
            style={{ color: activeCategory === "已完成" ? "var(--green02)" : "inherit" }}
            onClick={() => handleCategoryClick("已完成")}
          >
            已完成
          </a>
        </div>
        <div className={styles.ccat}>
          <a
            href="#"
            style={{ color: activeCategory === "取消" ? "var(--green02)" : "inherit" }}
            onClick={() => handleCategoryClick("取消")}
          >
            取消
          </a>
        </div>
        <div className={styles.ccat}>
          <a
            href="#"
            style={{ color: activeCategory === "退貨/退款" ? "var(--green02)" : "inherit" }}
            onClick={() => handleCategoryClick("退貨/退款")}
          >
            退貨/退款
          </a>
        </div>
      </div>
    </>
  );
}

export default CatBuy;