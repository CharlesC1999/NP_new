import React, { useState, useEffect } from "react";
import classSidebarStyles from "./classSidebarStyles.module.css";
import DateTimePicker from "./ClassDateTimePicker";
import ClassPriceRange from "./ClassPriceRange";
import { MdAutorenew } from "react-icons/md";

const classSidebar = ({ finalStart, finalEnd }) => {
  const [classDateStart, setClassDateStart] = useState("");
  const [classDateEnd, setClassDateEnd] = useState("");

  const handleStartDate = (date) => {
    setClassDateStart(date);
  };

  console.log(classDateStart, "delta");

  // finalStart(classDateStart);

  const handleEndDate = (date) => {
    setClassDateEnd(date);
  };

  console.log(classDateEnd, "ola");

  // finalEnd(classDateEnd);

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
    <div className={classSidebarStyles.sidebarContainer}>
      <div>
        {/* 篩選標題 */}
        <div className={classSidebarStyles.title}>
          篩選
          <button className={classSidebarStyles.renewButton} onClick={reset}>
            <MdAutorenew />
          </button>
        </div>
        <div className={classSidebarStyles.onlyBorderBottom}>
          <img src="/images/Vector 3.svg" alt="" />
        </div>
      </div>
      <div>
        {/* 日期篩選 */}
        <DateTimePicker
          // key={`${classDateStart}-${classDateEnd}`}
          getStartDate={handleStartDate}
          getEndDate={handleEndDate}
        />
      </div>
      <div className={classSidebarStyles.priceClass}>
        <p className={classSidebarStyles.subTitle}>價格</p>
        <ClassPriceRange />
      </div>
    </div>
  );
};

export default classSidebar;
