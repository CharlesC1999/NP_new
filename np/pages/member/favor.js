import React, { useState } from "react";
import styles from "@/styles/member-styles/favor.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/member/Sidebar";
import FavorTabs from "@/components/favor/FavorTabs";
import ClassCard from "@/components/class_file/ClassCardWeb";
import ClassCardMobileList from "@/components/class_file/ClassCardMobileList";
import ProductCard from "@/components/product/ProductCard";
import ProductCardList from "@/components/product/ProductCardList";
import RecipeCardsList from "@/components/recipe/list/RecipeCardsList";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default function Favor() {
  const [activeTab, setActiveTab] = useState("食譜");
  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`globalContainer ${styles.container}`}>
        <Sidebar />
        <div className={styles.navRight}>
          {/* 把 activeTab 和 setActiveTab 傳遞到FavorTabs 使用 */}
          <FavorTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* card-recipe 偉鈞 */}
          {activeTab === "食譜" && (
            <div className={styles.cards}>
              <RecipeCardsList />
              <RecipeCardsList />
              <RecipeCardsList />
            </div>
          )}
          {/* card-lecture 宥毓 */}
          {activeTab === "課程" && (
            <div className={styles.cards}>
              <div className={styles.classCard}>
                <ClassCard />
                <ClassCard />
                <ClassCard />
              </div>
              <div className={styles.classCardMobile}>
                <ClassCardMobileList />
                <ClassCardMobileList />
                <ClassCardMobileList />
              </div>
            </div>
          )}
          {/* card-product 靖荃 */}
          {activeTab === "商品" && (
            <>
              <div className={`${styles.productCard1}`}>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
              </div>
              <div className={`${styles.productCardMobile}`}>
                <ProductCardList />
                <ProductCardList />
              </div>
            </>
          )}

          {/* 傳遞屬性用，應該有更好的方法 */}
          {/* <SearchResult activeTab={activeTab} setActiveTab={setActiveTab}/>
          <div className={styles.hidden}>
          <SearchResult activeTab={activeTab} setActiveTab={setActiveTab}/>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
