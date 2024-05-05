import { useState, useEffect, useRef } from "react";
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

// 推薦食譜的左右按鈕
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export default function RecipeDetail() {
  // 放在slider，用來設定偏移，左或右，有用props傳給推薦食譜
  const sliderRef = useRef();

  // 向左移動的距離
  const [sliderMove, setSliderMove] = useState("");

  // fetch資料後得到的推薦食譜陣列的default value，用props傳給推薦食譜component
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  // 用來計算推薦食譜陣列的長度，點到最後一張時右鍵button要disabled
  const [recommendedRecipesLength, setRecommendedRecipesLength] = useState("");

  // 計算最後一張食譜的offset是多少
  const [lastRecipeOffset, setLastRecipeOffset] = useState("");

  // 透過路由參數取得對應食譜ID
  const router = useRouter();

  // 設定食譜初始值
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

  // 取得對應的食譜
  const getRecipe = async (rid) => {
    try {
      const url = `http://localhost:3005/api/recipes/${rid}`;
      const res = await fetch(url);
      const data = await res.json();

      // 為了要確保"食譜細節資料"是物件，所以檢查後再設定
      if (
        typeof data.data.finalRecipe === "object" &&
        data.data.finalRecipe !== null
      ) {
        setRecipe(data.data.finalRecipe);
      } else {
        console.log("伺服器回傳資料類型錯誤，無法設定到狀態中");
      }

      // 為了要確保"推薦食譜"是陣列，所以檢查後再設定
      if (Array.isArray(data.data.recipeCategories)) {
        setRecommendedRecipes(data.data.recipeCategories);
      } else {
        console.log("伺服器回傳資料類型錯誤，無法設定到狀態中");
      }

      // 設定推薦食譜該類別的其他食譜共有多少筆資料
      setRecommendedRecipesLength(data.data.finalRecipesCount);
    } catch (e) {
      console.log(e);
    }
  };

  // 推薦食譜的左右按鈕 -----------------------start------------------------------------
  const handleMoveLeft = () => {
    setSliderMove(Number(sliderMove) + 366);
  };

  const handleMoveRight = () => {
    setSliderMove(Number(sliderMove) - 366);
  };
  // 推薦食譜的左右按鈕 -------------------------end------------------------------------

  // 計算當點到最後一張食譜時右鍵按鈕要disabled
  useEffect(() => {
    setLastRecipeOffset((recommendedRecipesLength - 4) * 366);
  }, [recommendedRecipesLength]);

  // 點按鈕時因為並非同步，程式碼不會等state改變才往下執行，所以需要監聽slideMove變化再執行動作
  useEffect(() => {
    sliderRef.current.style.right = sliderMove + "px";
  }, [sliderMove]);

  // 當URL改變時執行取得對應食譜
  useEffect(() => {
    if (router.isReady) {
      getRecipe(router.query.recipeId);
    }
  }, [router.query.recipeId]);

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
        <div
          className={`${styles["recommended-recipe"]} d-flex flex-column position-relative overflow-hidden`}
        >
          <a
            onClick={() => {
              handleMoveRight();
            }}
            href="javascript:void(0)"
            className={`${!sliderMove ? styles["disabled-btn"] : ""} ${
              recommendedRecipesLength <= 4 ? "d-none" : ""
            }  position-absolute top-0 bottom-0 pe-0 text-dark d-flex justify-content-center align-items-center  ${
              styles["prev-btn"]
            } ${styles["slide-btn"]}`}
          >
            <FaChevronCircleLeft
              style={{ fontSize: "30px", color: "var(--green02)" }}
            />
          </a>
          <a
            onClick={() => {
              handleMoveLeft();
            }}
            href="javascript:void(0)"
            className={`${
              lastRecipeOffset == sliderMove ? styles["disabled-btn"] : ""
            } ${
              recommendedRecipesLength <= 4 ? "d-none" : ""
            } position-absolute top-0 bottom-0 ps-0 d-flex justify-content-center align-items-center text-dark ${
              styles["next-btn"]
            } ${styles["slide-btn"]}`}
          >
            <FaChevronCircleRight
              style={{ fontSize: "30px", color: "var(--green02)" }}
            />
          </a>
          <DetailRecommendedRecipe
            sliderRef={sliderRef}
            recommendedRecipes={recommendedRecipes}
          />
        </div>
      </div>
      <Footer />
    </CategoriesProvider>
  );
}
