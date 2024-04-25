import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import recipes from "@/data/recipe/recipes.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import DetailTop from "@/components/recipe/detail/DetailTop";
import SideBarTop from "@/components/recipe/list/sideBar/SideBarCategory";
import DetailIngredients from "@/components/recipe/detail/DetailIngredients";
import DetailSteps from "@/components/recipe/detail/DetailSteps";
import DetailRelatedProducts from "@/components/recipe/detail/DetailRelatedProducts";
import DetailRecommendedRecipe from "@/components/recipe/detail/RecommendedRecipe";
import Footer from "@/components/footer";
import styles from "@/styles/recipe/recipe-detail.module.scss";

export default function RecipeDetail() {
  const router = useRouter();

  //設定食譜初始值
  const [recipe, setRecipe] = useState({
    Recipe_ID: 0,
    Title_R_name: "",
    Image_URL: "",
    Content: "",
    Publish_date: "",
    Recipe_category_ID: 0,
    recipe_valid: 0,
  });

  //取得對應的食譜
  const getRecipe = (rid) => {
    const recipe = recipes.filter((v, i) => {
      return v.Recipe_ID === rid;
    });
    console.log(recipe);
    setRecipe(recipe[0]);
  };

  //初次渲染頁面時執行取得對應食譜的function
  useEffect(() => {
    getRecipe(router.query.recipeId);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className={`${styles["wrapper"]} mx-auto`}>
        {/* 食譜圖與title */}
        <DetailTop recipe={recipe} />
        {/* 側邊欄跟主要內容 */}
        <div className={`row ${styles["main"]} d-flex`}>
          {/* 側邊欄 */}
          <div className="col-3 d-none d-xxl-block">
            <SideBarTop />
          </div>
          {/* 主要內容 */}
          <div className={`col styles["main-content"]`}>
            <DetailIngredients />
            <DetailSteps />
            <DetailRelatedProducts />
          </div>
        </div>
        <div className={`${styles["recommended-recipe"]} d-flex flex-column`}>
          <DetailRecommendedRecipe />
        </div>
      </div>
      <Footer />
    </>
  );
}