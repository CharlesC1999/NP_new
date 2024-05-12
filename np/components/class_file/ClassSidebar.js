import React, { useState, useEffect } from "react";
import classSidebarStyles from "./classSidebarStyles.module.css";
import DateTimePicker from "./ClassDateTimePicker";
import ClassPriceRange from "./ClassPriceRange";
import { MdAutorenew } from "react-icons/md";

const classSidebar = ({ finalStart, finalEnd, finalPrice }) => {
  const [classDateStart, setClassDateStart] = useState("");
  const [classDateEnd, setClassDateEnd] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 9999 }); // 新增價格範圍狀態

  const handleStartDate = (date) => {
    setClassDateStart(date);
    finalStart(date);
  };

  console.log(classDateStart, "delta");

  // finalStart(classDateStart);

  const handleEndDate = (date) => {
    setClassDateEnd(date);
    finalEnd(date);
  };

  console.log(classDateEnd, "ola");

  // finalEnd(classDateEnd);

  const handlePriceRangeChange = (range) => {
    // 新增處理價格範圍變化的函數
    setPriceRange(range);
    finalPrice(range);
  };

  console.log(priceRange);

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

  useEffect(() => {
    // 在這裡觀察 priceRange 的變化
    console.log(priceRange);
    finalPrice(priceRange);
  }, [priceRange]);

  const reset = () => {
    // reset
    setClassDateStart("");
    setClassDateEnd("");

    // reset classList
    finalStart("");
    finalEnd("");

    //  reset price range
    setPriceRange({ min: 0, max: 9999 });
    finalPrice({ min: 0, max: 9999 });
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
        <ClassPriceRange
          min={0}
          max={9999}
          onRangeChange={handlePriceRangeChange}
        />
      </div>
    </div>
  );
};

export default classSidebar;
