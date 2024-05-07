import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
//style
import "bootstrap/dist/css/bootstrap.min.css";
import style from "@/styles/Product/products.module.scss";

//components
import HeaderComponent from "@/components/header";
import Footer from "@/components/footer";
import ProductMainPic from "@/components/product/ProductMainPic";
import ProductMainText from "@/components/product/ProductMainText";
import ProductSection01 from "@/components/product/ProductSection01";
import ProductSection02 from "@/components/product/ProductSection02";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductMayLike from "@/components/product/ProductMayLike";
//推薦食譜component
import DetailRecommendedRecipe from "@/components/recipe/detail/RecommendedRecipe";
//sidebar components
import ProductSidebarCate from "@/components/product/sideBar/ProductSidebarCate";
import ProductSidebarNew from "@/components/product/sideBar/ProductSidebarNew";
import ProductSidebarDetail from "@/components/product/sideBar/ProductSidebarDetail";

export default function ProductDetail() {
  const [activeTab, setActiveTab] = useState("product");
  const [product, setProduct] = useState({
    id: 0,
    category_id: 0,
    product_name: "",
    product_description: "",
    product_price: 0,
    discount_price: null,
    upload_date: "",
    average_rating: 0,
    review_comments: [],
    image_urls: [],
    sort_orders: [],
  });
  //產品數量顯示
  const [categoryCounts, setCategoryCounts] = useState({});
  //條件用
  const [productCate, setProductCate] = useState([]);
  //解析ReviewDetails字串
  function parseReviewDetails(details) {
    return details.split(",").map((detail) => {
      const parts = detail.split("|");
      return {
        comment: parts[0],
        rating: parseInt(parts[1], 10),
        reviewerId: parseInt(parts[2], 10),
        createdAt: parts[3],
      };
    });
  }
  const normalCategories = productCate.filter(
    (cate) => cate.parentId === null && cate.cateId !== 23 && cate.cateId !== 22
  );
  //取得後端網址資料
  const getProduct = async (productId) => {
    try {
      const url = `http://localhost:3005/api/products/${productId}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data && data.status === "success" && data.data) {
        const formattedProduct = {
          ...data.data,
          review_comments: parseReviewDetails(data.data.review_details),
          image_urls: data.data.image_urls.split(","),
          sort_orders: data.data.sort_orders.split(",").map(Number),
        };
        setProductCate(data.categories);
        setCategoryCounts(data.categoryCounts);
        setProduct(formattedProduct);
      }
    } catch (e) {
      console.error("Error fetching product:", e);
    }
  };
  //動態路由需要router來確定是否收到值 1.isReady是布林值 2.query是回傳的id值
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      console.log("isReady", router.isReady, "query", router.query);
      // 確保能得從router.query到pid後，再向伺服器要求對應資料
      getProduct(router.query.productId);
    }
  }, [router.isReady]);

  if (!product || product.id === undefined) {
    console.log(product);
    return <div>Loading...</div>; // 或其他加载指示器
  }

  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <main className={`my-5`}>
        <div
          className={`d-flex justify-content-center flex-column align-items-center`}
        >
          <div
            className={`${style["MainContent"]} d-flex flex-column flex-sm-row justify-content-center `}
          >
            <div
              className={`${style["left-side"]} d-flex flex-column d-none d-sm-flex`}
            >
              <div className={`side-bar01`}>
                <ProductSidebarCate normalCategories={normalCategories} />
              </div>
              {/* <div className={`side-bar02`}>
                <ProductSidebarDetail />
              </div> */}
              <div className={`side-bar03`}>
                <ProductSidebarNew />
              </div>
            </div>
            <div
              className={`${style["right-main"]} d-flex flex-column ms-0 ms-sm-5 justify-content-center`}
            >
              <div
                className={`${style["main-product"]} d-flex flex-sm-row flex-column justify-content-center`}
              >
                <ProductMainPic image_urls={product.image_urls} />
                <ProductMainText
                  key={product.id}
                  id={product.id}
                  name={product.product_name}
                  description={product.product_description}
                  price={product.product_price}
                  discount_price={product.discount_price}
                  upload_date={product.upload_date}
                  average_rating={product.average_rating}
                  review_comments={product.review_comments}
                />
              </div>
              <div className={`${style["section2"]} my-3 m-sm-2`}>
                <div className={`d-flex flex-row my-4`}>
                  <button
                    className={`${style["detail-btn"]} d-flex align-items-center justify-content-center btn me-4`}
                    onClick={() => setActiveTab("product")} // 设置点击事件更新状态
                  >
                    商品簡介
                  </button>
                  <button
                    className={`${style["com-btn"]} d-flex align-items-center justify-content-center com-btn btn btn-outline-success`}
                    onClick={() => setActiveTab("review")} // 设置点击事件更新状态
                  >
                    評論
                  </button>
                </div>
                <div className={`${style["p-detail"]} flex-column p-sm-5`}>
                  {activeTab === "product" && (
                    <ProductSection01
                      description={product.product_description}
                    />
                  )}
                  {activeTab === "review" && (
                    <ProductSection02
                      review_comments={product.review_comments}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${style["section3"]} d-flex flex-column justify-content-center`}
          >
            <ProductMayLike />
          </div>
          <div
            className={`${style["recommended-recipe"]} d-flex flex-column my-4`}
          >
            <DetailRecommendedRecipe />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
