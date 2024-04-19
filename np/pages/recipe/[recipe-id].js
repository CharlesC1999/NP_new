import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e5eb21c (檔案調整，命名調整，麵包屑調整)
<<<<<<< HEAD:np/pages/recipe/[recipe-id].js
import DetailTop from "@/components/recipe/detail/DetailTop";
import SideBar from "@/components/recipe/list/SideBarRecipe";
=======
import DetailTop from "@/components/recipe/detail/DetailTop";
import SideBar from "@/components/recipe/list/SideBar";
>>>>>>> a67f04e (統一修改食譜類檔名)
import DetailIngredients from "@/components/recipe/detail/DetailIngredients";
import DetailSteps from "@/components/recipe/detail/DetailSteps";
import DetailRelatedProducts from "@/components/recipe/detail/DetailRelatedProducts";
import DetailRecommendedRecipe from "@/components/recipe/detail/RecommendedRecipe";
import Footer from "@/components/footer";
import styles from "@/styles/recipe/recipe-detail.module.scss";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e5eb21c (檔案調整，命名調整，麵包屑調整)
=======
import DetailTop from "@/components/recipe/detail/detail-top";
import SideBar from "@/components/recipe/list/side-bar";
import DetailIngredients from "@/components/recipe/detail/detail-ingredients";
import DetailSteps from "@/components/recipe/detail/detail-steps";
import DetailRelatedProducts from "@/components/recipe/detail/detail-related-products";
import DetailRecommendedRecipe from "@/components/recipe/detail/recommended-recipe";
import Footer from "@/components/Footer";
import styles from "./recipe-detail.module.scss";
>>>>>>> 5890885 (檔案調整，命名調整，麵包屑調整):np/pages/recipe/detail/index.js
<<<<<<< HEAD
=======
>>>>>>> a67f04e (統一修改食譜類檔名)
=======
>>>>>>> e5eb21c (檔案調整，命名調整，麵包屑調整)

export default function RecipeDetail() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className={`${styles["wrapper"]} mx-auto`}>
        {/* 食譜圖與title */}
        <DetailTop />
        {/* 側邊欄跟主要內容 */}
        <div className={`row ${styles["main"]} d-flex`}>
          {/* 側邊欄 */}
          <SideBar />
          {/* 主要內容 */}
          <div className={`col styles["main-content"]`}>
            <DetailIngredients />
            <DetailSteps />
            <DetailRelatedProducts />
          </div>
        </div>
        <div className={`${styles["recommended-recipe"]} d-flex flex-column`}>
          <DetailRecommendedRecipe />
        </div>
      </div>
      <Footer />
    </>
  );
}
