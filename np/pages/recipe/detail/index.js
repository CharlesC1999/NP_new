import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import DetailTop from "@/components/recipe/detail/detail-top";
import styles from "./recipe-detail.module.scss";

export default function RecipeDetail() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className={`${styles["wrapper"]} mx-auto`}>
        <DetailTop />
      </div>
    </>
  );
}
