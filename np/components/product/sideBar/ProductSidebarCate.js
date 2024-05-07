import React from "react";
import { useRouter } from "next/router";
import CateSidebar from "@/components/product/CateSidebar";
import styles from "@/components/product/sideBar/SideBarCategory.module.css";
//useContext
import { useProductCategories } from "@/hooks/use-product-cate";

export default function ProductSidebarCate({ normalCategories }) {
  // const { selectedCategories, setSelectedCategories, handleCategoryChange } =
  //   useProductCategories();

  const router = useRouter();
  const handleCategoryClick = (cateId) => {
    router.push(`/product/?categoryFromDetail=${cateId}`);
    // setSelectedCategories((prevCategories) => [...prevCategories, cateId]);

    console.log("click d-cate");
  };
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
              cateName={category.cateName}
              catePng={category.catePng}
              // onClick={() => handleCategoryClick(category.cateId)}
              onClick={() => handleCategoryClick(category.cateId)}
            />
          );
        })}
      </div>
    </>
  );
}
