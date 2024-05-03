import React, { useState,useEffect } from "react";
import styles from "@/styles/member-styles/favor.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/member/Sidebar";
import FavorTabs from "@/components/favor/FavorTabs";
import ClassCard from "@/components/class_file/ClassCardWeb";
import ClassCardMobileList from "@/components/class_file/ClassCardMobileList";
import ProductCard02 from "@/components/product/ProductCard02";
import ProductCardList from "@/components/product/ProductCardList";
import RecipeCardsListTest from "@/components/favor/RecipeCardsListTest";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useAuth } from "@/contexts/AuthContext";

export default function Favor() {
  const { favorRecipe, recipeData,favorClass,classData:classesData } = useAuth();
  const [activeTab, setActiveTab] = useState("食譜");
  // 取得食譜收藏的資料
  // const [favorites, setFavorites] = useState({
  //   favorRecipe: [],
  //   recipeData: [],
  // });
  // useEffect(() => {
  //   getFavs()
  //     .then((data) => {
  //       setFavorites(data);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to load favorites:", error);
  //     });
  // }, []);
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
              {/* <RecipeCardsList />
              <RecipeCardsList />
              <RecipeCardsList /> */}
              {recipeData.map((v) => {
                return (
                  <RecipeCardsListTest
                    key={v.recipe__i_d}
                    id={v.recipe__i_d}
                    image={v.image__u_r_l}
                    title={v.Title_R_name}
                    date={v.Publish_date}
                    cate={v.Recipe_category_ID}
                    content={v.Content}
                  />
                );
              })}
            </div>
          )}
          {/* card-lecture 宥毓 */}
          {activeTab === "課程" && (
            <div className={styles.cards}>
              <div className={styles.classCard}>
              {classesData.map((classData, index) => (
                  <ClassCard
                  classesData={classData}
                  key={index}
                  Index={index}
                  id={classData.class__i_d}
                  />
                ))}
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
                <ProductCard02 />
                <ProductCard02 />
              </div>
              <div className={`${styles.productCardMobile}`}>
                <ProductCardList />
                <ProductCardList />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
