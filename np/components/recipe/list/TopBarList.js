import { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./TopBarList.module.scss";
import { useCategories } from "@/hooks/recipe/use-categories";
import { useCategoryForSQL } from "@/hooks/recipe/use-categoryForSQL";

export default function TopBarList({
  setOrderby = {},
  total = 0,
  showList = () => {},
  showGrid = () => {},
}) {
  // 手機板TopBarList的類別被點擊時設定state給SQL做查詢
  const { setRecipeCategory } = useCategoryForSQL();
  // 使用context傳遞食譜類別資料 (用在sideBar、手機板的topBarlist跟食譜細節頁的sideBar)
  const { setNewCategories, newCategories } = useCategories();

  // 當點擊排序options時會收起整個selectBox
  const selectBoxRef = useRef(null);
  // 點擊排序options設定顯示目前是按照什麼排序 (asc or desc)
  const sortRef = useRef(null);
  // 當點擊分類options時會收起整個selectBox
  const categoryBoxRef = useRef(null);
  // 點擊分類options設定顯示目前是按照什麼排序 (asc or desc)
  const categoryRef = useRef(null);

  // 點擊排序下拉清單的選項時收起清單
  const handlefoldSelectBox = (e) => {
    selectBoxRef.current.classList.add(styles["click-hidden"]);
    // 顯示目前點擊到的option文字
    const sortText = e.target.textContent;
    sortRef.current.textContent = sortText;
  };

  // 點擊分類下拉清單的選項時收起清單
  const handlefoldCategoryBox = (e) => {
    categoryBoxRef.current.classList.add(styles["click-hidden"]);
    // 顯示目前點擊到的option文字
    const sortText = e.target.textContent;
    categoryRef.current.textContent = sortText;
  };

  // 排序的選項 (單純map用)
  const sortByOptions = [
    { name: "按id升序", order: "asc" },
    { name: "按id降序", order: "desc" },
  ];

  // 切換switch button active
  const listBtnRef = useRef(null);
  const gridBtnRef = useRef(null);

  const listBtnActive = () => {
    listBtnRef.current.style.backgroundColor = "var(--gray03)";
    gridBtnRef.current.style.backgroundColor = "transparent";
  };
  const gridBtnActive = () => {
    gridBtnRef.current.style.backgroundColor = "var(--gray03)";
    listBtnRef.current.style.backgroundColor = "transparent";
  };

  return (
    <>
      <div
        className={`${styles["top-bar"]} row d-flex d-xxl-none justify-content-between`}
      >
        {/* 排序 */}
        <div
          className={`col-4 ${styles["btn-sort"]} d-flex align-items-center`}
          onClick={() => {
            selectBoxRef.current.classList.toggle(styles["click-hidden"]);
          }}
        >
          <p ref={sortRef} className={`${styles["sort"]} text-center`}>
            排序
          </p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M2.25 13.5H6.75V12H2.25V13.5ZM2.25 4.5V6H15.75V4.5H2.25ZM2.25 9.75H11.25V8.25H2.25V9.75Z"
                fill="#8B96A5"
              />
            </svg>
          </div>
        </div>
        {/* 分類 */}
        <div
          className={`col-5 ${styles["btn-filter"]} d-flex align-items-center`}
          onClick={() => {
            categoryBoxRef.current.classList.toggle(styles["click-hidden"]);
          }}
        >
          <p ref={categoryRef} className={`${styles["category"]} text-center`}>
            全部 ({total})
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M5.25392 4.5H12.7539L8.99642 9.225L5.25392 4.5ZM3.19142 4.2075C4.70642 6.15 7.50392 9.75 7.50392 9.75V14.25C7.50392 14.6625 7.84142 15 8.25392 15H9.75392C10.1664 15 10.5039 14.6625 10.5039 14.25V9.75C10.5039 9.75 13.2939 6.15 14.8089 4.2075C15.1914 3.7125 14.8389 3 14.2164 3H3.78392C3.16142 3 2.80892 3.7125 3.19142 4.2075Z"
              fill="#8B96A5"
            />
          </svg>
        </div>

        {/* switch button */}
        <div className={`col-auto ${styles["switch-card-qty"]} d-flex`}>
          <div
            onClick={() => {
              showGrid();
              gridBtnActive();
            }}
            ref={gridBtnRef}
            className={styles["switch-grid"]}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M9.16667 2.5H2.5V9.16667H9.16667V2.5Z" fill="#50BF8B" />
              <path
                d="M9.16667 10.8333H2.5V17.5H9.16667V10.8333Z"
                fill="#50BF8B"
              />
              <path d="M17.5 2.5H10.8333V9.16667H17.5V2.5Z" fill="#50BF8B" />
              <path
                d="M17.5 10.8333H10.8333V17.5H17.5V10.8333Z"
                fill="#50BF8B"
              />
            </svg>
          </div>
          <div
            onClick={() => {
              showList();
              listBtnActive();
            }}
            ref={listBtnRef}
            className={styles["switch-row"]}
            style={{
              background: "var(--gray03)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M17.5 6.66666H2.5V3.33333H17.5V6.66666ZM17.5 8.33333H2.5V11.6667H17.5V8.33333ZM17.5 13.3333H2.5V16.6667H17.5V13.3333Z"
                fill="#50BF8B"
              />
            </svg>
          </div>
        </div>
        {/* 所有下拉式選單 */}
        <div
          className={`row position-relative d-flex ${styles["all-dropdown"]}`}
        >
          {/* 排序下拉式選單 */}
          <div
            className={`col-4 d-flex flex-column gap-1 position-relative py-2 px-0 ${styles["select-box"]} ${styles["click-hidden"]}`}
            ref={selectBoxRef}
          >
            {sortByOptions.map((v, i) => {
              return (
                <p
                  key={i}
                  onClick={(e) => {
                    handlefoldSelectBox(e);
                    setOrderby({ sort: "recipe__i_d", order: v.order });
                  }}
                  className="text-center m-0"
                >
                  {v.name}
                </p>
              );
            })}
          </div>
          {/* 分類下拉式選單 */}
          <div
            className={` col-5 d-flex flex-column gap-1 position-relative py-2 px-0 ${styles["categories-box"]} ${styles["click-hidden"]}`}
            ref={categoryBoxRef}
          >
            <p
              onClick={(e) => {
                handlefoldCategoryBox(e);
                setRecipeCategory("");
                // setOrderby({ sort: "recipe__i_d", order: v.order });
              }}
              className="text-center m-0"
            >
              全部 (50)
            </p>
            {newCategories.map((v, i) => {
              return (
                <p
                  key={i}
                  onClick={(e) => {
                    handlefoldCategoryBox(e);
                    setRecipeCategory(v.Recipe_cate_ID);
                  }}
                  className="text-center m-0"
                >
                  {v.Recipe_cate_name} ({v.qty})
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
