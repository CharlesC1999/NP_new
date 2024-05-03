import React from "react";
import CateSidebar from "./CateSidebar";
import styles from "@/components/recipe/list/sideBar/SideBarCategories.module.scss";

export default function SideBarTop({ detailPage = "" }) {
  return (
    <>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5 className={styles["figma-h5"]}>分類</h5>
        </div>
        <div className={`${styles.line}`}></div>
        {/* 用來判斷顯示在sideBar上的資訊是list的還是detail的 */}
        <CateSidebar detailPage={detailPage} />
      </div>
    </>
  );
}
