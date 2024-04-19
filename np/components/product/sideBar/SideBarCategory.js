import React from "react";
import CateSidebar from "@/components/product/Cate-sidebar";
import styles from "@/components/product/sideBar/SideBarCategory.module.css";

export default function SideBarTop() {
  return (
    <>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5>分類</h5>
        </div>
        <div className={`${styles.line}`}></div>
        <CateSidebar />
        <CateSidebar />
        <CateSidebar />
        <CateSidebar />
        <CateSidebar />
      </div>
    </>
  );
}
