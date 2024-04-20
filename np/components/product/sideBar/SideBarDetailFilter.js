import React from "react";
import Newsidebar from "@/components/product/Newsidebar";
import styles from "@/components/product/sideBar/SideBarCategory.module.css";

export default function SideBarDetailFilter() {
  return (
    <>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5>新品推薦</h5>
        </div>
        <div className={`${styles.line}`}></div>
        <Newsidebar />
        <Newsidebar />
        <Newsidebar />
        <Newsidebar />
      </div>
    </>
  );
}
