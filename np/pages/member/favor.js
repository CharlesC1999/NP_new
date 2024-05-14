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
import { useFavor } from "@/hooks/use-favorData";
export default function Favor() {
  const { auth } = useAuth();
  const { recipeData, classData, productData } = useFavor();
  const [activeTab, setActiveTab] = useState("食譜");

  // 用關鍵字搜尋
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipeData, setFilteredRecipeData] = useState([]);
  const [filteredClassData, setFilteredClassData] = useState([]);
  const [filteredProductData, setFilteredProductData] = useState([]);
  // 排序
  const [sortAsc, setSortAsc] = useState(false);
  const sortByTime = () => {
    if (sortAsc) {
      recipeData.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      classData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      productData.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else {
      recipeData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      classData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      productData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    }
    setFilteredRecipeData(recipeData);
    setFilteredClassData(classData);
    setFilteredProductData(productData);
    // 切換排序方向
    setSortAsc(!sortAsc);
  };
  // 偵測搜尋框的輸入
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // 用搜尋關鍵字搜尋（食譜名稱、課程名稱、商品名稱）
  const resultR = recipeData.filter(
    (item) =>
      item.title__r_name.includes(searchTerm)
  );
  const resultC = classData.filter((item) =>
    item.class_name.includes(searchTerm)
  );
  const resultP = productData.filter((item) =>
    item.product_name.includes(searchTerm)
  );
  // 還沒開始搜尋時用收藏的資料渲染
  useEffect(() => {
    setFilteredRecipeData(recipeData);
    setFilteredClassData(classData);
    setFilteredProductData(productData);
  }, []);
  // 搜尋後用搜尋結果渲染（如果搜尋框沒有內容，回復成未搜尋時的卡片狀態）
  useEffect(() => {
    if (searchTerm !== "") {
      setFilteredRecipeData(resultR);
      setFilteredClassData(resultC);
      setFilteredProductData(resultP);
    } else {
      setFilteredRecipeData(recipeData);
      setFilteredClassData(classData);
      setFilteredProductData(productData);
    }
  }, [searchTerm]);
  // 在搜尋結果中新增或移除收藏時，卡片會即時更新
  useEffect(() => {
    setFilteredRecipeData(resultR);
    setFilteredClassData(resultC);
    setFilteredProductData(resultP);
  }, [recipeData, classData, productData]);


  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`globalContainer ${styles.container}`}>
        <Sidebar />
        <div className={styles.navRight}>
          {/*搜尋和排序 */}
          <div className={styles.searchAndSort}>
            <div className={styles.searchBar}>
              <input
                type="text"
                className={styles.searchBarInput}
                placeholder="在願望清單中搜尋..."
                onChange={handleSearch}
              />
              <div className={styles.searchBtn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className={styles.searchBtn}
                >
                  <path
                    fill="none"
                    stroke="#747E85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                  />
                </svg>
              </div>
            </div>
            {/* 排序 */}
            <button type="button" className={styles.sort} onClick={sortByTime}>
              {sortAsc ? (
                <>
                  <i className="fa-solid fa-arrow-up-wide-short"></i> 由舊到新
                </>
              ) : (
                <>
                  <i className="fa-solid fa-arrow-down-wide-short"></i> 由新到舊
                </>
              )}
            </button>
          </div>

          {/* 把 activeTab 和 setActiveTab 和搜尋結果資料傳遞到FavorTabs 使用 */}
          <FavorTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredRecipeData={filteredRecipeData}
            filteredClassData={filteredClassData}
            filteredProductData={filteredProductData}
          />

          {/* card-recipe */}
          {activeTab === "食譜" && (
            <div className={styles.cards}>
              <RecipeCardsList recipesData={filteredRecipeData} />
            </div>
          )}
          {/* card-lecture */}
          {activeTab === "課程" && (
            <div className={styles.cards}>
              <div className={styles.classCard}>
                {filteredClassData.map((classData, index) => (
                  <ClassCard
                    classesData={classData}
                    key={index}
                    Index={index}
                    id={classData.class__i_d}
                  />
                ))}
              </div>
              <div className={styles.classCardMobile}>
                {filteredClassData.map((classData, index) => (
                  <ClassCardMobileList
                    classesData={classData}
                    key={index}
                    Index={index}
                  />
                ))}
              </div>
            </div>
          )}
          {/* card-product */}
          {activeTab === "商品" && (
            <>
              <div className={`${styles.productCard1}`}>
                {filteredProductData.map((v) => {
                  return (
                    <ProductCard02
                      key={v.id}
                      id={v.id}
                      img={v.image_urls}
                      category_id={v.category_id}
                      name={v.product_name}
                      description={v.product_description}
                      price={v.product_price}
                      disPrice={v.discount_price}
                      average_rating={v.average_rating}
                    />
                  );
                })}
              </div>
              <div className={`${styles.productCardMobile}`}>
                {filteredProductData.map((v) => {
                  return (
                    <ProductCardList
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
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
