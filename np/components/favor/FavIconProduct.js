import { useAuth } from "@/contexts/AuthContext";
import { addProductFav, removeProductFav } from "@/services/user";
import toast from "react-hot-toast";

// 愛心圖示(svg)
const Heart = ({ size = 30, color = "#db1212" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 38 38"
    style={{
      width: size,
      height: size,
      fill: color,
      stroke: "#db1212",
      strokeWidth: "2",
    }}
  >
    <path d="M16 28.662s-12.363-8.383-12.363-16.163C3.637 7.384 7.527 3.5 12.158 3.5c2.842 0 5.282 1.702 6.185 4.112.884-2.394 3.31-4.112 6.125-4.112 4.631 0 8.522 3.884 8.522 9c0 7.778-12.363 16.162-12.363 16.162z" />
  </svg>
);

export default function FavIconProduct({ id }) {
  const { favorProduct, auth, setAction } = useAuth();

  const handleAddFav = async (pid) => {
    const res = await addProductFav(pid);
    if (res.data.status === "success") {
      // 伺服器成功後，更新 action 的值，觸發 context 重新發送 GET 請求並重新設定狀態
      setAction(Date.now());
      toast.success(`已將商品加入收藏!`);
    }
  };

  const handleRemoveFav = async (pid) => {
    // 發送 DELETE 請求，刪除當筆商品 id
    const res = await removeProductFav(pid);
    if (res.data.status === "success") {
      // 伺服器成功後，更新 action 的值，觸發 context 重新發送 GET 請求並重新設定狀態
      setAction(Date.now());
      toast.success(`已將商品移除收藏!`);
    }
  };

  return (
    <>
      {/* 如果收藏陣列包含現在要新增的這筆 id（表示現在已收藏要移除），愛心是紅色，點擊則刪除 */}
      {/* 如果收藏陣列不包含現在要新增的這筆 id（表示現在未收藏要新增），愛心是白色，點擊則新增 */}
      {favorProduct.includes(id) ? (
        <button
          style={{ padding: 0, border: "none", background: "none" }}
          onClick={() => {
            // 沒登入不能用
            if (!auth.isLoggedIn) {
              return toast.error("請先登入再使用!");
            }
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
            if (!auth.isLoggedIn) {
              return toast.error("請先登入再使用!");
            }
            handleAddFav(id);
          }}
        >
          <Heart color="white" />
        </button>
      )}
    </>
  );
}
