import React, { useEffect, useState } from "react";
import ClassDatetimePicker from "@/components/class_file/ClassDateTimePicker";
import styles from "./classFilter.module.css";
import { RxReload } from "react-icons/rx";

const MobileDateTimePicker = ({ onClose, getStartDate, getEndDate }) => {
  const [classDateStart, setClassDateStart] = useState("");
  const [classDateEnd, setClassDateEnd] = useState("");

  const handleStartDate = (date) => {
    setClassDateStart(date);
    getStartDate(date); // 更新父元件的狀態
  };
  console.log(classDateStart, "delta");

  const handleEndDate = (date) => {
    setClassDateEnd(date);
    getEndDate(date); // 更新父元件的狀態
  };
  console.log(classDateEnd, "ola");

  return (
    <div className={styles.fullMobileScreen} onClick={onClose}>
      <div
        className={styles.datePickerContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 手機版的日期時間選擇器 */}
        <ClassDatetimePicker
          getStartDate={handleStartDate}
          getEndDate={handleEndDate}
        />
      </div>
    </div>
  );
};

const ClassFilter = ({
  onShowGrid,
  onShowList,
  activeButton,
  perpage,
  setPerpage,
  onSortChange, //用於更改排序方式
  onCategoryChange, //手機篩選分類
  categoryId, //手機篩選分類
  total,
  finalStart,
  finalEnd,
}) => {
  const [defaultValue, setDefaultValue] = useState(6); //先前預設
  const [sortByOpen, setSortByOpen] = useState(false);
  const [sortByValue, setSortByValue] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false); // 分類的狀態
  const [categoryValue, setCategoryValue] = useState("課程分類"); // 分類的狀態
  const [showFullScreen, setShowFullScreen] = useState(false); //跳出彈出日期選擇
  const [classDateStart, setClassDateStart] = useState("");
  const [classDateEnd, setClassDateEnd] = useState("");

  const sortOptions = {
    class__i_d: "課程序號",
    class_name: "課程名稱",
    c_price: "課程價格",
    class_date: "課程日期",
  }; //映射用

  const categoryOptions = [
    { key: 1, label: "台式料理" },
    { key: 2, label: "中式料理" },
    { key: 3, label: "西式料理" },
    { key: 4, label: "異國料理" },
    { key: 5, label: "健康養生 / 素食" },
    { key: 6, label: "烘焙 / 點心" },
    { key: 0, label: "全部分類" },
  ]; // 新增的分類選項

  function handleCategoryToggle() {
    setCategoryOpen(!categoryOpen);
  }

  function handleCategorySelect(key, label) {
    setCategoryValue(label);
    setCategoryOpen(false);
    onCategoryChange(key);
    // 這裡可以添加一個函數來處理分類改變後的邏輯
    console.log("Category selected:", label);
  }

  // 對應 toggleIconState
  const isUpDisabled = defaultValue >= 12;
  const isDownDisabled = defaultValue <= 4;

  // 增加或減少項目數量
  function handleIncrease() {
    if (perpage < 12) {
      setPerpage(perpage + 1);
    }
  }

  function handleDecrease() {
    if (perpage > 4) {
      setPerpage(perpage - 1);
    }
  }

  // 處理排序選項
  function handleSortByToggle() {
    setSortByOpen(!sortByOpen);
  }

  function handleOptionClick(value, event) {
    console.log("Event received", value);
    event.stopPropagation();
    setSortByValue(value);
    setSortByOpen(false);
    onSortChange(value);
  }

  useEffect(() => {
    console.log("Current sortByValue:", sortByValue); // 查看 sortByValue 更新后的值
  }, [sortByValue]);

  // 點擊外部關閉排序選項
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sortByOpen &&
        !event.target.closest(`.${styles.sortBy}`) &&
        !event.target.closest(`.${styles.fullMobileScreen}`)
      ) {
        setSortByOpen(false);
      }
      if (categoryOpen && !event.target.closest(`.${styles.classSelect}`)) {
        setCategoryOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [sortByOpen, categoryOpen]);

  // 按鈕遮罩
  const buttonStyle = (buttonType) => ({
    opacity: activeButton === buttonType ? "1" : "0.5",
    cursor: activeButton === buttonType ? "default" : "pointer",
  });

  // 日曆出來不准動
  useEffect(() => {
    if (showFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showFullScreen]);

  const handleStartDate = (date) => {
    setClassDateStart(date);
    finalStart(date);
  };

  const handleEndDate = (date) => {
    setClassDateEnd(date);
    finalEnd(date);
  };

  useEffect(() => {
    if (classDateStart) {
      finalStart(classDateStart);
    }
  }, [classDateStart]);

  useEffect(() => {
    if (classDateEnd) {
      finalEnd(classDateEnd);
    }
  }, [classDateEnd]);

  const reset = () => {
    // reset
    setClassDateStart("");
    setClassDateEnd("");

    // reset classList
    finalStart("");
    finalEnd("");
  };

  return (
    <div className={styles.widthMax}>
      <section className={styles.productCountContainer}>
        <header className={styles.productCountHeader}>
          <p className={styles.totalProducts}>總共：{total} 項商品</p>
          <div className={styles.productCountControls}>
            {classDateStart == "" && (
              <button
                className={styles.celanderMobile}
                onClick={() => setShowFullScreen(!showFullScreen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="#78CEA6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  >
                    <path d="M8 2v4m8-4v4" />
                    <rect width={18} height={18} x={3} y={4} rx={2} />
                    <path d="M3 10h18" />
                  </g>
                </svg>
              </button>
            )}
            {showFullScreen && (
              <MobileDateTimePicker
                onClose={() => setShowFullScreen(false)}
                getStartDate={handleStartDate}
                getEndDate={handleEndDate}
              />
            )}
            {classDateStart !== "" && (
              <button
                // 這裡添加您需要的額外按鈕的 className 和其他屬性
                className={styles.renewButton}
                onClick={reset}
              >
                <RxReload size={22} />
              </button>
            )}

            <div className={styles.itemsPerPage}>
              <span className={styles.itemsPerPageValue} id="itemsPerPage">
                {perpage}
              </span>
              <div className={styles.numberIncreaseDecrease}>
                <button
                  className={styles.selectBtn}
                  id="itemsPerPageUpIcon"
                  onClick={handleIncrease}
                  disabled={isUpDisabled}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10px"
                    height="8px"
                    viewBox="0 0 1024 1024"
                    className={styles.selectBtnIcon}
                  >
                    <path
                      fill="#78CEA6"
                      d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8l316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496"
                    />
                  </svg>
                </button>
                <button
                  className={styles.selectBtn}
                  id="itemsPerPageDownIcon"
                  onClick={handleDecrease}
                  disabled={isDownDisabled}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10px"
                    height="8px"
                    viewBox="0 0 1024 1024"
                    className={styles.selectBtnIcon}
                  >
                    <path
                      fill="#78CEA6"
                      d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              className={
                sortByOpen ? `${styles.sortBy} ${styles.open}` : styles.sortBy
              }
              onClick={handleSortByToggle}
              id="sortBy"
            >
              <span className={styles.sortByLabel}>依 :</span>
              <span className={styles.sortByValue} id="sortByValue">
                {sortOptions[sortByValue] || "課程序號"}
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
              <span className={styles.sortOrder}>排序</span>

              <div className={styles.sortByOptions}>
                {[
                  { key: "class__i_d", label: "課程序號" },
                  { key: "class_name", label: "課程名稱" },
                  { key: "c_price", label: "課程價格" },
                  { key: "class_date", label: "課程日期" },
                ].map((option, index) => (
                  <div
                    key={index}
                    className={styles.sortByOption}
                    onClick={(event) => handleOptionClick(option.key, event)}
                    data-value={option.key}
                  >
                    {option.label}
                  </div>
                ))}
              </div>

              <div className={styles.sortByOptionList}>
                <div className={styles.sortByOption} data-value="class__i_d">
                  課程序號
                </div>
                <div className={styles.sortByOption} data-value="class_name">
                  產品名稱
                </div>
                <div className={styles.sortByOption} data-value="c_price">
                  價錢
                </div>
                <div className={styles.sortByOption} data-value="class_date">
                  課程時間
                </div>
              </div>
            </div>
            {/* only for mobile */}
            <div
              className={
                categoryOpen
                  ? `${styles.classSelect} ${styles.open}`
                  : styles.classSelect
              }
              onClick={handleCategoryToggle}
            >
              <span className={styles.classSelectLabel}>
                {categoryValue || "課程分類"}
              </span>
              {categoryOpen && (
                <div className={styles.classSelectOptions}>
                  {categoryOptions.map((option) => (
                    <div
                      key={option.key}
                      className={styles.classSelectOption}
                      onClick={() =>
                        handleCategorySelect(option.key, option.label)
                      }
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* only for mobile */}
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
          </div>
        </header>
      </section>
    </div>
  );
};

export default ClassFilter;
