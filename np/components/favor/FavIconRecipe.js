import { useAuth } from "@/contexts/AuthContext";
import { addRecipeFav, removeRecipeFav } from "@/services/user";
import toast from "react-hot-toast";

// 愛心圖示(svg)
const Heart = ({ size = 24, color = "red" }) => (
  <svg
    className="heart"
    viewBox="0 0 32 29.6"
    style={{ width: size, fill: color, stroke: "red", position: "relative" }}
  >
    <path d="M23.6 0c-3.4 0-6.3 2.7-7.6 5.6C14.7 2.7 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.4 9.5 11.9 16 21.2 6.1-9.3 16-12.1 16-21.2C32 3.8 28.2 0 23.6 0z" />
  </svg>
);

export default function FavIconRecipe({ id }) {
  // 由context取得auth-判斷是否能執行add或remove用，favorites決定愛心圖案用
  const { favorRecipe, setFavorRecipe, recipeData, setRecipeData } = useAuth();

  // 讓會員收藏頁取消愛心時能即時移除卡片，更動愛心時也要即時更動 recipeData 的內容
  const updateRecipeData = (newFavorRecipe) => {
    // 過濾 recipeData，只保留 newFavorRecipe 中的 ID 對應的食譜
    const filteredRecipeData = recipeData.filter((recipe) =>
      newFavorRecipe.includes(recipe.recipe__i_d)
    );
    setRecipeData(filteredRecipeData);
  };

  const handleTriggerFav = (rid) => {
    let newFavorRecipe;
    if (favorRecipe.includes(rid)) {
      // 移除 rid
      newFavorRecipe = favorRecipe.filter((v) => v !== rid);
    } else {
      // 添加 rid
      newFavorRecipe = [...favorRecipe, rid];
    }

    // 更新喜好食譜 ID 陣列
    setFavorRecipe(newFavorRecipe);
    // 更新食譜資料
    updateRecipeData(newFavorRecipe);
  };

  const handleAddFav = async (rid) => {
    const res = await addRecipeFav(rid);

    if (res.data.status === "success") {
      // 伺服器成功後，更新context中favorites的狀態，頁面上的圖示才會對應更動
      handleTriggerFav(rid);
      toast.success(`商品 id=${rid} 新增成功!`);
    }
  };

  const handleRemoveFav = async (rid) => {
    const res = await removeRecipeFav(rid);

    if (res.data.status === "success") {
      // 伺服器成功後，更新context中favorites的狀態，頁面上的圖示才會對應更動
      handleTriggerFav(rid);
      toast.success(`商品 id=${rid} 刪除成功!`);
    }
  };

  return (
    <>
      {/* 由favorites狀態決定呈現實心or空心愛愛圖示 */}
      {favorRecipe.includes(id) ? (
        <button
          style={{ padding: 0, border: "none", background: "none" }}
          onClick={() => {
            // 沒登入不能用
            // if (!auth.isAuth) {
            //   return toast.error('會員才能使用!')
            // }

            handleRemoveFav(id);
          }}
        >
          <Heart />
        </button>
      ) : (
        <button
          style={{ padding: 0, border: "none", background: "none" }}
          onClick={() => {
            // 沒登入不能用
            // if (!auth.isAuth) {
            //   return toast.error('會員才能使用!')
            // }

            handleAddFav(id);
          }}
        >
          <Heart color="white" />
        </button>
      )}

      
    </>
  );
}
