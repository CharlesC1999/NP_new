import { useAuth } from "@/contexts/AuthContext";
import { addClassFav, removeClassFav } from "@/services/user";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import styles from "./FavorIconClass.module.css";
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
// 接收 ClassCardWeb 卡片中傳來的課程 id 值
export default function FavIconClass({ id }) {
  // 由context取得auth-判斷是否能執行add或remove用
  const { favorClass, setFavorClass, classData, setClassData } = useAuth();

  // 讓會員收藏頁取消愛心時能即時移除卡片，更動愛心時也要即時更動 ClassData 的內容
  const updateClassData = (newFavorClass) => {
    // 過濾 ClassData，只保留 newFavorClass 中的 ID 對應的食譜
    // filter 過濾時不能用 class ，是保留字，改成用 v
    const filteredClassData = classData.filter((v) =>
      newFavorClass.includes(v.class__i_d)
    );
    setClassData(filteredClassData);
  };

  const handleTriggerFav = (cid) => {
    let newFavorClass;
    if (favorClass.includes(cid)) {
      // 移除 cid
      newFavorClass = favorClass.filter((v) => v !== cid);
    } else {
      // 添加 cid
      newFavorClass = [...favorClass, cid];
    }

    // 更新喜好食譜 ID 陣列
    setFavorClass(newFavorClass);
    // 更新食譜資料
    updateClassData(newFavorClass);
  };

  const handleAddFav = async (cid) => {
    const res = await addClassFav(cid);

    if (res.data.status === "success") {
      // 伺服器成功後，更新context中favorites的狀態，頁面上的圖示才會對應更動
      handleTriggerFav(cid);
      toast.success(`商品 id=${cid} 新增成功!`);
    }
  };

  const handleRemoveFav = async (cid) => {
    const res = await removeClassFav(cid);

    if (res.data.status === "success") {
      // 伺服器成功後，更新context中favorites的狀態，頁面上的圖示才會對應更動
      handleTriggerFav(cid);
      toast.success(`商品 id=${cid} 刪除成功!`);
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
      {isClassDetail &&
        (favorClass.includes(id) ? (
          <button
            className={styles.linkBtn}
            onClick={() => {
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
              handleAddFav(id);
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
      {/* 由favorites狀態決定呈現實心or空心愛愛圖示 */}
      {!isClassDetail &&
        (favorClass.includes(id) ? (
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
        ))}
    </>
  );
}
