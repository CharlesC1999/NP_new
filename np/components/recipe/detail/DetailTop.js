import { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { FaUserLarge } from "react-icons/fa6";
import { LuAlarmClock } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DetailTop.module.scss";
import toast, { Toaster } from "react-hot-toast";

export default function DetailTop({ recipe }) {
  //收藏與否
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

  return (
    <>
      <div className={`row ${styles["top"]}`}>
        <div className="col">
          <div className={`${styles["pic"]} w-100 `}>
            <img
              className="object-fit-cover w-100 h-100"
              src={`/images/recipe/list/${recipe.image__u_r_l}`}
              alt=""
            />
          </div>
        </div>
        <div className="w-100" />
        <div className={`col ${styles["top-main-info"]}`}>
          <div className={`row ${styles["top-info-m"]}`}>
            <div className={`col-12 col-xxl-3 ${styles["info-left"]}`}>
              <div className={`${styles["info-left"]} d-flex flex-column`}>
                <p
                  className={`${styles["title"]} ${styles["figma-h3"]} mb-0 text-center text-xxl-start`}
                >
                  {recipe.title__r_name}
                </p>
                <div
                  className={`${styles["left-bottom"]} d-flex justify-content-center justify-content-xxl-start`}
                >
                  <p className={styles["figma-p"]}>
                    分類：{recipe.Recipe_cate_Name} /{" "}
                    {recipe.publish_date.split(" ")[0]}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6" />
            <div className={`col-12 col-xxl-3 ${styles["info-right"]}`}>
              <div
                className={`${styles["info-right"]} d-flex justify-content-center justify-content-xxl-start`}
              >
                <div className={`${styles["small-card"]} ms-xl-auto`}>
                  <div
                    title="點擊加入收藏"
                    className="h-100"
                    onClick={() => {
                      notify();
                    }}
                  >
                    {/* {saved ? <SavedHeart /> : <UnsavedHeart />} */}
                    <FaHeart
                      className={`${styles["heart"]} ${
                        saved ? styles["saved"] : styles["unsaved"]
                      }`}
                    />
                  </div>
                </div>
                <div className={styles["small-card"]}>
                  <div>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={35}
                      height={36}
                      viewBox="0 0 35 36"
                      fill="none"
                    >
                      <path
                        d="M17.5 14.7092C18.1703 14.7092 18.834 14.5772 19.4533 14.3207C20.0725 14.0642 20.6352 13.6882 21.1092 13.2143C21.5832 12.7403 21.9591 12.1776 22.2156 11.5584C22.4721 10.9391 22.6042 10.2754 22.6042 9.60508C22.6042 8.93479 22.4721 8.27107 22.2156 7.6518C21.9591 7.03254 21.5832 6.46986 21.1092 5.99589C20.6352 5.52193 20.0725 5.14596 19.4533 4.88945C18.834 4.63294 18.1703 4.50092 17.5 4.50092C16.1463 4.50092 14.848 5.03867 13.8908 5.99589C12.9336 6.95311 12.3958 8.25137 12.3958 9.60508C12.3958 10.9588 12.9336 12.2571 13.8908 13.2143C14.848 14.1715 16.1463 14.7092 17.5 14.7092ZM4.375 29.8759V30.7509H30.625V29.8759C30.625 26.6092 30.625 24.9759 29.9892 23.7276C29.4299 22.63 28.5376 21.7377 27.44 21.1784C26.1917 20.5426 24.5583 20.5426 21.2917 20.5426H13.7083C10.4417 20.5426 8.80833 20.5426 7.56 21.1784C6.46244 21.7377 5.57009 22.63 5.01083 23.7276C4.375 24.9759 4.375 26.6092 4.375 29.8759Z"
                        fill="#50BF8B"
                        stroke="#50BF8B"
                        strokeWidth={4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg> */}
                    <FaUserLarge className={styles["person"]} />
                  </div>
                  <p
                    className={`${styles["figma-p"]} ${styles["caption"]} text-center`}
                  >
                    {recipe.servings}人份
                  </p>
                </div>
                <div className={styles["small-card"]}>
                  <div className="text-center">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={36}
                      height={36}
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <path
                        d="M23.8332 21.5009H25.2915H25.7915V22.0009V29.2776L25.7999 29.4172C25.8314 29.6547 25.9508 29.8719 26.1347 30.0259C26.3221 30.1826 26.5622 30.262 26.806 30.2477C27.0498 30.2333 27.279 30.1265 27.4467 29.9488C27.6144 29.7712 27.7079 29.5363 27.7082 29.292V5.97419L27.6998 5.83436C27.6698 5.60617 27.5587 5.39623 27.3865 5.2431C27.2111 5.08714 26.9845 5.00096 26.7498 5.00092L23.8332 21.5009ZM23.8332 21.5009C23.8332 21.5009 23.8332 21.5009 23.8332 21.5009C23.5985 21.5009 23.3719 21.4147 23.1965 21.2587C23.0243 21.1056 22.9132 20.8957 22.8832 20.6675M23.8332 21.5009L22.8832 20.6675M22.8832 20.6675L22.8748 20.5276V11.7926C22.8748 10.2805 23.3924 8.54291 24.175 7.18826C24.5651 6.51288 25.0091 5.95386 25.4655 5.56945C25.9243 5.18298 26.3609 5.00094 26.7498 5.00092L22.8832 20.6675ZM14.5832 18.9005V18.5134L14.958 18.4164C16.1029 18.1203 17.117 17.4524 17.841 16.5174C18.565 15.5824 18.958 14.4334 18.9582 13.2509C18.9582 13.2509 18.9582 13.2509 18.9582 13.2508V5.97419L18.9498 5.83434C18.9198 5.60616 18.8087 5.39622 18.6365 5.2431C18.4611 5.08714 18.2345 5.00096 17.9998 5.00092L14.5832 18.9005ZM14.5832 18.9005L14.5832 29.292C14.5832 29.2922 14.5832 29.2923 14.5832 29.2924C14.5828 29.5365 14.4893 29.7713 14.3217 29.9488C14.154 30.1265 13.9248 30.2333 13.681 30.2477C13.4372 30.262 13.1971 30.1826 13.0097 30.0259C12.8258 29.8719 12.7064 29.6547 12.6749 29.4172L12.6665 29.2776V18.9005V18.5133L12.2916 18.4164C11.1922 18.1322 10.2121 17.5046 9.49387 16.625C8.77706 15.7471 8.35841 14.6639 8.29848 13.5322L8.2915 13.2448V5.95956C8.29184 5.71539 8.38536 5.48055 8.55298 5.30299C8.72066 5.12538 8.94983 5.01849 9.19367 5.00418C9.43751 4.98987 9.67762 5.0692 9.86493 5.22597L10.1772 4.85287L9.86493 5.22597C10.0489 5.37994 10.1683 5.59717 10.1998 5.83465L10.2082 5.97419V13.2509C10.2082 13.8507 10.3661 14.4398 10.6659 14.9592C10.9658 15.4786 11.3971 15.9099 11.9165 16.2098L12.6665 16.6428V15.7767L12.6665 5.9598M14.5832 18.9005L12.6665 5.9598M12.6665 5.9598C12.6665 5.95968 12.6665 5.95956 12.6665 5.95944C12.6669 5.71531 12.7604 5.48052 12.928 5.30299C13.0957 5.12538 13.3248 5.01849 13.5687 5.00418C13.8125 4.98987 14.0526 5.0692 14.2399 5.22597C14.4239 5.37994 14.5433 5.59718 14.5748 5.83465M12.6665 5.9598L14.5748 5.83465M14.5748 5.83465L14.5832 5.97423L14.5846 15.7768L14.5848 16.6432L15.3349 16.2096C15.8116 15.9341 16.2146 15.5474 16.5097 15.0824C16.8048 14.6175 16.9831 14.0882 17.0295 13.5395L17.0304 13.5288L17.0309 13.5181L17.0411 13.2716L17.0415 13.2613V13.2509V5.95925C17.0415 5.70508 17.1425 5.46133 17.3222 5.2816C17.5019 5.1019 17.7456 5.00093 17.9998 5.00092L14.5748 5.83465Z"
                        fill="#50BF8B"
                        stroke="#50BF8B"
                      />
                    </svg> */}
                    <GiKnifeFork className={styles["tableware"]} />
                  </div>
                  <p className={`${styles["figma-p"]} ${styles["caption"]}`}>
                    {recipe.ingredients__count}樣食材
                  </p>
                </div>
                <div className={styles["small-card"]}>
                  <div>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={36}
                      height={36}
                      viewBox="0 0 36 36"
                      fill="none"
                    >
                      <path
                        d="M18 31.7092H18.0003C19.7316 31.7102 21.3584 31.3772 22.8857 30.7124C24.4225 30.0435 25.7616 29.1364 26.9069 27.9911C28.0511 26.8468 28.9578 25.5083 29.6268 23.9713C30.2916 22.4441 30.625 20.8167 30.625 19.0842C30.625 17.6322 30.391 16.242 29.924 14.9112C29.4559 13.577 28.7765 12.3226 27.8832 11.1472L27.6191 10.7997L27.9277 10.4911L29.6158 8.80298L28.2812 7.46842L26.5931 9.15653L26.2845 9.46515L25.937 9.20106C24.7616 8.30776 23.5073 7.62835 22.173 7.16019C20.8423 6.69327 19.4522 6.45926 18.0003 6.45923C16.2687 6.46016 14.6416 6.79362 13.1141 7.45757C11.5773 8.12557 10.2384 9.03214 9.09314 10.1774C7.94887 11.3216 7.04225 12.6602 6.37324 14.1971C5.70847 15.7243 5.37503 17.3516 5.375 19.084L18 31.7092ZM18 31.7092C16.2675 31.7092 14.64 31.3762 13.1127 30.7123C11.576 30.0444 10.2376 29.1374 9.09343 27.9914L9.09314 27.9911M18 31.7092L9.09314 27.9911M9.09314 27.9911C7.94791 26.8459 7.04134 25.5069 6.37334 23.9701M9.09314 27.9911L6.37334 23.9701M6.37334 23.9701C5.70943 22.4427 5.37597 20.8157 5.375 19.0842L6.37334 23.9701ZM12.9133 31.1709C11.3208 30.4787 9.92958 29.5366 8.73958 28.3446L18 32.2092C16.2014 32.2092 14.5058 31.8631 12.9133 31.1709ZM14.125 4.0009V2.08423H21.875V4.0009H14.125ZM18.9583 12.2926V20.0426H17.0417V12.2926H18.9583ZM18 29.7926C20.952 29.7926 23.4855 28.7434 25.5723 26.6565C27.6592 24.5697 28.7083 22.0362 28.7083 19.0842C28.7083 16.1322 27.6592 13.5988 25.5723 11.5119C23.4855 9.42507 20.952 8.3759 18 8.37589C15.048 8.37589 12.5146 9.42507 10.4277 11.5119C8.34084 13.5988 7.29167 16.1322 7.29167 19.0842C7.29167 22.0362 8.34084 24.5697 10.4277 26.6565C12.5146 28.7434 15.048 29.7926 18 29.7926Z"
                        fill="#50BF8B"
                        stroke="#50BF8B"
                      />
                    </svg> */}
                    <LuAlarmClock className={styles["clock"]} />
                  </div>
                  <p className={`${styles["figma-p"]} ${styles["caption"]}`}>
                    {recipe.cooking__time}分鐘
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}
