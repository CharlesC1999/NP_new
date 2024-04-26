import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./RecipeCardsList.module.scss";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function RecipeCardsList() {
  //食譜資料庫data
  const [recipesData, setRecipesData] = useState([]);

  //收藏與否的state
  const [saved, setSaved] = useState(false);

  const notify = () => {
    if (saved) {
      setSaved(false);
      return toast("成功移除收藏");
    } else {
      setSaved(true);
      return toast("成功加入收藏");
    }
  };

  //串上後端取得資料
  const getRecipes = async () => {
    const url = "http://localhost:3005/api/recipes";

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.recipes)) {
        setRecipesData(data.data.recipes);
      } else {
        console.log("伺服器回傳資料類型錯誤，無法設定到狀態中");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      {recipesData.map((v, i) => {
        return (
          <Link
            href={`/recipe/${v.Recipe_ID}`}
            className="link-underline link-underline-opacity-0"
          >
            <div className={`${styles["recipe-card"]} row d-flex`}>
              <div className={`col-4 ${styles["card-pic"]}`}>
                <img
                  className="w-100 h-100 object-fit-cover"
                  src={`/images/recipe/list/${v.Image_URL}`}
                  alt=""
                />
              </div>
              <div
                className={`col ${styles["card-content"]} d-flex flex-column justify-content-between justify-content-xxl-start gap-3`}
              >
                <div
                  className={`${styles["card-content-top"]} d-flex justify-content-between`}
                >
                  <div
                    className={`${styles["recipe-title"]} ${styles["figma-h5"]}`}
                  >
                    {v.Title_R_name}
                  </div>
                  <div>
                    <FaHeart
                      onClick={(e) => {
                        e.preventDefault();
                        notify();
                      }}
                      className={`${styles["heart"]} ${
                        saved ? styles["saved"] : styles["unsaved"]
                      }`}
                    />
                  </div>
                </div>
                <div
                  className={`${styles["card-content-middle"]} d-none d-xxl-block col-xxl-9 mb-auto`}
                >
                  {v.Content}
                </div>
                <div
                  className={`${styles["card-content-bottom"]} d-flex flex-column flex-xxl-row align-items-xxl-end justify-content-xxl-between`}
                >
                  <div
                    className={`${styles["bottom-left"]} d-flex justify-content-between gap-xxl-5`}
                  >
                    <div
                      className={`${styles["published-date"]} d-flex align-items-center`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={13}
                        viewBox="0 0 12 13"
                        fill="none"
                      >
                        <path
                          d="M6 11.81C4.96165 11.81 3.94662 11.5021 3.08326 10.9252C2.2199 10.3483 1.54699 9.52839 1.14963 8.56907C0.752275 7.60976 0.648307 6.55416 0.85088 5.53576C1.05345 4.51736 1.55347 3.5819 2.28769 2.84767C3.02192 2.11345 3.95738 1.61343 4.97578 1.41086C5.99418 1.20829 7.04978 1.31226 8.00909 1.70962C8.9684 2.10698 9.78834 2.77988 10.3652 3.64324C10.9421 4.5066 11.25 5.52163 11.25 6.55999C11.25 7.95237 10.6969 9.28773 9.71231 10.2723C8.72775 11.2569 7.39239 11.81 6 11.81ZM6 2.05998C5.10999 2.05998 4.23996 2.32391 3.49994 2.81837C2.75992 3.31284 2.18314 4.01564 1.84254 4.83791C1.50195 5.66018 1.41284 6.56498 1.58647 7.43789C1.7601 8.31081 2.18869 9.11263 2.81802 9.74197C3.44736 10.3713 4.24918 10.7999 5.1221 10.9735C5.99501 11.1472 6.89981 11.058 7.72208 10.7174C8.54435 10.3768 9.24715 9.80007 9.74162 9.06005C10.2361 8.32003 10.5 7.45 10.5 6.55999C10.5 5.36651 10.0259 4.22192 9.18198 3.378C8.33807 2.53409 7.19348 2.05998 6 2.05998Z"
                          fill="#747E85"
                        />
                        <path
                          d="M7.72125 8.80998L5.625 6.71373V3.18498H6.375V6.40248L8.25 8.28123L7.72125 8.80998Z"
                          fill="#747E85"
                        />
                      </svg>
                      <p className={`${styles["figma-p"]} ${styles["date"]}`}>
                        {v.Publish_date.split("T")[0]}
                      </p>
                    </div>
                    <div
                      className={`${styles["recipe-category"]} ${styles["figma-p"]}`}
                    >
                      分類：{v.Recipe_category_ID}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`btn btn-primary ${styles["btn-more-detail"]} col-8 col-xxl-auto ${styles["figma-h6"]}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={15}
                      viewBox="0 0 14 15"
                      fill="none"
                    >
                      <path
                        d="M10.0057 9.36501H9.37336L9.14923 9.14889C9.96079 8.20757 10.4068 7.00582 10.4059 5.76296C10.4059 4.73391 10.1008 3.72796 9.52909 2.87234C8.95738 2.01672 8.14478 1.34984 7.19407 0.956037C6.24335 0.562237 5.1972 0.4592 4.18792 0.659958C3.17865 0.860716 2.25157 1.35625 1.52392 2.0839C0.796269 2.81155 0.300734 3.73863 0.099976 4.74791C-0.100782 5.75718 0.00225434 6.80333 0.396055 7.75405C0.789856 8.70477 1.45673 9.51736 2.31236 10.0891C3.16798 10.6608 4.17392 10.9659 5.20297 10.9659C6.49171 10.9659 7.67639 10.4937 8.58891 9.70921L8.80503 9.93334V10.5657L12.8073 14.56L14 13.3673L10.0057 9.36501ZM5.20297 9.36501C3.20984 9.36501 1.60092 7.7561 1.60092 5.76296C1.60092 3.76982 3.20984 2.1609 5.20297 2.1609C7.19611 2.1609 8.80503 3.76982 8.80503 5.76296C8.80503 7.7561 7.19611 9.36501 5.20297 9.36501Z"
                        fill="white"
                      />
                    </svg>
                    了解更多
                  </button>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}
