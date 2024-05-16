import { useAuth } from "@/contexts/AuthContext";
import { useFavor } from "@/hooks/use-favorData";
import { addClassFav, removeClassFav } from "@/services/user";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import styles from "./FavorIconClass.module.css";

// 愛心圖示(svg)
const Heart = ({ size = 24, color = "#db1212" }) => (
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
// 接收 ClassCardWeb 卡片中傳來的課程 id 值
export default function FavIconClass({ id }) {
  // 從 useAuth 這個 context 取得目前收藏的課程 id 陣列（favorClass）、登入狀態(auth)和對於按鈕被觸發的設置(setAction)
  const {auth} = useAuth();
  const { favorClass, setAction } = useFavor();
  const handleAddFav = async (cid) => {
    const res = await addClassFav(cid);
    if (res.data.status === "success") {
      setAction(Date.now());
      toast.success(`已將課程加入收藏!`, {
        style: { boxShadow:"0px 0px 2px #ccc"}
      });
    }
  };

  const handleRemoveFav = async (cid) => {
    // 發送 DELETE 請求，刪除當筆課程 id
    const res = await removeClassFav(cid);
    if (res.data.status === "success") {
      // 伺服器成功後，更新 action 的值，觸發 context 重新發送 GET 請求並重新設定狀態
      setAction(Date.now());
      toast.success(`已將課程移除收藏!`, {
        style: { boxShadow:"0px 0px 2px #ccc"}
      });
    }
  };

  // 依照路由決定渲染的按鈕樣式
  const location = useRouter();
  const isClassList = location.pathname === "/class-page";
  const isClassDetail = location.pathname.startsWith(
    "/class-page/class-detail"
  );
  // 嵌套渲染：只有在路由為講師細節頁時才進行後續的 switch 判斷
  return (
    <>
      {/* 用在講師細節頁的收藏樣式 */}
      {isClassDetail &&
        (favorClass.includes(id) ? (
          <button
            className={styles.linkBtn}
            onClick={() => {
              if (!auth.isLoggedIn) {
                return toast.error("請先登入再使用!");
              }
              handleRemoveFav(id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M19.707 5.707l-1.414-1.414L12 10.586 5.707 4.293 4.293 5.707 10.586 12l-6.293 6.293 1.414 1.414L12 13.414l6.293 6.293 1.414-1.414L13.414 12l6.293-6.293z"
              />
            </svg>

            <p className={styles.linkText}>移除收藏</p>
          </button>
        ) : (
          <button
            onClick={() => {
              if (!auth.isLoggedIn) {
                return toast.error("請先登入再使用!");
              }
              handleAddFav(id);
              setAction(Date.now());
            }}
            className={styles.linkBtn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
            >
              <path fill="white" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
            </svg>
            <p className={styles.linkText}>加入收藏</p>
          </button>
        ))}
      {/* 用在講師列表頁的收藏樣式 */}
      {!isClassDetail &&
        (favorClass.includes(id) ? (
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
        ))}
    </>
  );
}
