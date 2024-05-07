import React, { useState, useEffect } from "react";
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
import RecipeCardsList from "@/components/recipe/list/RecipeCardsList";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useAuth } from "@/contexts/AuthContext";

export default function Favor() {
  const {
    favorRecipe,
    recipeData,
    favorClass,
    classData: classesData,
    productData,
    auth
  } = useAuth();
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
              <RecipeCardsList recipesData={recipeData} />
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
                {classesData.map((classData, index) => (
                  <ClassCardMobileList
                    classesData={classData}
                    key={index}
                    Index={index}
                  />
                ))}
              </div>
            </div>
          )}
          {/* card-product 靖荃 */}
          {activeTab === "商品" && (
            <>
              <div className={`${styles.productCard1}`}>
                {productData.map((v) => {
                  return (
                    <ProductCard02
                      key={v.id}
                      id={v.id}
                      img={v.image_urls}
                      category_id={v.category_id}
                      name={v.product_name}
                      description={v.product_description}
                      price={v.product_price}
                      average_rating={v.average_rating}
                    />
                  );
                })}
              </div>
              <div className={`${styles.productCardMobile}`}>
                {productData.map((v) => {
                  return (
                    <ProductCardList
                      key={v.id}
                      img={v.image_urls}
                      category_id={v.category_id}
                      name={v.product_name}
                      description={v.product_description}
                      price={v.product_price}
                      average_rating={v.average_rating}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
