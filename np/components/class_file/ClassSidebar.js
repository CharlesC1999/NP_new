import React from "react";
import classSidebarStyles from "./classSidebarStyles.module.css";
import DateTimePicker from "./ClassDateTimePicker";
import ClassPriceRange from "./ClassPriceRange";

const classSidebar = () => {
  return (
    <div className={classSidebarStyles.sidebarContainer}>
      <div>
        {/* 篩選標題 */}
        <p className={classSidebarStyles.title}>篩選</p>
        <div className={classSidebarStyles.onlyBorderBottom}>
          <img src="/images/Vector 3.svg" alt="" />
        </div>
      </div>
      <div>
        {/* 日期篩選 */}
        <DateTimePicker />
      </div>
      <div className={classSidebarStyles.priceClass}>
        <p className={classSidebarStyles.subTitle}>價格</p>
        <ClassPriceRange />
      </div>
    </div>
  );
};

export default classSidebar;
