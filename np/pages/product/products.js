import React from "react";
import { useState, useEffect } from "react";
import HeaderComponent from "@/components/header";
import Footer from "@/components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import style from "@/components/product/products.module.scss";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ProductMainPic from "@/components/product/productMainPic";
import ProductMainText from "@/components/product/productMainText";
import ProductSection01 from "@/components/product/ProductSection01";
import ProductSection02 from "@/components/product/ProductSection02";
import CateSidebar from "@/components/product/Cate-sidebar";
import NewSidebar from "@/components/product/New-sidebar";
import Filter from "@/components/product/Product-filter";

// import productCard from '@/components/product/productCard.js'

export default function ProductDetail() {
  return (
    <>
      <HeaderComponent />
      <main className={`my-5`}>
        <div
          className={`d-flex justify-content-center flex-column align-items-center`}
        >
          <div
            className={`d-flex flex-column flex-sm-row justify-content-center `}
          >
            <div
              className={`${style["left-side"]} d-flex flex-column d-none d-sm-flex`}
            >
              <div>
                <CateSidebar />
                <CateSidebar />
                <CateSidebar />
                <CateSidebar />
              </div>
              <div className={`side-bar02`}>
                <NewSidebar />
                <NewSidebar />
                <NewSidebar />
                <NewSidebar />
              </div>
            </div>
            <div className={`${style["right-main"]} d-flex flex-column`}>
              <div
                className={`${style["main-product"]} d-flex flex-sm-row flex-column justify-content-center`}
              >
                <ProductMainPic />
                <ProductMainText />
              </div>
              <div className={`${style["section2"]} m-3 m-sm-2`}>
                <div className={`d-flex flex-row my-4`}>
                  <button
                    className={`${style["detail-btn"]}  d-flex align-items-center justify-content-center detail-btn btn btn-outline-success me-4`}
                  >
                    商品簡介
                  </button>
                  <button
                    className={`${style["com-btn"]} d-flex align-items-center justify-content-center com-btn btn btn-outline-success`}
                  >
                    評論
                  </button>
                </div>
                <div className={`${style["p-detail"]} flex-column p-sm-5`}>
                  <ProductSection01 />
                  <ProductSection02 />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${style["section3"]} d-flex flex-column justify-content-center`}
          >
            <div className={`${style["mlike"]} d-flex flex-column my-4`}>
              <h5 className={`${style["h5"]} py-sm-4 mt-5 mt-sm-none`}>
                你可能喜歡
              </h5>
              <div className={`${style["line"]} d-sm-flex d-none`} />
              <ul
                className={`${style["product-list"]} d-flex flex-sm-row flex-wrap justify-content-between`}
              >
                <li>
                  <div className={`${style["product-card"]} my-4`}>
                    <div className={`${style["object-fit"]}`}>
                      <img
                        src="/images/products-image/egg.png"
                        alt="商品圖片"
                        className={`${style["product-image"]}`}
                      />
                    </div>
                    <div className={`${style["product-info"]}`}>
                      <h6 className={`${style["product-name"]} my-2`}>
                        超級雞蛋
                      </h6>
                      <div
                        className={`${style["product-rating"]} ${style["stars-row"]}  d-flex flex-row justify-content-sm-between  mb-3`}
                      >
                        <div className={`${style["star"]}`}>
                          ★
                          <span className={`${style["score"]} px-3`}>
                            (4.2)
                          </span>
                        </div>
                        <a className={`${style["favorite-btn"]} pe-3`}>
                          <i className={`fa-regular fa-heart`} />
                        </a>
                      </div>
                      <div
                        className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
                      >
                        <div className={`${style["price"]}`}>$500</div>
                        <div className={`d-flex flex-row align-items-center`}>
                          <div className={`${style["original-price"]} px-3`}>
                            $100
                          </div>
                          <a
                            className={`add-to-cart-btn justify-content-center d-flex align-items-center`}
                          >
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              color="#50BF8B"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={`${style["product-card"]} my-4`}>
                    <div className={`${style["object-fit"]}`}>
                      <img
                        src="/images/products-image/egg.png"
                        alt="商品圖片"
                        className={`${style["product-image"]}`}
                      />
                    </div>
                    <div className={`${style["product-info"]}`}>
                      <h6 className={`${style["product-name"]} my-2`}>
                        超級雞蛋
                      </h6>
                      <div
                        className={`${style["product-rating"]} ${style["stars-row"]}  d-flex flex-row justify-content-sm-between  mb-3`}
                      >
                        <div className={`${style["star"]}`}>
                          ★
                          <span className={`${style["score"]} px-3`}>
                            (4.2)
                          </span>
                        </div>
                        <a className={`${style["favorite-btn"]} pe-3`}>
                          <i className={`fa-regular fa-heart`} />
                        </a>
                      </div>
                      <div
                        className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
                      >
                        <div className={`${style["price"]}`}>$500</div>
                        <div className={`d-flex flex-row align-items-center`}>
                          <div className={`${style["original-price"]} px-3`}>
                            $100
                          </div>
                          <a
                            className={`add-to-cart-btn justify-content-center d-flex align-items-center`}
                          >
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              color="#50BF8B"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={`${style["product-card"]} my-4`}>
                    <div className={`${style["object-fit"]}`}>
                      <img
                        src="/images/products-image/egg.png"
                        alt="商品圖片"
                        className={`${style["product-image"]}`}
                      />
                    </div>
                    <div className={`${style["product-info"]}`}>
                      <h6 className={`${style["product-name"]} my-2`}>
                        超級雞蛋
                      </h6>
                      <div
                        className={`${style["product-rating"]} ${style["stars-row"]}  d-flex flex-row justify-content-sm-between  mb-3`}
                      >
                        <div className={`${style["star"]}`}>
                          ★
                          <span className={`${style["score"]} px-3`}>
                            (4.2)
                          </span>
                        </div>
                        <a className={`${style["favorite-btn"]} pe-3`}>
                          <i className={`fa-regular fa-heart`} />
                        </a>
                      </div>
                      <div
                        className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
                      >
                        <div className={`${style["price"]}`}>$500</div>
                        <div className={`d-flex flex-row align-items-center`}>
                          <div className={`${style["original-price"]} px-3`}>
                            $100
                          </div>
                          <a
                            className={`add-to-cart-btn justify-content-center d-flex align-items-center`}
                          >
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              color="#50BF8B"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className={`${style["product-card"]} my-4`}>
                    <div className={`${style["object-fit"]}`}>
                      <img
                        src="/images/products-image/egg.png"
                        alt="商品圖片"
                        className={`${style["product-image"]}`}
                      />
                    </div>
                    <div className={`${style["product-info"]}`}>
                      <h6 className={`${style["product-name"]} my-2`}>
                        超級雞蛋
                      </h6>
                      <div
                        className={`${style["product-rating"]} ${style["stars-row"]}  d-flex flex-row justify-content-sm-between  mb-3`}
                      >
                        <div className={`${style["star"]}`}>
                          ★
                          <span className={`${style["score"]} px-3`}>
                            (4.2)
                          </span>
                        </div>
                        <a className={`${style["favorite-btn"]} pe-3`}>
                          <FontAwesomeIcon icon={farHeart} color="#50BF8B" />
                        </a>
                      </div>
                      <div
                        className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
                      >
                        <div className={`${style["price"]}`}>$500</div>
                        <div className={`d-flex flex-row align-items-center`}>
                          <div className={`${style["original-price"]} px-3`}>
                            $100
                          </div>
                          <a
                            className={`add-to-cart-btn justify-content-center d-flex align-items-center`}
                          >
                            <i className={`fa-solid fa-cart-shopping`} />
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              color="#50BF8B"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div
                    className={`${style["product-card"]} ${style["last-card"]} my-4`}
                  >
                    <div className={`${style["object-fit"]}`}>
                      <img
                        src="/images/products-image/egg.png"
                        alt="商品圖片"
                        className={`${style["product-image"]}`}
                      />
                    </div>
                    <div className={`${style["product-info"]}`}>
                      <h6 className={`${style["product-name"]} my-2`}>
                        超級雞蛋
                      </h6>
                      <div
                        className={`${style["product-rating"]} ${style["stars-row"]}  d-flex flex-row justify-content-sm-between  mb-3`}
                      >
                        <div className={`${style["star"]}`}>
                          ★
                          <span className={`${style["score"]} px-3`}>
                            (4.2)
                          </span>
                        </div>
                        <a className={`${style["favorite-btn"]} pe-3`}>
                          <i className={`fa-regular fa-heart`} />
                        </a>
                      </div>
                      <div
                        className={`${style["product-price"]} d-flex flex-row justify-content-between align-items-center`}
                      >
                        <div className={`${style["price"]}`}>$500</div>
                        <div className={`d-flex flex-row align-items-center`}>
                          <div className={`${style["original-price"]} px-3`}>
                            $100
                          </div>
                          <a
                            className={`add-to-cart-btn justify-content-center d-flex align-items-center`}
                          >
                            <FontAwesomeIcon
                              icon={faCartShopping}
                              color="#50BF8B"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
