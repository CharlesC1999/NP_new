import React, { useState } from "react";
import Styles from "./paginationM.module.scss";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PaginationComponent = ({
  total,
  perpage,
  onChange = () => {},
  // 設定食譜頁碼
  recipeSetPage = () => {},
}) => {
  const [page, setPage] = useState(1);
  total = Math.ceil(total / perpage);

  const handleChange = (e) => {
    const newPage = Number(e.target.value);
    console.log(`切換到頁面: ${newPage}`);
    setPage(newPage);

    // 如果 onChange 需要事件和值作為參數
    if (onChange) {
      onChange(e, newPage);
    }
  };

  const handleArrowChange = (newPage) => {
    setPage(newPage);
    // 這裡也應當呼叫 onChange，即使沒有事件對象也應該傳遞更新的頁碼
    if (onChange) {
      onChange(null, newPage); // 這裡傳遞 null 作為事件對象，因為按鈕點擊不涉及到事件目標的值變更
    }
  };

  return (
    <div className={Styles.paginationContainer}>
      <button
        onClick={() => {
          handleArrowChange(Math.max(1, page - 1));
          recipeSetPage(Math.max(1, page - 1));
        }}
        disabled={page === 1}
        className={Styles.paginationButton}
      >
        <MdKeyboardArrowLeft size={24} />
      </button>
      <select
        value={page}
        onChange={(e) => {
          handleChange(e);
          recipeSetPage(e.target.value);
        }}
        className={Styles.paginationBox}
      >
        {Array.from({ length: total }, (_, i) => (
          <option value={i + 1}>{i + 1}</option>
        ))}
      </select>
      <button
        onClick={() => {
          handleArrowChange(Math.min(page + 1, total));
          recipeSetPage(Math.min(page + 1, total));
        }}
        disabled={page === total}
        className={Styles.paginationButton}
      >
        <MdKeyboardArrowRight size={24} />
      </button>
    </div>
  );
};

export default PaginationComponent;
