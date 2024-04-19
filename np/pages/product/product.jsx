import React ,{ useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/pages/product/product.module.css";
import CateSidebar from "@/components/product/Cate-sidebar";
import NewSidebar from "@/components/product/New-sidebar";
import ProductCard from "@/components/product/Product-card";
import ProductFilter from "@/components/product/Product-filter";


import Footer from "@/components/footer";


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

  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`container d-flex ${styles.wrapper} ${styles.Top40}`}>
                <div className={`${styles.sideBar}`}>
                    <div className={`${styles.sideBarBox}`}>
                        <div className={`${styles.sideTitle}`}>
                            <h5>分類</h5>
                        </div>
                        <div className={`${styles.line}`}></div>
                        <CateSidebar />
                        <CateSidebar />
                        <CateSidebar />
                        <CateSidebar />
                        <CateSidebar />
                    </div>
                    <div className={`${styles.sideBarBox}`}>
                        <div className={`${styles.sideTitle}`}>
                            <h5>篩選功能</h5>
                        </div>
                        <div className={`${styles.line}`}></div>
                        
                    </div>
                    <div className={`${styles.sideBarBox}`}>
                        <div className={`${styles.sideTitle}`}>
                            <h5>新品推薦</h5>
                        </div>
                        <div className={`${styles.line}`}></div>
                        <NewSidebar />
                        <NewSidebar />
                        <NewSidebar />
                    </div>
                </div>
                <div className={`${styles.productW}`}>
                    <div className="mainDiscount">       
                        <div className={`${styles.DiscountTitleMain}`}>
                            <h4 className={`${styles.DiscountTitle}`}>限時特惠商品</h4>
                        </div>
                        <div className={`${styles.DiscountBoxMain}`}>
                            <div className={`${styles.DiscountBox}`}>
                                <img src="/index-images/Herosection02.png" alt=""/>
                            </div>                              
                            <div className={`pt-4`}>
                                <ProductFilter
                                onShowGrid={showGrid}
                                onShowList={showList}
                                activeButton={activeButton}
                                /> 
                            </div>
                        </div>
                    </div>
                    <div className={`d-flex ${styles.productCard1}`}>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                    </div>
                </div>
        </div>

      <Footer/>
    </>
  );
}
