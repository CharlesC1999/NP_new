import React from "react";
import { useRouter } from "next/router";
import classSidebarStyles from "./classSidebarStyles.module.css";
import DateTimePicker from "./ClassDateTimePicker";
import ClassPriceRange from "./ClassPriceRange";
import { useCategory } from "@/hooks/ClassProp";

const classSidebar = () => {
  const router = useRouter();
  const { setCategoryId } = useCategory();

  const handleCategoryChange = (categoryId) => {
    return () => {
      // 返回一個函數，這樣點擊時才會執行
      setCategoryId(categoryId);
      // 這裡也可以導航到相應的頁面，如果需要
      router.push(`/class-page`);
    };
  };

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
            onClick={handleCategoryChange(2)}
          >
            中式餐點
          </a>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            onClick={handleCategoryChange(3)}
          >
            西式餐點
          </a>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            onClick={handleCategoryChange(4)}
          >
            日式餐點
          </a>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            onClick={handleCategoryChange(1)}
          >
            台味餐點
          </a>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            onClick={handleCategoryChange(5)}
          >
            健康養生
          </a>
          <a
            className={classSidebarStyles.buttonForDetailPage}
            onClick={handleCategoryChange(6)}
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
