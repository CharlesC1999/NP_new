//React
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// 然後在你的代碼中使用 `NextLink` 來代替 `Link`。

//fontAwsome

//components
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard02 from "@/components/product/ProductCard02";
import ProductCardList from "@/components/product/ProductCardList";
import ProductFilter from "@/components/product/ProductFilter";
import Footer from "@/components/Footer";
import HeaderComponent from "@/components/Header";
import Pagination from "@/components/product/pagination";
import ProductSidebarDiscount from "@/components/product/sideBar/ProductSidebarDiscount";

// import PaginationRounded from "@/components/pagination";
//荃做版本sideBar
// import CateSidebar from "@/components/product/CateSidebar";
// import NewSidebar from "@/components/product/Newsidebar";
// import ProductCard from "@/components/product/ProductCard";

//side bar components
import ProductSidebarCate from "@/components/product/sideBar/ProductSidebarCate";
import ProductSidebarNew from "@/components/product/sideBar/ProductSidebarNew";
import ProductSidebarDetail from "@/components/product/sideBar/ProductSidebarDetail";

//style
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/Product/product.module.css";

//useContext
import { useProductCategories } from "@/hooks/use-product-cate";
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

  const resetFilters = () => {
    setPriceRange({ min: "", max: "" });
    setRating(0);
    setHoverRating(0);
    setSelectedCategories([]);
  };
  const [mayLikeProducts, setMayLikeProducts] = useState([]);

  //產品數量顯示
  const [categoryCounts, setCategoryCounts] = useState({});
  //分頁部分
  const [page, setPage] = useState(1);
  const [perpage, setPerpage] = useState(20);

  //產品
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  //條件用
  const [productCate, setProductCate] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  //葉子評分
  const handleStartRating = (rating) => {
    setRating(rating);
  };

  const handleStartHoverRating = (hover) => {
    setHoverRating(hover);
  };
  const handleResetRating = () => {
    setRating(0);
  };

  const [orderby, setOrderby] = useState({
    sort: "product_price",
    order: "asc",
  });

  // const [selectdiscountCate, setSelectdiscountCate] = useState(0);

  //------------detailSideBar---------//
  const normalCategories = productCate.filter(
    (cate) => cate.parentId === null && cate.cateId !== 23 && cate.cateId !== 22
  );
  const discountCategories = productCate.filter((cate) =>
    [22, 14, 15, 16, 17, 18, 19, 20].includes(cate.cateId)
  );
  //布林值
  const [selectedCategories, setSelectedCategories] = useState([]);

  //useContext
  // const { selectedCategories, setSelectedCategories, handleCategoryChange } =
  //   useProductCategories();
  // console.log(selectedCategories);
  // // 當分類選擇變化時，更新分類
  // const handleCategorySelectContext = (category_id) => {
  //   setSelectedCategories([...selectedCategories, category_id]);
  // };

  //互動用selectedCategory
  //UI點擊服類
  const [selectedCategory, setSelectedCategory] = useState(null);
  //儲存父類ID，決定顯示哪些子ID
  const [activeParentCategories, setActiveParentCategories] = useState(
    new Set()
  );
  // 基于 activeParentCategories 中的父分类ID，过滤出其下的子分类。
  const filteredSubcategories = productCate.filter((cate) =>
    activeParentCategories.has(cate.parentId)
  );
  // 點擊父類顯示子類UI
  const handleCategorySelect = (cateId) => {
    const newActiveParentCategories = new Set(activeParentCategories);
    if (newActiveParentCategories.has(cateId)) {
      newActiveParentCategories.delete(cateId);
    } else {
      newActiveParentCategories.add(cateId);
    }
    setActiveParentCategories(newActiveParentCategories);
    setSelectedCategory(cateId);
  };

  // 子类别,父类别 ID 列表
  const childCategoryIds = [8, 9, 10, 11, 12, 13, 21];
  const parentCategoryIds = [1, 2, 3, 4, 5, 6, 7]; //
  const parentChildMap = {
    // 父类别和子类别的映射
    1: [],
    2: [],
    3: [8, 9, 10, 11, 21],
    4: [],
    5: [],
    6: [12, 13],
    7: [],
  };
  //係向分類checkBox狀態
  const handleCategoryCheckboxChange = (cateId) => {
    setSelectedCategories((prev) => {
      let newCategories = [...prev];
      const currentIndex = prev.indexOf(cateId);

      if (currentIndex === -1) {
        // 如果当前分类未被选中，添加
        if (childCategoryIds.includes(cateId)) {
          // 添加子类别时，移除对应的父类别
          Object.keys(parentChildMap).forEach((parentId) => {
            if (parentChildMap[parentId].includes(cateId)) {
              newCategories = newCategories.filter(
                (id) => id !== parseInt(parentId)
              );
            }
          });
          newCategories.push(cateId);
        } else if (parentCategoryIds.includes(cateId)) {
          // 添加父类别前，确保没有其子类别已被选中
          const hasChildSelected = parentChildMap[cateId].some((childId) =>
            newCategories.includes(childId)
          );
          if (!hasChildSelected) {
            newCategories.push(cateId);
          }
        }
      } else {
        // 已选中，则移除
        newCategories.splice(currentIndex, 1);

        // 检查是否需要重新添加父类别
        if (childCategoryIds.includes(cateId)) {
          const parentId = Object.keys(parentChildMap).find((pId) =>
            parentChildMap[pId].includes(cateId)
          );
          if (
            parentId &&
            !parentChildMap[parentId].some((childId) =>
              newCategories.includes(childId)
            )
          ) {
            // 如果这个父类别的其他子类别都没有被选中，则重新添加父类别
            newCategories.push(parseInt(parentId));
          }
        }
      }

      return newCategories;
    });
  };

  // 處理價格範圍變更
  const handlePriceChange = (value, type) => {
    setPriceRange((prev) => ({ ...prev, [type]: value }));
  };
  const handleKeyDown = (e, type) => {
    if (e.key === "Enter") {
      setPriceRange({ min: "", max: "" });
      e.preventDefault(); // 按 Enter 鍵後將該輸入框的值設為空字符串
    }
  };
  //------------detailSideBar--End-------//

  const changePage = (event, value) => {
    console.log("Changing page to:", value);
    setPage(value);
  };

  const router = useRouter();
  const { categoryFromDetail } = router.query;
  // console.log(categoryFromDetail);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    perpage,
    price_gte: priceRange.min || "",
    price_lte: priceRange.max || "",
    category_id: categoryFromDetail || "",
    rating: "",
    order: orderby.order,
    sort: orderby.sort,
  });

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      price_gte: priceRange.min || "",
      price_lte: priceRange.max || "",
      rating: rating > 0 ? rating : "",
      page: page,
      category_id: selectedCategories.join(","),
      order: orderby.order,
      sort: orderby.sort,
    }));
  }, [rating, page, priceRange, selectedCategories, orderby]);

  useEffect(() => {
    if (router.isReady) {
      console.log("isReady", router.isReady, "query", router.query);
      setQueryParams((prev) => ({
        ...prev,
        category_id: categoryFromDetail ? categoryFromDetail : "",
      }));
    }
  }, [router.isReady]);

  // 请求产品数据
  useEffect(() => {
    const getProducts = async () => {
      const searchParams = new URLSearchParams(queryParams).toString();
      const url = `http://localhost:3005/api/products?${searchParams}`;
      console.log(url);
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === "success") {
          setProducts(data.data.products);
          setPageCount(Math.ceil(data.data.totalRecords / queryParams.perpage));
          setTotal(data.data.totalRecords);
          setProductCate(data.data.categories);
          setCategoryCounts(data.data.categoryCounts);
          setMayLikeProducts(data.data.mayLikeProducts);
        } else {
          console.log("请求状态不是 'success'");
        }
      } catch (e) {
        console.error("请求产品数据失败:", e);
      }
    };

    getProducts();
  }, [queryParams]); // queryParams 作为 useEffect 的依赖

  const [reviewCount, setReviewCount] = useState(0);
  const TotalRow = total;
  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div
        className={`container d-flex justify-content-center ${styles.wrapper} ${styles.Top40}`}
      >
        <div className={`${styles.sideBar}`}>
          {/* <ProductSidebarCate /> */}
          {/* <ProductSidebarDiscount
            DisCountCategories={discountCategories}
            handleCategoryClick={handleCategoryClick}
          /> */}
          <ProductSidebarDetail
            onClick={handleResetRating}
            priceRange={priceRange}
            handleKeyDown={handleKeyDown}
            price_gte={priceRange.min}
            price_lte={priceRange.max}
            rating={rating}
            hoverRating={hoverRating}
            handleStartRating={handleStartRating}
            handleStartHoverRating={handleStartHoverRating}
            handlePriceChange={handlePriceChange}
            filteredSubcategories={filteredSubcategories}
            productCate={normalCategories}
            selectedCategory={selectedCategory}
            handleCategorySelect={handleCategorySelect}
            handleCategoryCheckboxChange={handleCategoryCheckboxChange}
            selectedCategories={selectedCategories}
            resetFilters={resetFilters}
            categoryCounts={categoryCounts}
          />

          <ProductSidebarNew mayLikeProducts={mayLikeProducts} />
        </div>
        <div className={`${styles.productW}`}>
          <div className="mainDiscount">
            {/* <div className={`${styles.DiscountTitleMain}`}>
              <h4 className={`${styles.DiscountTitle}`}>限時特惠商品</h4>
            </div> */}
            {/* <div className={`${styles.DiscountBoxMain}`}> */}
            {/* <div className={`${styles.DiscountBox}`}>
                <img src="/index-images/Herosection02.png" alt="" />
              </div> */}
            <div className={`${styles.ProductFilter} pt-sm-4 pt-0`}>
              <ProductFilter
                onShowGrid={showGrid}
                onShowList={showList}
                activeButton={activeButton}
                TotalRow={TotalRow}
                setOrderby={setOrderby}
              />
            </div>
            {/* </div> */}
          </div>
          <div className={`d-flex ${styles.productCard1}`}>
            {products.map((item) => (
              <div key={item.id}>
                <Link
                  href={`/product/${item.id}`}
                  className="text-decoration-none"
                >
                  {" "}
                  {/* You can style this <a> tag as needed */}
                  <ProductCard02
                    className={`mx-sm-2 mx-0`}
                    id={item.id}
                    img={item.image_urls}
                    category_id={item.category_id}
                    name={item.product_name}
                    description={item.product_description}
                    price={item.product_price}
                    disPrice={item.discount_price}
                    average_rating={item.average_rating}
                  />
                </Link>
              </div>
            ))}
          </div>
          <div className="justify-content-center d-flex mt-5">
            <Pagination
              count={pageCount}
              page={page}
              onChange={changePage} // 使用新的 changePage 函数
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
