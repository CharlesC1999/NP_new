import React, { useState,useEffect } from "react";
import styles from "./FavorTabs.module.scss";
import { useFavor } from "@/hooks/use-favorData";

function FavorTabs({ activeTab, setActiveTab, filteredRecipeData,filteredClassData,filteredProductData }) {
  // 處理點擊事件
  function handleTabClick(tab) {
    setActiveTab(tab);
  }
  const { favorRecipe, favorClass, favorProduct } = useFavor();
  const [FavorCountR, setFavorCountR] = useState(favorRecipe.length)
  const [FavorCountC, setFavorCountC] = useState(favorClass.length)
  const [FavorCountP, setFavorCountP] = useState(favorProduct.length)
  useEffect(()=>{
    if (filteredRecipeData && filteredRecipeData.length > 0) {
    setFavorCountR(filteredRecipeData.length)
    } else {
      setFavorCountR(0)
    }
    if (filteredClassData && filteredClassData.length > 0) {
      setFavorCountC(filteredClassData.length)
      } else {
        setFavorCountC(0)
    }
    if (filteredProductData && filteredProductData.length > 0) {
      setFavorCountP(filteredProductData.length)
      } else {
        setFavorCountP(0)
    }}, [filteredRecipeData,filteredClassData,filteredProductData])
  return (
    <div className={styles.tabs}>
      <div
        className={`${
          activeTab === "食譜" ? `${styles.tab} ${styles.active}` : styles.tab
        }`}
        onClick={() => handleTabClick("食譜")}
      >{`食譜 (${FavorCountR})`}</div>
      <div
        className={`${
          activeTab === "課程" ? `${styles.tab} ${styles.active}` : styles.tab
        }`}
        onClick={() => handleTabClick("課程")}
      >{`課程 (${FavorCountC})`}</div>
      <div
        className={`${
          activeTab === "商品" ? `${styles.tab} ${styles.active}` : styles.tab
        }`}
        onClick={() => handleTabClick("商品")}
      >{`商品 (${FavorCountP})`}</div>
    </div>
  );
}

export default FavorTabs;
