import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import Header from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import SideBarTop from "@/components/recipe/list/sideBar/SideBarCategories";
import SideBarRecipe from "@/components/recipe/list/SideBarRecipe";
import TopBarList from "@/components/recipe/list/TopBarList";
import TopBarGrid from "@/components/recipe/list/TopBarGrid";
import RecipeCardsList from "@/components/recipe/list/RecipeCardsList";
import RecipeCardsGrid from "@/components/recipe/list/RecipeCardsGrid";
import Footer from "@/components/footer";
import Filter from "@/components/recipe/list/filter/RecipeFilter";
import styles from "@/styles/recipe/recipe-list.module.scss";

export default function RecipeList() {
  // ----------------------篩選條件 start ------------------------
  // 1. 食譜分類
  const [recipeCategory, setRecipeCategory] = useState("");

  // ----------------------篩選條件 end --------------------------

  // 分頁用
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(5);

  // 總共幾筆資料、總頁數
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  //食譜資料庫data
  const [recipesData, setRecipesData] = useState([]);

  //串上後端取得資料
  const getRecipes = async (params = {}) => {
    // !!!params必須是物件!!! 再利用.toString()轉成網址的get參數(網址參數?後面的部分)
    const searchParams = new URLSearchParams(params);
    const url = `http://localhost:3005/api/recipes/?${searchParams.toString()}`;
    console.log("url: " + url);

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.data.recipesRawSql);

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.recipesRawSql)) {
        setRecipesData(data.data.recipesRawSql);
      } else {
        console.log("伺服器回傳資料類型錯誤，無法設定到狀態中");
      }

      if (data.status === "success") {
        setTotal(data.data.total);
        setPageCount(data.data.pageCount);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 篩選用
  const handleConditionsChange = () => {
    const params = {
      // 每次篩選會返回第一頁
      page: 1,
      perpage,
      recipe_category__i_d: recipeCategory,
    };
    // 每次篩選會返回第一頁
    setPage(1);

    getRecipes(params);
  };

  // 初次渲染時取得食譜列表資料
  useEffect(() => {
    getRecipes();
  }, []);

  // 每次頁碼變動時重新取得食譜列表資料
  useEffect(() => {
    const params = {
      page,
      perpage,
      recipe_category__i_d: recipeCategory,
    };
    getRecipes(params);
  }, [page]);

  //每次condition改變時重新取得食譜列表資料
  useEffect(() => {
    const params = {
      page,
      perpage,
      recipe_category__i_d: recipeCategory,
    };
    getRecipes(params);
  }, [recipeCategory]);

  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className={styles.wrapper}>
        {/* list排列方式的topbar */}
        <TopBarList />
        <TopBarGrid />
        <div className={`${styles["list-wrapper"]} d-xxl-flex`}>
          <div className={`d-none d-xxl-block col-3 ${styles["side-bar"]}`}>
            <SideBarTop
              setRecipeCategory={setRecipeCategory}
              handleConditionsChange={handleConditionsChange}
            />
            <SideBarRecipe />
          </div>
          {/* 食譜卡片 (list排列) */}
          <div className={`${styles["cards-list"]} d-flex flex-column`}>
            <div className="d-none d-xxl-block">
              <Filter />
            </div>
            <div className={`${styles["list-layout"]} col`}>
              <section
                className={`d-flex flex-column ${styles["main-content"]}`}
              >
                <RecipeCardsList recipesData={recipesData} />
              </section>
            </div>
            <div className="d-flex gap-3 justify-content-center mt-4 align-items-center">
              <button
                onClick={() => {
                  const newPageNow = page - 1 > 1 ? page - 1 : 1;
                  setPage(newPageNow);
                }}
                type="button"
                className={`btn ${styles["prev"]} ${
                  page - 1 >= 1 ? "" : "disabled"
                }`}
              >
                <FiChevronsLeft />
              </button>
              <ul className="d-flex list-unstyled mb-0 pagination gap-2">
                {Array(pageCount)
                  .fill("")
                  .map((v, i) => {
                    return (
                      <li>
                        <button
                          onClick={() => {
                            setPage(i + 1);
                          }}
                          className={`btn ${styles["next"]} ${
                            i + 1 === page ? styles["current"] : ""
                          }`}
                        >
                          {i + 1}
                        </button>
                      </li>
                    );
                  })}
              </ul>
              <button
                onClick={() => {
                  const newPageNow =
                    page + 1 > pageCount ? pageCount : page + 1;
                  setPage(newPageNow);
                }}
                type="button"
                className={`btn ${styles["next"]} ${
                  page + 1 > pageCount ? "disabled" : ""
                }`}
              >
                <FiChevronsRight />
              </button>
            </div>
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
          {/* pagination */}
        </div>
      </div>
      <Footer />
    </>
  );
}
