import React from "react";
import { useRouter } from "next/router";
import CateSidebar from "@/components/product/CateSidebar";
import styles from "@/components/product/sideBar/SideBarCategory.module.css";
//useContext
import { useProductCategories } from "@/hooks/use-product-cate";

export default function ProductSidebarCate({ normalCategories }) {
  return (
    <>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5>分類</h5>
        </div>
        <div className={`${styles.line}`}></div>
        {normalCategories.map((category) => {
          return (
            <CateSidebar
              key={category.cateId}
              cateId={category.cateId}
              cateName={category.cateName}
              catePng={category.catePng}
            />
          );
        })}
      </div>
    </>
  );
}
