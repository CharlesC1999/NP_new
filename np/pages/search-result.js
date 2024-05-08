import React, { useState } from "react";
import { useSearchResults } from "@/contexts/searchContext";
import styles from "@/styles/search-result.module.scss";
import HeaderComponent from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchFilterTabs from "@/components/index/SearchFilterTabs";
import Footer from "@/components/footer";
import ClassCard from "@/components/search/ClassCardWeb";
import ProductCardMobileGrid from "@/components/search/ClassCardMobile";
import ProductCard from "@/components/search/ProductCard02";
import RecipeCardsList from "@/components/search/RecipeCardsList";
import PaginationRounded from "@/components/pagination";
import "@fortawesome/fontawesome-free/css/all.css";
function SearchResult() {
  const { results } = useSearchResults();
  console.log(results);
  const [activeTab, setActiveTab] = useState("食譜");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = results.products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // --------------------------------------------
  console.log(results.classes);
  return (
    <div className={styles.wrapper}>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`${styles.content} ${styles.container}`}>
        <SearchFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "食譜" && (
          <div>
            {results.recipes && results.recipes.length > 0 ? (
              <div className={styles.cards}>
                {results.recipes.map((recipeData, index) => (
                  <RecipeCardsList
                    recipesData={recipeData}
                    key={index}
                    Index={index}
                  />
                ))}
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
          <div>
            {results.classes && results.classes.length > 0 ? (
              <div>
                <div className={styles.cards}>
                  {results.classes.map((classData, index) => (
                    <ClassCard
                      classesData={classData}
                      key={index}
                      Index={index}
                    />
                  ))}
                </div>
                <div className={styles.cardsWeb}>
                  {results.classes.map((classData, index) => (
                    <ProductCardMobileGrid
                      classesData={classData}
                      key={index}
                      Index={index}
                    />
                  ))}
                </div>
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

        {activeTab === "商品" && (
          <div className={styles.productCard1}>
            {currentProducts && currentProducts.length > 0 ? (
              <div style={{ width: "100%" }} className={styles.pagination}>
                <div className={styles.gridCards}>
                  {currentProducts.map((productData, index) => (
                    <ProductCard
                      className={styles.doCenter}
                      productsData={productData}
                      key={index}
                      Index={index}
                    />
                  ))}
                </div>
                <PaginationRounded
                  count={Math.ceil(results.products.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                />
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
      </div>
      <Footer />
    </div>
  );
}

export default SearchResult;
