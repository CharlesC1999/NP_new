import React, { useState, useEffect } from "react";
// 讀取鉤子
import { useLoader } from "@/hooks/use-loader";
import { useCategory } from "@/hooks/ClassProp";
import moment from "moment-timezone";
import ContentSetting from "@/styles/class_styles/ContentSetting.module.css";
import HeaderSetting from "@/styles/headerSetting.module.scss";
import Header from "@/components/Header";
import ClassClassifacion from "@/components/class_file/ClassClassification";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClassSidebar from "@/components/class_file/ClassSidebar";
import ClassFilter from "@/components/class_file/ClassFilter";
import ClassCard from "@/components/class_file/ClassCardWeb";
import ClassCardMobileGrid from "@/components/class_file/ClassCardMobileGrid";
import ClassCardMobileList from "@/components/class_file/ClassCardMobileList";
import CardStyle from "@/styles/class_styles/CardStyle.module.css";
import Pagination from "@/components/pagination";
import ToTheTop from "@/components/toTheTop";
import PaginationM from "@/components/paginationM";
import Footer from "@/components/Footer";

const ClassList = () => {
  // 先導入讀取鉤子
  const { setLoading } = useLoader();
  const { categoryId, setCategoryId } = useCategory();
  const { finalStartDate, setFinalStartDate } = useCategory();
  const { finalEndDate, setFinalEndDate } = useCategory();
  const { priceRange, setPriceRange } = useCategory();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  };

  const subContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const cardWidth = {
    width: "990px",
    gap: "25px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifySelf: "center",
    alignContent: "center",
  };

  // 目前橘子不用走的，用飛奔的，想他慢、想多看看他，再來這邊解註解
  // useEffect(() => {
  //   setLoading(true); // 開始加載畫面

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // 延遲2秒以模擬

  //   return () => {
  //     setLoading(false); // 移除加載狀態
  //   };
  // }, []);

  const [displayGrid, setDisplayGrid] = useState(true); //選擇控制grid
  const [activeButton, setActiveButton] = useState("grid"); // 選擇哪一個是被選擇的狀態
  const [page, setPage] = useState(1); //預設分頁1
  const [perpage, setPerpage] = useState(6); //預設顯示6筆
  //  最後得到的資料
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  // 課程資料庫data
  const [classesData, setClassesData] = useState([]);
  // 用於儲存排序
  const [sortBy, setSortBy] = useState("");
  // 用於選擇分類
  // const [categoryId, setCategoryId] = useState(null);
  // 獲取到日期的資料
  // const [finalStartDate, setFinalStartDate] = useState(null);
  // const [finalEndDate, setFinalEndDate] = useState(null);
  // 獲取價格區間
  // const [finalPriceRange, setFinalPriceRange] = useState({ min: 0, max: 9999 });
  const formatStartDate = moment(finalStartDate).format("YYYY-MM-DD HH:mm:ss");
  const formatEndDate = moment(finalEndDate).format("YYYY-MM-DD HH:mm:ss");

  //串上後端取得資料

  useEffect(() => {
    const params = {
      page,
      perpage,
      sortBy,
      categoryId,
      startDate: finalStartDate
        ? moment(finalStartDate).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      endDate: finalEndDate
        ? moment(finalEndDate).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
      priceStart: priceRange.min,
      priceEnd: priceRange.max,
    };
    console.log(params); // 全部篩選的條件
    getClasses(params);
  }, [
    page,
    perpage,
    sortBy,
    categoryId,
    formatStartDate,
    formatEndDate,
    priceRange?.min,
    priceRange?.max,
  ]);

  const getClasses = async (params) => {
    // console.log(params);
    // !!!params必須是物件!!! 再利用.toString()轉成網址的get參數(網址參數?後面的部分)
    const searchParams = new URLSearchParams(params);
    // console.log(searchParams);
    const url = `http://localhost:3005/api/classes/?${searchParams.toString()}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      // 為了要確保資料是陣列，所以檢查後再設定
      if (data && data.status === "success") {
        setClassesData(data.data.classesRawSql); // 更新課程數據
        setTotal(data.data.total); // 更新總數
        setPageCount(Math.ceil(data.data.total / perpage)); // 更新頁數
      }
      return data; // 返回數據
    } catch (e) {
      console.error("Failed to fetch classes:", e);
      return {};
    }
  };

  useEffect(() => {
    setPageCount(Math.ceil(total / perpage));
  }, [total, perpage]);

  // 初次渲染時取得課程列表資料
  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    const params = {
      page, //頁數
      perpage, //每頁各幾個
      sortBy, //排序
      categoryId,
      startDate: formatStartDate,
      endDate: formatEndDate,
    };
    getClasses(params);
    if (page > pageCount) {
      setPage(Math.max(1, pageCount)); // 確保頁數不小於1
    }
  }, [page, perpage, sortBy, categoryId]);

  useEffect(() => {
    if (page > pageCount && pageCount > 0) {
      setPage(pageCount);
    }
  }, [pageCount, page]);

  // 從子組件接收排序條件
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    // 充新獲得資料
  };

  // 日期區間接收and傳到後端
  const startDate = (date) => {
    setFinalStartDate(date);
  };

  const endDate = (date) => {
    setFinalEndDate(date);
  };

  const handlePriceRange = (range) => {
    setPriceRange(range);
  };

  console.log(finalStartDate, finalEndDate, priceRange, "goal");

  const reset = () => {
    // reset classList
    setFinalStartDate("");
    setFinalEndDate("");

    //  reset price range
    setPriceRange({ min: 0, max: 9999 });
  };

  // ----------------------------顯示模式
  // 切換到Grid模式
  const showGrid = () => {
    setDisplayGrid(true);
    setActiveButton("grid");
  };

  // 切換到List模式
  const showList = () => {
    setDisplayGrid(false);
    setActiveButton("list");
  };
  // ----------------------------顯示模式
  console.log(total, "im here");
  console.log(page, "nowPage");
  return (
    <div style={containerStyle} className={HeaderSetting.mobileAdjust}>
      <div className={HeaderSetting.headerSetting}>
        <Header />
      </div>
      <Breadcrumbs />
      <div style={subContainerStyle}>
        <ClassClassifacion categoryChange={setCategoryId} />
        <div className={ContentSetting.DisplaySetting}>
          <div style={{ height: "100%" }} className={ContentSetting.MobileNone}>
            <ClassSidebar
              finalStart={startDate}
              finalEnd={endDate}
              finalPrice={handlePriceRange}
            />
          </div>

          <div className={CardStyle.SearchResultContainer}>
            <ClassFilter
              onShowGrid={showGrid}
              onShowList={showList}
              activeButton={activeButton}
              perpage={perpage}
              setPerpage={setPerpage}
              onSortChange={handleSortChange}
              onCategoryChange={setCategoryId} // 篩手機分類位置
              categoryId={categoryId} // 篩手機分類位置
              finalStart={startDate} //手機日曆
              finalEnd={endDate} //手機日曆
              total={total}
            />
            <div className={CardStyle.WebCardContainer}>
              <div style={cardWidth}>
                {classesData.map((classData, index) => (
                  <ClassCard
                    classesData={classData}
                    key={index}
                    Index={index}
                  />
                ))}
              </div>
            </div>

            {displayGrid ? (
              <div className={CardStyle.MobileCardContainer}>
                {classesData.map(
                  (classData, index) =>
                    index % 2 === 0 && ( // 每隔一個元素取數據
                      <div className={CardStyle.GridCardSet} key={index}>
                        <ClassCardMobileGrid
                          classesData={classData} // 直接使用當前元素
                          key={index}
                        />
                        {classesData[index + 1] && ( // 確保下一個元素存在
                          <ClassCardMobileGrid
                            classesData={classesData[index + 1]} // 正確訪問下一個元素
                            key={index + 1}
                          />
                        )}
                      </div>
                    )
                )}
              </div>
            ) : (
              <div className={CardStyle.MobileCardContainer}>
                {classesData.map((classData, index) => (
                  <ClassCardMobileList
                    classesData={classData}
                    key={index}
                    Index={index}
                  />
                ))}
              </div>
            )}
            <div className={CardStyle.paginationWeb}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(event, value) => setPage(value)}
              />
            </div>
            <div className={CardStyle.paginationListMarginMobile}>
              <PaginationM
                total={total}
                perpage={perpage}
                onChange={(event, value) => setPage(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToTheTop />
    </div>
  );
};

export default ClassList;
