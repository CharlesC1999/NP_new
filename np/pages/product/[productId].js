import { useState, useEffect } from "react";
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
    category_id: "",
    product_name: "",
    product_description: "",
    product_price: 0,
    discount_price: "",
    product_stock: 0,
    coupon_id: 0,
    upload_date: "",
    valid: true,
  });

  const getProduct = async (productId) => {
    console.log("Product ID:", productId);
    try {
      const url = `http://localhost:3005/api/products/${productId}`;
      const res = await fetch(url);
      console.log(url);
      const data = await res.json();
      console.log(data);
      if (typeof data === "object" && data !== null) {
        setProduct(data.data.product);
        // console.log(product);
      }
    } catch (e) {
      console.log(e);
      // console.log(typeof data);
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
  // console.log(product);

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
                <ProductSidebarCate />
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
                <ProductMainPic />
                <ProductMainText
                  key={product.id}
                  id={product.id}
                  name={product.product_name}
                  description={product.product_description}
                  price={product.product_price}
                  discount_price={product.discount_price}
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
                  {activeTab === "review" && <ProductSection02 />}
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
