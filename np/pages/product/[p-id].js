import { useState, useEffect } from "react";
//style
import "bootstrap/dist/css/bootstrap.min.css";
import style from "@/styles/Product/products.module.scss";

//fontAwsome
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

//components
import HeaderComponent from "@/components/header";
import Footer from "@/components/footer";
import ProductMainPic from "@/components/product/ProductMainPic";
import ProductMainText from "@/components/product/ProductMainText";
import ProductSection01 from "@/components/product/ProductSection01";
import ProductSection02 from "@/components/product/ProductSection02";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductMayLike from "@/components/product/ProductMayLike";
//推薦食譜component
import DetailRecommendedRecipe from "@/components/recipe/detail/RecommendedRecipe";
//sidebar components
import ProductSidebarCate from "@/components/product/sideBar/ProductSidebarCate";
import ProductSidebarNew from "@/components/product/sideBar/ProductSidebarNew";
import ProductSidebarDetail from "@/components/product/sideBar/ProductSidebarDetail";

export default function ProductDetail() {
  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <main className={`my-5`}>
        <div
          className={`d-flex justify-content-center flex-column align-items-center`}
        >
          <div
            className={`${style["MainContent"]} d-flex flex-column flex-sm-row justify-content-center `}
          >
            <div
              className={`${style["left-side"]} d-flex flex-column d-none d-sm-flex`}
            >
              <div className={`side-bar01`}>
                <ProductSidebarCate />
              </div>
              {/* <div className={`side-bar02`}>
                <ProductSidebarDetail />
              </div> */}
              <div className={`side-bar03`}>
                <ProductSidebarNew />
              </div>
            </div>
            <div
              className={`${style["right-main"]} d-flex flex-column ms-0 ms-sm-5 justify-content-center`}
            >
              <div
                className={`${style["main-product"]} d-flex flex-sm-row flex-column justify-content-center`}
              >
                <ProductMainPic />
                <ProductMainText />
              </div>
              <div className={`${style["section2"]} my-3 m-sm-2`}>
                <div className={`d-flex flex-row my-4`}>
                  <button
                    className={`${style["detail-btn"]}  d-flex align-items-center justify-content-center btn me-4`}
                  >
                    商品簡介
                  </button>
                  <button
                    className={`${style["com-btn"]} d-flex align-items-center justify-content-center com-btn btn btn-outline-success`}
                  >
                    評論
                  </button>
                </div>
                <div className={`${style["p-detail"]} flex-column p-sm-5`}>
                  <ProductSection01 />
                  <ProductSection02 />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${style["section3"]} d-flex flex-column justify-content-center`}
          >
            <ProductMayLike />
          </div>
          <div
            className={`${style["recommended-recipe"]} d-flex flex-column my-4`}
          >
            <DetailRecommendedRecipe />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
