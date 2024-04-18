import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import TopBarList from "@/components/recipe/list/top-bar-list";
import TopBarGrid from "@/components/recipe/list/top-bar-grid";
import SideBar from "@/components/recipe/list/side-bar";
import RecipeCardsList from "@/components/recipe/list/recipe-cards-list";
import RecipeCardsGrid from "@/components/recipe/list/recipe-cards-grid";
import Footer from "@/components/footer";

import styles from "./recipe-list.module.scss";

export default function RecipeList() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className={styles.wrapper}>
        {/* list排列方式的topbar */}
        <TopBarList />
        <TopBarGrid />
        <div className={`${styles["list-wrapper"]} d-xxl-flex`}>
          <SideBar />
          {/* 食譜卡片 (list排列) */}
          <div className={`${styles["cards-list"]} d-flex flex-column `}>
            <RecipeCardsList />
            <RecipeCardsList />
            <RecipeCardsList />
            <RecipeCardsList />
          </div>
          {/* 食譜卡片 (grid排列) */}
          <div
            className={`${styles["grid-layout"]} d-flex justify-content-between flex-wrap d-none`}
          >
            <RecipeCardsGrid />
            <RecipeCardsGrid />
            <RecipeCardsGrid />
            <RecipeCardsGrid />
            <RecipeCardsGrid />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}