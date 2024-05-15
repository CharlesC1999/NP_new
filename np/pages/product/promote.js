//React
import React, { useState, useEffect, useRef, use } from "react";
import Link from "next/link";

// 然後在你的代碼中使用 `NextLink` 來代替 `Link`。

//fontAwsome

//components
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard02 from "@/components/product/ProductCard02";
import ProductCardList from "@/components/product/ProductCardList";
import ProductFilter from "@/components/product/ProductFilterDiscount";
import Footer from "@/components/Footer";
import HeaderComponent from "@/components/Header";
import Pagination from "@/components/product/pagination";
import ProductFilterDiscount from "@/components/product/ProductFilterDiscount";
import PaginationM from "@/components/paginationM";

//side bar components
import ProductSidebarCate from "@/components/product/sideBar/ProductSidebarCate";
import ProductSidebarNew from "@/components/product/sideBar/ProductSidebarNew";
import ProductSidebarDiscount from "@/components/product/sideBar/ProductSidebarDiscount";

//style
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/Product/promote.module.css";

//Data json
// import items from "@/data/product/productItems.json";

export default function Product() {
  const [displayGrid, setDisplayGrid] = useState(true); //選擇控制grid
  const [activeButton, setActiveButton] = useState("grid"); // 選擇哪一個是被選擇的狀態
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

  const disPic = [
    "discount11.png",
    "discount10.png",
    "discount02.png",
    "discount04.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  //產品數量顯示
  const [productCate, setProductCate] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(nextIndex);
      setNextIndex((nextIndex + 1) % disPic.length);
    }, 2000); // 包括淡出時間後更換圖片

    return () => clearInterval(interval);
  }, [nextIndex]);

  //條件用

  const [orderby, setOrderby] = useState({
    sort: "product_price",
    order: "asc",
  });

  const [selectdiscountCate, setSelectdiscountCate] = useState([]);
  const handleCategoryClick = (categoryId) => {
    setSelectdiscountCate(categoryId);
    // console.log(categoryId);
  };
  //分頁部分
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(8);
  const [pageCount, setPageCount] = useState(0); //頁碼數量

  //產品
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [mayLikeProducts, setMayLikeProducts] = useState([]);
  const [disCountproduct, setDisCountProduct] = useState([]);

  const discountCategories = productCate.filter((cate) =>
    [22, 14, 15, 16, 17, 18, 19, 20].includes(cate.cateId)
  );
  console.log(discountCategories);
  const changePage = (event, value) => {
    console.log("Changing page to:", value);
    setPage(value);
    console.log("Page after set:", page);
  };

  const [querySearch, setquerySearch] = useState({
    page: 1,
    perpage,
    discount_id: "",
    order: orderby.order,
    sort: orderby.sort,
  });

  useEffect(() => {
    const newParams = {
      perpage,
      discount_id: selectdiscountCate,
      order: orderby.order,
      sort: orderby.sort,
    };

    // 检查除 page 外的其他参数是否有变更
    const shouldResetPage = Object.keys(newParams).some(
      (key) => querySearch[key] !== newParams[key]
    );

    if (shouldResetPage) {
      setPage(1); // 重置页码
      setquerySearch({ ...newParams, page: 1 }); // 同时更新查询参数
    } else {
      setquerySearch((prev) => ({ ...prev, page })); // 更新查询参数中的页码
    }
  }, [perpage, selectdiscountCate, orderby, page]);

  useEffect(() => {
    const getProducts = async () => {
      const searchParams = new URLSearchParams(querySearch);

      const url = `http://localhost:3005/api/products/disCount?${searchParams.toString()}`;
      console.log("Final URL sent to server:", url);

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === "success") {
          setPageCount(Math.ceil(data.data.totalRecords / querySearch.perpage));
          //total總筆數
          setTotal(data.data.totalRecords);
          //產品分類資料
          setProductCate(data.data.categories);
          // setMayLikeProducts(data.data.mayLikeProducts);
          setCategoryCounts(data.data.categoryCounts);
          setDisCountProduct(data.data.disCountproduct);
        } else {
          console.log("请求状态不是 'success'");
        }
      } catch (e) {
        console.error("请求产品数据失败:", e);
      }
    };
    getProducts();
  }, [querySearch, page]);

  const getMayLike = async () => {
    const searchParams = new URLSearchParams(querySearch);

    const url = `http://localhost:3005/api/products/disCount?${searchParams.toString()}`;
    console.log("url" + url);

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "success") {
        setMayLikeProducts(data.data.mayLikeProducts);
      } else {
        console.log("请求状态不是 'success'");
      }
    } catch (e) {
      console.error("请求产品数据失败:", e);
    }
  };

  useEffect(() => {
    getMayLike();
  }, []);

  const TotalRow = total;
  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={styles.iconBG}>
        <div
          className={`container d-flex justify-content-center ${styles.wrapper} ${styles.Top40}`}
        >
          <div className={`${styles.sideBar}`}>
            {/* <ProductSidebarCate /> */}
            <ProductSidebarDiscount
              DisCountCategories={discountCategories}
              handleCategoryClick={handleCategoryClick}
              selectdiscountCate={selectdiscountCate}
              setSelectdiscountCate={setSelectdiscountCate}
            />
            <ProductSidebarNew mayLikeProducts={mayLikeProducts} />
          </div>
          <div
            className={`${styles.productW}  d-flex flex-column justify-content-start`}
          >
            <div className={`${styles.mainDiscount}`}>
              <div className={`${styles.DiscountTitleMain}`}>
                <h4 className={`${styles.DiscountTitle} mb-4`}>
                  限時特惠商品 🎉
                </h4>
              </div>
              <div className={`${styles.DiscountBoxMain}`}>
                <div className={`${styles.DiscountBox}`}>
                  {disPic.map((pic, index) => (
                    <img
                      key={pic}
                      src={`/index-images/discount-Pic/${pic}`}
                      alt=""
                      className={`${styles.image} ${index === currentIndex ? styles.show : ""}`}
                    />
                  ))}
                </div>
                <div className={`${styles.ProductFilter} pt-sm-4 pt-0`}>
                  <ProductFilterDiscount
                    onShowGrid={showGrid}
                    onShowList={showList}
                    activeButton={activeButton}
                    TotalRow={TotalRow}
                    setOrderby={setOrderby}
                    discountCategories={discountCategories}
                    selectdiscountCate={selectdiscountCate}
                    setSelectdiscountCate={setSelectdiscountCate}
                  />
                </div>
              </div>
            </div>
            <div
              className={`d-flex ${styles.productCardBox} justify-content-center flex-cloumn`}
            >
              <div
                className={`d-flex ${styles.productCard1} justify-content-start`}
              >
                {disCountproduct.length > 0 ? (
                  // Render products if there are any
                  disCountproduct.map((item) => (
                    <div key={item.id}>
                      {displayGrid ? (
                        <ProductCard02
                          className={`mx-sm-2 mx-0`}
                          id={item.id}
                          img={item.image_urls}
                          image={item.image_urls}
                          category_id={item.category_id}
                          name={item.product_name}
                          description={item.product_description}
                          price={item.product_price}
                          disPrice={item.discount_price}
                          average_rating={item.average_rating}
                        />
                      ) : (
                        <ProductCardList
                          id={item.id}
                          img={item.image_urls}
                          category_id={item.category_id}
                          name={item.product_name}
                          description={item.product_description}
                          price={item.product_price}
                          disPrice={item.discount_price}
                          average_rating={item.average_rating}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  // Render no result message and image if there are no products
                  <div className={`d-flex justify-content-center my-5`}>
                    <h3
                      className={`d-flex justify-content-center text-align-center`}
                    >
                      查詢無結果唷！
                    </h3>
                    <div>
                      <img src="/index-images/noResultBG.png" alt="" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <div className="justify-content-center d-none mt-5 d-sm-flex">
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={changePage} // 使用新的 changePage 函数
                />
              </div>
              <div
                className={`${styles.paginationM} d-flex d-sm-none justifu-content-center`}
              >
                <PaginationM
                  total={total}
                  perpage={perpage}
                  onChange={(event, value) => setPage(value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
