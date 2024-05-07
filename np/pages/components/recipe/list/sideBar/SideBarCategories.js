import React from "react";
import CateSidebar from "./CateSidebar";
import styles from "@/components/recipe/list/sideBar/SideBarCategories.module.scss";

export default function SideBarTop({
  setRecipeCategory,
  handleConditionsChange,
  recipeCategory,
}) {
  return (
    <>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5 className={styles["figma-h5"]}>分類</h5>
        </div>
        <div className={`${styles.line}`}></div>
        <CateSidebar
          setRecipeCategory={setRecipeCategory}
          handleConditionsChange={handleConditionsChange}
          recipeCategory={recipeCategory}
        />
      </div>
    </>
  );
}