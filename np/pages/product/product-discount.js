import React, { useState } from "react";

//fontAwsome
import "@fortawesome/fontawesome-free/css/all.css";
import HeaderComponent from "@/components/Header";

//components
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard02 from "@/components/product/ProductCard02";
import ProductCardList from "@/components/product/ProductCardList";
import ProductFilter from "@/components/product/ProductFilter";
import Footer from "@/components/Footer";
//荃做版本sideBar
import CateSidebar from "@/components/product/CateSidebar";
import NewSidebar from "@/components/product/Newsidebar";
import ProductCard from "@/components/product/ProductCard";

//side bar components
import ProductSidebarCate from "@/components/product/sideBar/ProductSidebarCate";
import ProductSidebarNew from "@/components/product/sideBar/ProductSidebarNew";
import ProductSidebarDetail from "@/components/product/sideBar/ProductSidebarDetail";
import ProductSidebarDiscount from "@/components/product/sideBar/ProductSidebarDiscount";

//style
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./product-discount.module.scss";

export default function Product() {
  const [displayGrid, setDisplayGrid] = useState(true); //選擇控制grid
  const [activeButton, setActiveButton] = useState("grid"); // 選擇哪一個是被選擇的狀態

  // 切換到Grid模式
  const showGrid = () => {
    setDisplayGrid(true);
    setActiveButton("grid");
  };

  // 切換到List模式
  const showList = () => {
    setDisplayGrid(false);
    setActiveButton("list");
  };

  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div
        className={`container d-flex justify-content-center ${styles.wrapper} ${styles.Top40}`}
      >
        <div className={`${styles.sideBar} me-5`}>
          <ProductSidebarDiscount />
          <ProductSidebarCate />

          <ProductSidebarDetail />
        </div>
        <div
          className={`${styles.productW} ms-sm-3 ms-0 d-flex justify-content-center flex-column`}
        >
          <div className="mainDiscount">
            <div className={`${styles.DiscountTitleMain}`}>
              <h4 className={`${styles.DiscountTitle}`}>限時特惠商品</h4>
            </div>
            <div className={`${styles.DiscountBoxMain}`}>
              <div className={`${styles.DiscountBox}`}>
                <img src="/index-images/Herosection02.png" alt="" />
              </div>
              <div className={`pt-sm-4 pt-0`}>
                <ProductFilter
                  onShowGrid={showGrid}
                  onShowList={showList}
                  activeButton={activeButton}
                />
              </div>
            </div>
          </div>
          <div
            className={`d-flex ${styles.productCard1} justify-content-between`}
          >
            <ProductCard02 />
            <ProductCard02 />
            <ProductCard02 />
            <ProductCard02 />
            <ProductCard02 />
            <ProductCard02 />
            <ProductCard02 />
            <ProductCard02 />
            <ProductCard02 />
            <ProductCard02 />
            <ProductCard02 />
            <ProductCard02 />
            {/* <div className={`${styles.List}`}>
              <ProductCardList />
              <ProductCardList />
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
