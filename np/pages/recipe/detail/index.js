import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import DetailTop from "@/components/recipe/detail/detail-top";
import SideBar from "@/components/recipe/list/side-bar";
import DetailIngredients from "@/components/recipe/detail/detail-ingredients";
import DetailSteps from "@/components/recipe/detail/detail-steps";
import DetailRelatedProducts from "@/components/recipe/detail/detail-related-products";
import DetailRecommendedRecipe from "@/components/recipe/detail/recommended-recipe";
import Footer from "@/components/Footer";
import styles from "./recipe-detail.module.scss";

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
