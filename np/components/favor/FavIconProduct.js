import { useAuth } from "@/contexts/AuthContext";
import { addProductFav, removeProductFav } from "@/services/user";
import toast from "react-hot-toast";

// 愛心圖示(svg)
const Heart = ({ size = 30, color = "red" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 38 38"
    style={{
      width: size,
      height: size,
      fill: color,
      stroke: "red",
      strokeWidth: "2",
    }}
  >
    <path d="M16 28.662s-12.363-8.383-12.363-16.163C3.637 7.384 7.527 3.5 12.158 3.5c2.842 0 5.282 1.702 6.185 4.112.884-2.394 3.31-4.112 6.125-4.112 4.631 0 8.522 3.884 8.522 9c0 7.778-12.363 16.162-12.363 16.162z" />
  </svg>
);

export default function FavIconProduct({ id }) {
  // 由context取得auth-判斷是否能執行add或remove用，favorites決定愛心圖案用
  const {
    favorProduct,
    setFavorProduct,
    productData,
    setProductData,
    auth,
    setAction,
  } = useAuth();

  // 讓會員收藏頁取消愛心時能即時移除卡片，更動愛心時也要即時更動 productData 的內容

  const handleAddFav = async (pid) => {
    const res = await addProductFav(pid);
    if (res.data.status === "success") {
      // 伺服器成功後，更新context中favorites的狀態，頁面上的圖示才會對應更動
      // handleTriggerFav(pid);
      toast.success(`已將商品 id=${pid} 加入收藏!`);
    }
  };

  const handleRemoveFav = async (pid) => {
    const res = await removeProductFav(pid);
    if (res.data.status === "success") {
      // 伺服器成功後，更新context中favorites的狀態，頁面上的圖示才會對應更動
      // handleTriggerFav(pid);
      toast.success(`已將商品 id=${pid} 移除收藏!`);
    }
  };

  return (
    <>
      {/* 由favorites狀態決定呈現實心or空心愛愛圖示 */}
      {favorProduct.includes(id) ? (
        <button
          style={{ padding: 0, border: "none", background: "none" }}
          onClick={() => {
            // 沒登入不能用
            if (!auth.isLoggedIn) {
              return toast.error("會員才能使用!");
            }
            handleRemoveFav(id);
            setAction(Date.now());
          }}
        >
          <Heart />
        </button>
      ) : (
        <button
          style={{ padding: 0, border: "none", background: "none" }}
          onClick={() => {
            // 沒登入不能用
            if (!auth.isLoggedIn) {
              return toast.error("會員才能使用!");
            }

            handleAddFav(id);
            setAction(Date.now());
          }}
        >
          <Heart color="white" />
        </button>
      )}
    </>
  );
}
