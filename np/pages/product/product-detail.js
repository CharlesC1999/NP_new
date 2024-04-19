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
import SideBarTop from "@/components/product/sideBar/SideBarCategory";
import SideBarDetailFiltet from "@/components/product/sideBar/SideBarDetailFilter";
import Breadcrumbs from "@/components/Breadcrumbs";

// import productCard from '@/components/product/productCard.js'
export default function ProductDetail() {
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
              <div>
                <SideBarTop />
              </div>
              <div className={`side-bar02`}>
                <SideBarDetailFiltet />
              </div>
            </div>
            <div className={`${style["right-main"]} d-flex flex-column`}>
              <div
                className={`${style["main-product"]} d-flex flex-sm-row flex-column justify-content-center`}
              >
                <div className={`${style["product-pic"]} d-flex flex-column`}>
                  <div className={`${style["p-img"]}`}>
                    <img
                      className={`${style["object-fit"]}`}
                      src="/images/products-image/Rectangle 48.png"
                      alt
                    />
                  </div>
                  <ul
                    className={`${style["sliders"]} position-relative d-flex flex-row align-items-center justify-content-between my-3`}
                  >
                    <li
                      className={`${style["prov-pic"]} position-absolute d-flex align-items-center justify-content-center`}
                    >
                      <svg
                        className={`w-6 h-6 text-gray-800 dark:text-white`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m15 19-7-7 7-7"
                        />
                      </svg>
                    </li>
                    <li className={`${style["pic-item"]}`}>
                      <img
                        className={`${style["object-fit"]}`}
                        src="/images/products-image/Rectangle 51.png"
                        alt
                      />
                    </li>
                    <li className={`${style["pic-item"]}`}>
                      <img
                        className={`${style["object-fit"]}`}
                        src="/images/products-image/Rectangle 51.png"
                        alt
                      />
                    </li>
                    <li className={`${style["pic-item"]}`}>
                      <img
                        className={`${style["object-fit"]}`}
                        src="/images/products-image/Rectangle 51.png"
                        alt
                      />
                    </li>
                    <li className={`${style["pic-item"]}`}>
                      <img
                        className={`${style["object-fit"]}`}
                        src="/images/products-image/Rectangle 51.png"
                        alt
                      />
                    </li>
                    <li
                      className={`${style["next-pic"]} position-absolute d-flex align-items-center justify-content-center`}
                    >
                      <svg
                        className={`w-6 h-6 text-gray-800 dark:text-white`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m9 5 7 7-7 7"
                        />
                      </svg>
                    </li>
                  </ul>
                </div>
                <div className={`${style["product-text"]} d-flex flex-column`}>
                  <div className={`${style["h3"]} mb-3`}>
                    台灣無刺虱目魚肚X5片
                  </div>
                  <p className={`${style["p"]} my-2`}>
                    以純海水放養的虱目魚，無土味且營養價值高。產地位於紅樹林溼地，水中含豐富有機質及浮游生物，提供充分的天然養份。生態養殖虱目魚活動力高，因而肉質極富彈性，肉色偏粉紅，是老饕心中的夢幻滋味。v
                  </p>
                  <div className={`${style["d-price"]}`}>$100</div>
                  <div className={`${style["price"]}`}>$320</div>
                  <div
                    className={`${style["star-row"]} d-flex flex-row my-2 align-items-center justify-content-between`}
                  >
                    <div
                      className={`${style["star"]} pe-2 d-flex flex-row align-items-center justify-content-between`}
                    >
                      <div>
                        <i className={`fa-solid fa-star`} />
                      </div>
                      <div className={`${style["star-text"]} ps-2 `}>
                        (125則評論)
                      </div>
                    </div>
                    <a
                      className={`${style["favorite-btn"]} ${style["icon-link"]} `}
                    >
                      <i className={`fa-regular fa-heart`} />
                    </a>
                  </div>
                  <input
                    className={`${style["amount"]} ps-4 my-2`}
                    type="number"
                    defaultValue={1}
                  />
                  <button
                    type="submit"
                    className={`${style["buy-btn"]}  my-2 btn btn-outline-success`}
                  >
                    <span className={``}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        class="aBitMargin mobile-none"
                      >
                        <path
                          fill="none"
                          stroke="#50BF8B"
                          stroke-width="2"
                          d="M5 5h17l-2 9H7L4 2H0m7 12l1 4h13m-2 5a1 1 0 1 1 0-2a1 1 0 0 1 0 2ZM9 23a1 1 0 1 1 0-2a1 1 0 0 1 0 2Z"
                        />
                      </svg>
                    </span>
                    &nbsp;&nbsp;加入購物車
                  </button>
                </div>
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
                  <div className={`${style["detail-list"]}flex-column`}>
                    <div className={`d-flex flex-column`}>
                      <h5 className={`${style["h5"]}`}>商品簡介</h5>
                      <p className={`${style["detail-text"]}`}>
                        以純海水放養的虱目魚，無土味且營養價值高。產地位於紅樹林溼地，水中含豐富有機質及浮游生物，提供充分的天然養份。生態養殖虱目魚活動力高，因而肉質極富彈性，肉色偏粉紅，是老饕心中的夢幻滋味。
                      </p>
                    </div>
                    <div
                      className={`${style["big-truck-text-box"]} d-flex flex-column`}
                    >
                      <h5 className={`${style["h5"]}`}>配送說明</h5>
                      <div
                        className={`${style["truck-text-box"]} d-flex flex-row pb-3`}
                      >
                        <div className={`${style["truck-titel"]} me-5`}>
                          寄送時間
                        </div>
                        <div className={`${style["truck-text"]}`}>
                          預計訂單成立後7個工作天內送達不含週六日及國定假日。如廠商有約定日將於約定日期內送達，約定日期需於訂單成立後14天內。
                        </div>
                      </div>
                      <div
                        className={`${style["truck-text-box"]} d-flex flex-row pb-3`}
                      >
                        <div className={`${style["truck-titel"]} me-5`}>
                          送貨方式
                        </div>
                        <div className={`${style["truck-text"]}`}>
                          透過宅配或是郵局送達。消費者訂購之商品若經配送兩次無法送達，再經本公司以電話與E-mail均無法聯繫逾三天者，本公司將取消該筆訂單，並且全額退款。
                        </div>
                      </div>
                      <div
                        className={`${style["truck-text-box"]} d-flex flex-row pb-3`}
                      >
                        <div className={`${style["truck-titel"]} me-5`}>
                          送貨範圍
                        </div>
                        <div className={`${style["truck-text"]}`}>
                          限台灣本島地區。注意！收件地址請勿為郵政信箱。若有台灣本島以外地區送貨需求，收貨人地址請填台灣本島親友的地址。
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${style["p-comment"]}flex-column`}>
                    <div className={`d-flex flex-column`}>
                      <h5 className={`${style["h5"]}`}>評論</h5>
                      <div className={`d-flex flex-row align-items-center`}>
                        <div className={`img`}>
                          <img src alt />
                        </div>
                        <div className={`${style["user-name"]} px-2`}>
                          abc123
                        </div>
                      </div>
                      <div>
                        <div className={`${style["star"]} my-2`}>
                          <span className={`pe-2`}>2024/04/04</span>★★★★☆
                        </div>
                      </div>
                      <p className={`${style[""]} mb-3`}>
                        以純海水放養的虱目魚，無土味且營養價值高。產地位於紅樹林溼地，水中含豐富有機質及浮游生物，提供充分的天然養份。生態養殖虱目魚活動力高，因而肉質極富彈性，肉色偏粉紅，是老饕心中的夢幻滋味。
                      </p>
                      <div className={`${style["detail-text"]}`}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        <span className={`px-2`}>5</span>
                      </div>
                    </div>
                  </div>
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
                        src="/images/
                            products-image/egg.png"
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
                          <FontAwesomeIcon icon={`fa-heart`} color="#5BF8B" />
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
