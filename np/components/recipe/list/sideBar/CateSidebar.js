import { useState, useEffect } from "react";
import styles from "./CateSidebar.module.css";

function CateSidebar({
  setRecipeCategory,
  handleConditionsChange,
  recipeCategory,
  setCategoriesDropdown,
}) {
  //食譜類別state初始值
  const [categories, setCategories] = useState([]);
  // 新的食譜類別 (有擴充qty的，上面那個不知道為啥一直無法設定qty)
  const [newCategories, setNewCategories] = useState([]);

  // 各類別食譜總數  ------------------------------start---------------------------------------
  // 所有類別
  const [allCategories, setAllCategories] = useState("");
  // 主食
  const [staple, setStaple] = useState("");
  // 醬料
  const [sauce, setSauce] = useState("");
  // 湯品
  const [soup, setSoup] = useState("");
  // 飲品
  const [drink, setDrink] = useState("");
  // 點心
  const [snack, setSnack] = useState("");
  // 沙拉
  const [salad, setSalad] = useState("");

  // 集合各類食譜的數量
  const [allRecipes, setAllRecipes] = useState([
    {
      id: 1,
      qty: 0,
    },
    { id: 2, qty: 0 },
    { id: 3, qty: 0 },
    { id: 4, qty: 0 },
    { id: 5, qty: 0 },
    { id: 6, qty: 0 },
  ]);
  // 各類別食譜總數  ------------------------------end---------------------------------------

  //取得食譜分類名稱
  const getCategories = async () => {
    const url = "http://localhost:3005/api/recipes";

    try {
      const res = await fetch(url);
      const data = await res.json();

      // 設定各類別食譜總數  ------------------------------start---------------------------------------
      // 全部類別
      setAllCategories(data.data.total);
      // 主食
      setStaple(data.data.finalStapleCount);
      // 醬料
      setSauce(data.data.finalSauceCount);
      // 湯品
      setSoup(data.data.finalSoupCount);
      // 飲品
      setDrink(data.data.finalDrinkCount);
      // 點心
      setSnack(data.data.finalSnackCount);
      // 沙拉
      setSalad(data.data.finalSaladCount);
      // 設定各類別食譜總數  ------------------------------end---------------------------------------

      //檢查得到的資料是array才設定給state (供map使用)
      if (Array.isArray(data.data.recipesCategories)) {
        setCategories(data.data.recipesCategories);
      } else {
        console.log("資料類型錯誤，無法設定state");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // 當各類食譜的數量有變動時重新設定給集合的食譜總數
  useEffect(() => {
    setAllRecipes([
      { id: 1, qty: staple },
      { id: 2, qty: sauce },
      { id: 3, qty: soup },
      { id: 4, qty: drink },
      { id: 5, qty: snack },
      { id: 6, qty: salad },
    ]);
  }, [staple, sauce, soup, drink, snack, salad]);

  // 當集合的食譜總數有變動時設定給最初的食譜陣列物件 (sql查詢得到的結果)，用意在於擴充qty給sideBar顯示
  useEffect(() => {
    const newCategoriesAry = categories.map((v, i) => {
      // 找出集合各類食譜中id跟sql查詢得到的recipe_cate_id相同的物件
      const found = allRecipes.find((v1) => {
        return v1.id === v.Recipe_cate_ID;
      });
      // 如果有找到對應id的物件，就把qty給最一開始sql查詢到的物件，否則就給原本的物件
      if (found) {
        return { ...v, qty: found.qty };
      } else {
        return { ...v };
      }
    });

    // 設定給sql查詢到的物件
    setNewCategories(newCategoriesAry);
    //給TopBarList用的食譜分類
    setCategoriesDropdown(newCategoriesAry);
    setCategories(newCategories);
  }, [allRecipes]);

  return (
    <>
      {/* 顯示所有類別的食譜 */}
      <div
        onClick={() => {
          setRecipeCategory("");
        }}
        className={`d-flex gap-3 flex-column mt-3 ${styles["pointer"]}`}
      >
        <div
          className={`d-flex ${styles.sideBox}`}
          style={{
            border: recipeCategory === "" ? "var(--green03) solid 2px" : "",
          }}
        >
          <div className={styles.sideImg}>
            <img src="/index-images/category-1.png" alt />
          </div>
          <div className={styles.sideText}>
            <h6 className={styles.left}>全部</h6>
            <h6 className={styles.right}>{allCategories}</h6>
          </div>
        </div>
      </div>

      {newCategories.map((v, i) => {
        return (
          <div
            onClick={() => {
              setRecipeCategory(v.Recipe_cate_ID);
            }}
            className={`d-flex gap-3 flex-column mt-3 ${styles["pointer"]}`}
          >
            <div
              className={`d-flex ${styles.sideBox}`}
              style={{
                border:
                  recipeCategory === v.Recipe_cate_ID
                    ? "var(--green03) solid 2px"
                    : "",
              }}
            >
              <div className={styles.sideImg}>
                <img src="/index-images/category-1.png" alt />
              </div>
              <div className={styles.sideText}>
                <h6 className={styles.left}>{v.Recipe_cate_name}</h6>
                <h6 className={styles.right}>{v.qty}</h6>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CateSidebar;
