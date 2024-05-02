import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import DetailTop from "@/components/recipe/detail/DetailTop";
import SideBarTop from "@/components/recipe/list/sideBar/SideBarCategories";
import DetailIngredients from "@/components/recipe/detail/DetailIngredients";
import DetailSteps from "@/components/recipe/detail/DetailSteps";
import DetailRelatedProducts from "@/components/recipe/detail/DetailRelatedProducts";
import DetailRecommendedRecipe from "@/components/recipe/detail/RecommendedRecipe";
import Footer from "@/components/footer";
import styles from "@/styles/recipe/recipe-detail.module.scss";
import { CategoriesProvider } from "@/hooks/recipe/use-categories";

export default function RecipeDetail() {
  const router = useRouter();

  //設定食譜初始值
  const [recipe, setRecipe] = useState({
    recipe__i_d: 0,
    title__r_name: "",
    image__u_r_l: "",
    content: "",
    publish_date: "",
    recipe_category__i_d: 0,
    recipe_valid: 0,
    ingredients: "",
    steps: "",
  });

  //取得對應的食譜
  const getRecipe = async (rid) => {
    try {
      const url = `http://localhost:3005/api/recipes/${rid}`;
      const res = await fetch(url);
      const data = await res.json();

      if (
        typeof data.data.finalRecipe === "object" &&
        data.data.finalRecipe !== null
      ) {
        setRecipe(data.data.finalRecipe);
      } else {
        console.log("伺服器回傳資料類型錯誤，無法設定到狀態中");
      }
    } catch (e) {
      console.log(e);
    }
  };

  //初次渲染頁面時執行取得對應食譜的function
  useEffect(() => {
    if (router.isReady) {
      getRecipe(router.query.recipeId);
    }
  }, [router.isReady]);

  return (
    <CategoriesProvider>
      <Header />
      <Breadcrumbs />
      <div className={`${styles["wrapper"]} mx-auto`}>
        {/* 食譜圖與title */}
        <DetailTop recipe={recipe} />
        {/* 側邊欄跟主要內容 */}
        <div className={`row ${styles["main"]} d-flex`}>
          {/* 側邊欄 */}
          <div className="col-3 d-none d-xxl-block">
            {/* 用來判斷顯示在sideBar上的資訊是list的還是detail的 */}
            <SideBarTop detailPage={"detailPage"} />
          </div>
          {/* 主要內容 */}
          <div className={`col styles["main-content"]`}>
            <DetailIngredients recipe={recipe} />
            <DetailSteps recipe={recipe} />
            <DetailRelatedProducts />
          </div>
        </div>
        <div className={`${styles["recommended-recipe"]} d-flex flex-column`}>
          <DetailRecommendedRecipe />
        </div>
      </div>
      <Footer />
    </CategoriesProvider>
  );
}
