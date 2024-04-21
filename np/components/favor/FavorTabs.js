import React , { useState } from "react";
import styles from "./FavorTabs.module.scss";


function FavorTabs({activeTab,setActiveTab}) {
  {console.log(activeTab)}
  {console.log(setActiveTab)}
  // 處理點擊事件
  function handleTabClick(tab){
    setActiveTab(tab);
  };
  return (
    
    <div className={styles.tabs}>
      <div className={`${activeTab === "食譜" ? `${styles.tab} ${styles.active}` : styles.tab}`} onClick={() => handleTabClick('食譜')}>食譜</div>
      <div className={`${activeTab === "課程" ? `${styles.tab} ${styles.active}` : styles.tab}` } onClick={() => handleTabClick('課程')}>課程</div>
      <div className={`${activeTab === "商品" ? `${styles.tab} ${styles.active}` : styles.tab}`} onClick={() => handleTabClick('商品')}>商品</div>
    </div>
  );
}

export default FavorTabs;
