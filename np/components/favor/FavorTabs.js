import React , { useState } from "react";
import styles from "./FavorTabs.module.scss";
import {useAuth} from "@/contexts/AuthContext"

function FavorTabs({activeTab,setActiveTab}) {
  // 處理點擊事件
  function handleTabClick(tab){
    setActiveTab(tab);
  };
const {favorRecipe,favorClass,favorProduct} = useAuth()
  return (
    
    <div className={styles.tabs}>
      <div className={`${activeTab === "食譜" ? `${styles.tab} ${styles.active}` : styles.tab}`} onClick={() => handleTabClick('食譜')}>{`食譜(${favorRecipe.length})`}</div>
      <div className={`${activeTab === "課程" ? `${styles.tab} ${styles.active}` : styles.tab}` } onClick={() => handleTabClick('課程')}>{`課程(${favorClass.length})`}</div>
      <div className={`${activeTab === "商品" ? `${styles.tab} ${styles.active}` : styles.tab}`} onClick={() => handleTabClick('商品')}>{`商品(${favorProduct.length})`}</div>
    </div>
  );
}

export default FavorTabs;
