import React, { useState } from "react";
import { useSearchResults } from "@/contexts/searchContext";

import styles from "@/components/favor/FavorTabs.module.scss";

function SearchFilterTabs({ activeTab, setActiveTab }) {
  const { results } = useSearchResults();
  // 處理點擊事件
  function handleTabClick(tab) {
    setActiveTab(tab);
  }
  return (
    <div className={styles.tabs}>
      <div
        className={`${
          activeTab === "食譜" ? `${styles.tab} ${styles.active}` : styles.tab
        }`}
        onClick={() => handleTabClick("食譜")}
      >
        食譜({results.recipes.length})
      </div>
      <div
        className={`${
          activeTab === "課程" ? `${styles.tab} ${styles.active}` : styles.tab
        }`}
        onClick={() => handleTabClick("課程")}
      >
        課程({results.classes.length})
      </div>
      <div
        className={`${
          activeTab === "商品" ? `${styles.tab} ${styles.active}` : styles.tab
        }`}
        onClick={() => handleTabClick("商品")}
      >
        商品({results.products.length})
      </div>
    </div>
  );
}

export default SearchFilterTabs;
