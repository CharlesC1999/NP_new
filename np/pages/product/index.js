//React
import React, { useState, useEffect } from "react";
import Link from "next/link";

// 然後在你的代碼中使用 `NextLink` 來代替 `Link`。

//fontAwsome

//components
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard02 from "@/components/product/ProductCard02";
import ProductCardList from "@/components/product/ProductCardList";
import ProductFilter from "@/components/product/ProductFilter";
import Footer from "@/components/Footer";
import HeaderComponent from "@/components/Header";
import Pagination from "@/components/pagination";

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

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const url = "http://localhost:3005/api/products";

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data); // 日志输出以便调试和验证数据结构

      // 确保数据结构与后端匹配，且检查数据状态
      if (data.status === "success" && Array.isArray(data.data)) {
        setProducts(data.data); // 假设 data.data 直接是产品数组
      } else {
        console.log("回傳的資料型態必須是陣列且请求状态为 'success'");
      }
    } catch (e) {
      console.error("请求产品数据失败:", e);
    }
  };

  //樣式2出事渲染執行一次
  useEffect(() => {
    //初次渲染時執行此函式
    getProducts();
  }, []);

  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div
        className={`container d-flex justify-content-center ${styles.wrapper} ${styles.Top40}`}
      >
        <div className={`${styles.sideBar} me-5`}>
          <ProductSidebarCate />

          <ProductSidebarDetail />

          <ProductSidebarNew />
        </div>
        <div
          className={`${styles.productW} ms-sm-3 ms-0 d-flex justify-content-center flex-column`}
        >
          <div className="mainDiscount">
            <div className={`${styles.DiscountTitleMain}`}>
              <h4 className={`${styles.DiscountTitle}`}>限時特惠商品</h4>
            </div>
            <div className={`${styles.DiscountBoxMain}`}>
              <div className={`${styles.DiscountBox}`}>
                <img src="/index-images/Herosection02.png" alt="" />
              </div>
              <div className={`pt-sm-4 pt-0`}>
                <ProductFilter
                  onShowGrid={showGrid}
                  onShowList={showList}
                  activeButton={activeButton}
                />
              </div>
            </div>
          </div>
          <div
            className={`d-flex ${styles.productCard1} justify-content-between`}
          >
            {products.map((item) => (
              <div key={item.id}>
                <Link href={`/product/${item.id}`}>
                  {" "}
                  {/* You can style this <a> tag as needed */}
                  <ProductCard02
                    id={item.id}
                    img={item.image_urls}
                    category_id={item.category_id}
                    name={item.product_name}
                    description={item.product_description}
                    price={item.product_price}
                    average_rating={item.average_rating}
                  />
                </Link>
              </div>
            ))}
          </div>
          <div className="justify-content-center d-flex">
            <Pagination />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
