import React, { useState } from "react";
import { useSearchResults } from "@/contexts/searchContext";
import styles from "@/styles/search-result.module.scss";
import HeaderComponent from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchFilterTabs from "@/components/index/SearchFilterTabs";
import Footer from "@/components/footer";
import ClassCard from "@/components/class_file/ClassCardWeb";
import ProductCard from "@/components/product/ProductCard";
import RecipeCardsList from "@/components/recipe/list/RecipeCardsList";
import "@fortawesome/fontawesome-free/css/all.css";
function SearchResult() {
  const { results } = useSearchResults();
  console.log(results);
  const [activeTab, setActiveTab] = useState("食譜");
  return (
    <div className={styles.wrapper}>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`${styles.content} ${styles.container}`}>
        <SearchFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "食譜" && (
          <div>
            {results ? (
              <div className={styles.cards}>
                <RecipeCardsList />
              </div>
            ) : (
              <div className={styles.noResult}>
                <h3>找不到您搜尋的 " " </h3>
                <h5>請重新搜尋</h5>
                <div className={styles.noResultImg}>
                  <img src="/index-images/noResult.png" alt="" />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "課程" && (
          <div className={styles.noResult}>
            <h3>找不到您搜尋的 " " </h3>
            <h5>請重新搜尋</h5>
            <div className={styles.noResultImg}>
              <img src="/index-images/noResult.png" alt="" />
            </div>
          </div>
          // <div className={styles.cards}>
          //             <ClassCard />
          //             <ClassCard />
          //             <ClassCard />
          //             <ClassCard />
          //             <ClassCard />
          //           </div>
        )}

        {activeTab === "商品" && (
          <div className={`${styles.productCard1}`}>
            <ProductCard />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchResult;
