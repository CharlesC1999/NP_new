import React from "react";
import classSidebarStyles from "./classSidebarStyles.module.css";
import DateTimePicker from "./classDateTimePicker";
import ClassPriceRange from "./class-price-range";

const classSidebar = () => {
  return (
    <div
      className={classSidebarStyles.sidebarContainer}
      style={{ marginTop: "30px" }}
    >
      <div>
        {/* 篩選標題 */}
        <p className={classSidebarStyles.title}>篩選</p>
        <div className={classSidebarStyles.onlyBorderBottom}>
          <img src="/images/Vector 3.svg" alt="" />
        </div>
      </div>
      <div className={classSidebarStyles.DetailPageSetting}>
        <div className={classSidebarStyles.buttonSetForDetailPage}>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            href="/class_page"
          >
            中式餐點
          </a>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            href="/class_page"
          >
            西式餐點
          </a>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            href="/class_page"
          >
            日式餐點
          </a>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            href="/class_page"
          >
            台味餐點
          </a>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            href="/class_page"
          >
            健康養生
          </a>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            href="/class_page"
          >
            烘焙點心
          </a>
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
