import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./RecipeCardsGrid.module.scss";
import Link from "next/link";
import FavIconRecipe from "@/components/favor/FavIconRecipe";
import toast, { Toaster } from "react-hot-toast";
export default function RecipeCardsGrid({ recipesData = [] }) {
  return (
    <>
      {recipesData.map((v, i) => {
        return (
          <div
            className={`row ${styles["grid-layout"]} d-flex justify-content-between mb-3`}
          >
            <div className={`${styles["recipe-card"]} row d-flex`}>
              <div className={`col-12 ${styles["card-pic"]}`}>
                <img
                  className="w-100 h-100 object-fit-cover"
                  src={`/images/recipe/list/${v.image__u_r_l}`}
                  alt=""
                />
              </div>
              <div
                className={`col ${styles["card-content"]} d-flex flex-column justify-content-between justify-content-xxl-start gap-2`}
              >
                <div
                  className={`${styles["card-content-top"]} d-flex justify-content-between`}
                >
                  <div
                    className={`${styles["recipe-title"]} ${styles["figma-h5"]}`}
                  >
                    {v.title__r_name}
                  </div>
                  <div className={styles["heart"]}>
                    <FavIconRecipe id={v.recipe__i_d} />
                    <Toaster position="bottom-right" reverseOrder={false} />
                  </div>
                </div>
                <div
                  className={`${styles["card-content-middle"]} d-none d-xxl-block col-xxl-9 mb-auto`}
                >
                  {v.content}
                </div>
                <div
                  className={`${styles["card-content-bottom"]} d-flex flex-column gap-2`}
                >
                  <div
                    className={`${styles["bottom-left"]} d-flex flex-column justify-content-between gap-2 gap-xxl-5`}
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
                        {v.publish_date.split(" ")[0]}
                      </p>
                    </div>
                    <div
                      className={`${styles["recipe-category"]} ${styles["figma-p"]}`}
                    >
                      分類：{v.Recipe_cate_Name}
                    </div>
                  </div>
                  <Link
                    href={`/recipe/${v.recipe__i_d}`}
                    className="link-underline link-underline-opacity-0"
                  >
                    <button
                      type="button"
                      className={`btn btn-primary ${styles["btn-more-detail"]} col-12 ${styles["figma-h6"]}`}
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
                  </Link>
                </div>
              </div>
            </div>
            {/* <div className={`${styles["recipe-card"]} row d-flex"`}>
          <div className={`col-12 ${styles["card-pic"]}`}>
            <img
              className="w-100 h-100 object-fit-cover"
              src="/images/recipe/list/1_MVMlYcSvoU 1.png"
              alt=""
            />
          </div>
          <div
            className={`col ${styles["card-content"]} d-flex flex-column justify-content-between justify-content-xxl-start gap-2`}
          >
            <div
              className={`${styles["card-content-top"]} d-flex justify-content-between`}
            >
              <div
                className={`${styles["recipe-title"]} ${styles["figma-h5"]}`}
              >
                羊肉燉湯
              </div>
              <div className={styles["heart"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={19}
                  height={18}
                  viewBox="0 0 19 18"
                  fill="none"
                >
                  <path
                    d="M17.1554 2.07986C15.1219 0.394444 12.0976 0.697603 10.2311 2.57069L9.50008 3.30333L8.76906 2.57069C6.90624 0.697603 3.87823 0.394444 1.84472 2.07986C-0.485659 4.01431 -0.608115 7.4862 1.47735 9.58305L8.65773 16.7939C9.12158 17.2595 9.87487 17.2595 10.3387 16.7939L17.5191 9.58305C19.6083 7.4862 19.4858 4.01431 17.1554 2.07986Z"
                    fill="#D9D9D9"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`${styles["card-content-middle"]} d-none d-xxl-block col-xxl-9 mb-auto`}
            >
              精心烹調的米飯與絕美松露相遇，為你帶來一場嗆辣的味蕾大戰。在黑暗中，化學元素交織出令人窒息的風味，彷彿在體驗一場驚心動魄的烹飪秘辛。
            </div>
            <div
              className={`${styles["card-content-bottom"]} d-flex flex-column gap-2`}
            >
              <div
                className={`${styles["bottom-left"]} d-flex flex-column justify-content-between gap-2 gap-xxl-5`}
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
                    2024年5月26日
                  </p>
                </div>
                <div
                  className={`${styles["recipe-category"]} ${styles["figma-p"]}`}
                >
                  分類：湯品
                </div>
              </div>
              <button
                type="button"
                className={`btn btn-primary ${styles["btn-more-detail"]} col-12 figma-h6`}
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
        </div> */}
          </div>
        );
      })}
    </>
  );
}
