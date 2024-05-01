import React, { useState } from "react";
import Styles from "./paginationM.module.scss";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PaginationComponent = ({ total, perpage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  total = Math.ceil(total / perpage);

  const handleChange = (e) => {
    setCurrentPage(Number(e.target.value));
  };

  return (
    <div className={Styles.paginationContainer}>
      <button
        onClick={() => setCurrentPage((p) => p - 1)}
        disabled={currentPage === 1}
        className={Styles.paginationButton}
      >
        <MdKeyboardArrowLeft size={24} />
      </button>
      <select value={currentPage} onChange={handleChange}>
        {Array.from({ length: total }, (_, i) => (
          <option value={i + 1}>{i + 1}</option>
        ))}
      </select>
      <button
        onClick={() => setCurrentPage((p) => p + 1)}
        disabled={currentPage === total}
        className={Styles.paginationButton}
      >
        <MdKeyboardArrowRight size={24} />
      </button>
    </div>
  );
};

export default PaginationComponent;
