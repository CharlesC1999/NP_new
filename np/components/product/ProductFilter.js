import React, { useEffect, useState } from "react";
import styles from "@/components/product/FilterProduct.module.css";

const ProductFilter = ({
  onShowGrid,
  onShowList,
  activeButton,
  TotalRow,
  setOrderby,
  handleNewCategoryChanges,
  newCategories,
  normalCategories,
  setNewCategories,
}) => {
  const [defaultValue, setDefaultValue] = useState(6);
  const [sortByOpen, setSortByOpen] = useState(false);
  const [sortByValue, setSortByValue] = useState("");
  const sortByOptions = [
    { name: "最新上架", order: "asc", sort: "upload_date" },
    { name: "價錢低至高", order: "asc", sort: "product_price" },
    { name: "價錢高至低", order: "desc", sort: "product_price" },
  ];
  console.log(newCategories);
  const [categoryOpen, setCategoryOpen] = useState(false); // 分類的狀態
  const [categoryValue, setCategoryValue] = useState("產品分類");
  function handleCategoryToggle() {
    setCategoryOpen(!categoryOpen);
  }

  // 處理排序選項
  function handleSortByToggle() {
    setSortByOpen(!sortByOpen);
  }
  function handleCategorySelect(key, label) {
    setCategoryValue(label);
    setCategoryOpen(false);
    setNewCategories([key]);
    // 這裡可以添加一個函數來處理分類改變後的邏輯
    console.log("Category selected:", label);
  }

  function handleOptionClick(value, event) {
    console.log("Event received", value);
    event.stopPropagation();
    setSortByValue(value);
    setSortByOpen(false);
  }

  useEffect(() => {
    console.log("Current sortByValue:", sortByValue); // 查看 sortByValue 更新后的值
  }, [sortByValue]);

  // 點擊外部關閉排序選項
  useEffect(() => {
    function handleClickOutside(event) {
      // 确认点击的元素是否属于 sortBy 区域内
      if (sortByOpen && !event.target.closest(`.${styles.sortBy}`)) {
        setSortByOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sortByOpen]);

  // 按鈕遮罩
  const buttonStyle = (buttonType) => ({
    opacity: activeButton === buttonType ? "1" : "0.5",
    cursor: activeButton === buttonType ? "default" : "pointer",
  });

  return (
    <div className={styles.widthMax}>
      <header className={styles.productCountHeader}>
        <p className={styles.totalProducts}>總共： {TotalRow} 項商品</p>
        <div className={styles.productCountControls}>
          <div
            className={
              sortByOpen ? `${styles.sortBy} ${styles.open}` : styles.sortBy
            }
            onClick={handleSortByToggle}
            id="sortBy"
          >
            <span className={styles.sortByLabel}>排序 :</span>
            <span className={styles.sortByValue} id="sortByValue">
              {sortByValue || "價錢"}
              {/* 確認這裡沒有錯誤地回落到 "Select" */}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              className={styles.sortMobile}
            >
              <path
                fill="#8b96a5"
                d="M4 18h4c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1m1 6h10c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1"
              />
            </svg>

            <div className={styles.sortByOptions}>
              {sortByOptions.map((option, index) => (
                <div
                  key={index}
                  className={styles.sortByOption}
                  onClick={(event) => {
                    setSortByValue(option.name);
                    setOrderby({ sort: option.sort, order: option.order });
                  }}
                  data-value={option}
                >
                  {option.name}
                </div>
              ))}
            </div>

            <div className={styles.sortByOptionList}>
              <div
                className={styles.sortByOption}
                data-value="Class ID"
                onClick={() => console.log("Option was clicked!")}
              >
                評分
              </div>
              <div className={styles.sortByOption} data-value="Price">
                價錢
              </div>
            </div>
          </div>

          {/* -----分類------ */}
          <div
            className={
              categoryOpen
                ? `${styles.classSelect} ${styles.open}`
                : styles.classSelect
            }
            onClick={handleCategoryToggle}
          >
            <span className={styles.classSelectLabel}>
              {categoryValue || "分類"}
            </span>
            {categoryOpen && (
              <div className={styles.classSelectOptions}>
                {normalCategories.map((v) => (
                  <div
                    key={v.cateId}
                    className={styles.classSelectOption}
                    onClick={() => handleCategorySelect(v.cateId, v.cateName)}
                  >
                    {v.cateName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.gridRowSelections}>
          <button
            className={styles.gridBtn}
            id="selection-btn"
            onClick={onShowGrid}
            style={buttonStyle("grid")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27px"
              height="27px"
              viewBox="0 0 24 24"
              className={styles.selectionBtn}
            >
              <g fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="#50bf8b"
                  d="M9 13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM9 3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm10 0a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                />
              </g>
            </svg>
          </button>
          <button
            className={styles.rowBtn}
            id="selection-btn-list"
            onClick={onShowList}
            style={buttonStyle("list")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 100 100"
              className={styles.selectionBtnList}
            >
              <path
                fill="#50bf8b"
                d="M17.563 30.277h.012a2.268 2.268 0 0 0 2.246 2.267v.002H80.18v-.001a2.269 2.269 0 0 0 2.259-2.268h.01V19.818a2.269 2.269 0 0 0-2.269-2.265H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115zm62.616 12.227H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115v10.34h.012a2.268 2.268 0 0 0 2.246 2.267v.002h60.359v-.001a2.269 2.269 0 0 0 2.259-2.268h.01V44.769a2.272 2.272 0 0 0-2.271-2.265m0 24.95H19.821a2.27 2.27 0 0 0-2.269 2.269c0 .039.01.076.012.115v10.34h.012a2.268 2.268 0 0 0 2.246 2.267v.002h60.359v-.001a2.27 2.27 0 0 0 2.259-2.269h.01V69.718a2.272 2.272 0 0 0-2.271-2.264"
              />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default ProductFilter;
