import React from "react";
import classSidebarStyles from "@/styles/class_styles/classSidebarStyles.module.css";
import DateTimePicker from "./classDateTimePicker";
import ClassPriceRange from "./class-price-range";

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
      <div className={classSidebarStyles.DetailPageSetting}>
        <div className={classSidebarStyles.buttonSetForDetailPage}>
          <button className={classSidebarStyles.buttonForDetailPage}>
            中式餐點
          </button>
          <button className={classSidebarStyles.buttonForDetailPage}>
            西式餐點
          </button>
          <button className={classSidebarStyles.buttonForDetailPage}>
            日式餐點
          </button>
          <button className={classSidebarStyles.buttonForDetailPage}>
            台味餐點
          </button>
          <button className={classSidebarStyles.buttonForDetailPage}>
            健康養生
          </button>
          <button className={classSidebarStyles.buttonForDetailPage}>
            烘焙點心
          </button>
        </div>
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
