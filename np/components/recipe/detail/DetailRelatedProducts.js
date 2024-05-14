import { use, useEffect, useState } from "react";
import CheckBoxCustom from "@/components/checkbox-custom/RecipeCheckbox.js/RecipeCheckBox";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DetailRelatedProducts.module.scss";
// 給checkbox的icon
import { FaCheck } from "react-icons/fa6";
// sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
// 導向登入頁
import { useRouter } from "next/router";
// 加入購物車
import { useCart } from "@/hooks/use-cart";

import { set } from "lodash";
// import { utimesSync } from "fs";

export default function DetailRelatedProducts({ recipeID = "" }) {
  // 加入購物車
  const { addToCartAry } = useCart();
  // 未登入時導向登入頁
  const router = useRouter();
  //給checkbox的狀態
  const [checkAll, setCheckAll] = useState(true);

  // 最一開始從後端得到的相關商品列表
  const [initProductsFetch, setInitProductsFetch] = useState([]);

  // 從後端取得相關商品
  const getRelatedProducts = async () => {
    const url = `http://localhost:3005/api/recipes/${recipeID}/relatedProducts`;
    const res = await fetch(url);
    const data = await res.json();

    if (Array.isArray(data.data.relatedProducts)) {
      setInitProductsFetch(data.data.relatedProducts);
    } else {
      console.log("伺服器回傳資料類型錯誤，無法設定到狀態中");
    }
  };

  // 用來map的相關產品state
  //增加商品數量，在後面的useEffect中設定state
  const [products, setProducts] = useState([]);

  // 處理勾選商品
  const handleCheck = (id) => {
    const nextProducts = products.map((v) => {
      if (v.id === id) {
        return { ...v, checked: !v.checked };
      } else {
        return v;
      }
    });
    setProducts(nextProducts);
  };

  // 全選的核取方塊用的事件處理函式
  const handleToggleCheckedAll = (e) => {
    setCheckAll(!checkAll);
    const nextProducts = products.map((v, i) => {
      // 強制所有選項物件的checked屬性，和全選的e.target.checked完全一致
      return { ...v, checked: e.target.checked };
    });

    // 狀態修改通用第3步
    setProducts(nextProducts);
  };

  // 增加商品數量
  const increaseItem = (id) => {
    const newItems = products.map((v) => {
      if (v.id === id && v.qty === 0) {
        return { ...v, checked: true, qty: v.qty + 1 };
      } else if (v.id === id) {
        return { ...v, qty: v.qty + 1 };
      } else {
        return v;
      }
    });
    setProducts(newItems);
  };

  //減少商品數量
  const decreaseItem = (id) => {
    const newItems = products.map((v) => {
      if (v.id === id && v.qty === 1) {
        return { ...v, checked: false, qty: v.qty - 1 };
      } else if (v.id === id) {
        return { ...v, qty: v.qty - 1 };
      } else {
        return v;
      }
    });
    setProducts(newItems);
  };

  //各項商品的小計
  const subtotal = (qty, price) => {
    return qty * price;
  };

  // 先過濾出有被有被勾選的
  const finalProducts = products.filter((v) => v.checked);

  // 檢查商品是否有折扣，有折扣就用折扣價格，沒有就用原價，用這組陣列去做加總以及加入購物車
  const filterPrice = finalProducts.map((v) => {
    if (v.discount_price === null) {
      return { ...v };
    } else {
      return { ...v, price: v.discount_price };
    }
  });

  // 加總數量與價格
  const totalItems = filterPrice.reduce((acc, v) => acc + v.qty, 0);
  const totalPrice = filterPrice.reduce((acc, v) => acc + v.price * v.qty, 0);

  // 抓取登入狀態
  // 取得localStorage裡的token，用來發起req帶入headers
  const [LStoken, setLStoken] = useState("");

  const getTokenInLS = () => {
    setLStoken(localStorage.getItem("token"));
  };

  // 判斷是否有登入，有id就是有登入
  const [userId, setUserId] = useState("");

  // 串接上後端並把token傳進headers用來解碼
  // !!! 從localStorage取出token後，帶入headers來解碼，若要用postman測試記得Authorization也要選Bearer Token並放入加密的token
  const getUser = async () => {
    const url = "http://localhost:3005/api/member-profile/check";
    const tokenforheaders = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${LStoken}`,
      },
    };
    try {
      const res = await fetch(url, tokenforheaders);
      const data = await res.json();
      setUserId(data.data.user.id);
    } catch (e) {
      console.log(e);
    }
  };

  // 按下加入購物車時顯示是否登入
  const checkLogin = async () => {
    if (userId) {
      // 先執行加入購物車
      addToCartAry(filterPrice);
      // 完成加入購物車後再顯示訊息
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "成功加入購物車",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "請先登入才能加入購物車",
        text: "是否前往登入頁面?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "是",
        cancelButtonText: "否",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/member/login");
        }
      });
    }
  };

  // 初次渲染頁面時取得相關商品，但要先取得食譜的ID (透過props傳進來的)
  useEffect(() => {
    getRelatedProducts();
  }, [recipeID]);

  // 得到後端的相關商品資料後再設定給最終要用來map的state
  useEffect(() => {
    // 擴充相關商品的數量屬性跟checked屬性
    const initProducts = initProductsFetch.map((v) => {
      return { ...v, qty: 1, checked: true };
    });
    setProducts(initProducts);
  }, [initProductsFetch]);

  // !!! 用useEffect監聽products的每個checked，如果都有checked就設定全選是true
  useEffect(() => {
    if (products.every((v) => v.checked)) {
      setCheckAll(true);
    }
  }, [products]);

  // 取得token用來驗證是否登入
  useEffect(() => {
    getTokenInLS();
  }, []);

  // 得到token後執行getUser()去後端解碼token並根據得到的user資料查詢資料庫並將資料設定給userId
  useEffect(() => {
    getUser();
  }, [LStoken]);

  return (
    <>
      <div className={`row ${styles["related-products-section"]}`}>
        <div
          className={`col-12 ${styles["figma-h4"]} text-center text-xxl-start ${styles["related-ingredient-title-m"]}`}
        >
          相關食材
        </div>
        <div
          className={`col-12 col-xxl-10 ${styles["related-products"]} mx-auto`}
        >
          <div
            className={`${styles["related-products-top"]} d-flex justify-content-between`}
          >
            <div className={`${styles["top-left"]} d-flex align-items-end`}>
              {/* // *** checkAll */}
              <div className={styles["checkbox-wrapper"]}>
                <FaCheck
                  style={{ "font-size": "16px" }}
                  className={`${styles["fa-check"]} ${
                    products.every((v) => v.checked) ? "d-block" : "d-none"
                  }`}
                />
                <input
                  disabled={products.some((v) => v.qty === 0) ? true : false}
                  onClick={(e) => {
                    handleToggleCheckedAll(e);
                  }}
                  checked={checkAll}
                  type="checkbox"
                  className={`${styles["test"]} ${
                    products.every((v) => v.checked) ? styles.checked : " "
                  }`}
                />
              </div>
              <p className={styles["check-all"]}>全選</p>
            </div>
            <div className={`${styles["top-right"]} d-xxl-flex d-none`}>
              <p>數量</p>
              <p>小計</p>
            </div>
          </div>
          {products.map((v, i) => {
            return (
              <div
                className={`${styles["related-products-middle"]} d-flex flex-column flex-xxl-row justify-content-between`}
              >
                <div
                  className={`col-12 col-xxl-8 ${styles["middle-left"]} d-flex align-items-center`}
                >
                  {/* // *** checkbox */}
                  <div className={styles["checkbox-wrapper"]}>
                    <FaCheck
                      style={{ "font-size": "16px" }}
                      className={`${styles["fa-check"]} ${
                        v.checked ? "d-block" : "d-none"
                      }`}
                    />
                    <input
                      disabled={v.qty === 0 ? true : false}
                      onChange={() => {
                        handleCheck(v.id);
                      }}
                      checked={v.checked}
                      type="checkbox"
                      className={`${styles["test"]} ${
                        v.checked ? styles.checked : ""
                      }`}
                    />
                  </div>
                  <div className={styles["product-pic"]}>
                    <img
                      className="w-100 h-100 object-fit-cover"
                      src={`/images/products/${v.image}`}
                      alt=""
                    />
                  </div>
                  <div className={styles["product-description"]}>
                    <p
                      className={`${styles["product-name"]} ${styles["figma-h5"]}`}
                    >
                      {v.name}
                    </p>
                    <div
                      className={`${styles["portion-and-price"]} d-flex gap-2`}
                    >
                      {/* <p className={styles["portion"]}>份量</p> */}
                      {/* <p className={styles["divider"]}>|</p> */}
                      <p className={styles["price"]}>
                        單價 ${" "}
                        {v.discount_price === null ? v.price : v.discount_price}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles["middle-right"]} d-flex align-items-center`}
                >
                  <div
                    className={`${styles["quantity"]} d-flex align-items-center`}
                  >
                    <button
                      disabled={v.qty === 0 ? true : false}
                      onClick={() => {
                        decreaseItem(v.id);
                      }}
                      type="button"
                      className={`btn btn-primary ${styles["figma-h5"]}`}
                    >
                      -
                    </button>
                    <p className={styles["figma-h6"]}>{v.qty}</p>
                    <button
                      onClick={() => {
                        increaseItem(v.id);
                      }}
                      type="button"
                      className={`btn btn-primary ${styles["figma-h5"]}`}
                    >
                      +
                    </button>
                  </div>
                  <p className={`${styles["subtotal"]} ${styles["figma-h6"]}`}>
                    {`$ ${subtotal(
                      v.qty,
                      v.discount_price === null ? v.price : v.discount_price
                    )}`}
                  </p>
                </div>
              </div>
            );
          })}
          <div
            className={`${styles["related-products-bottom"]} d-flex flex-column flex-xxl-row justify-content-end align-items-center gap-3`}
          >
            <p className={styles["total"]}>
              共選擇 {totalItems} 項商品，共計 ${totalPrice} 元
            </p>
            <button
              onClick={() => {
                checkLogin();
              }}
              type="button"
              className="btn btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
              >
                <mask
                  id="mask0_2921_33112"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={15}
                  height={15}
                >
                  <path
                    d="M14.5 0.662109H0.5V14.6621H14.5V0.662109Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_2921_33112)">
                  <path
                    d="M14.5 2.41211H2.9745L2.95 2.20736C2.89986 1.78177 2.69531 1.38937 2.37512 1.10455C2.05493 0.819739 1.64137 0.662309 1.21283 0.662109H0.5V1.82878H1.21283C1.35571 1.8288 1.49361 1.88125 1.60038 1.97619C1.70716 2.07114 1.77536 2.20196 1.79208 2.34386L2.71667 10.2002C2.7668 10.6258 2.97136 11.0182 3.29155 11.303C3.61174 11.5878 4.0253 11.7453 4.45383 11.7454H12.1666V10.5788H4.45383C4.31086 10.5788 4.17289 10.5262 4.06611 10.4311C3.95932 10.3361 3.89117 10.2051 3.87458 10.0631L3.79817 9.4121H13.2376L14.5 2.41211ZM12.2623 8.24543H3.66108L3.11217 3.57878H13.1041L12.2623 8.24543Z"
                    fill="#F7F8F5"
                  />
                  <path
                    d="M4.58317 14.6617C5.2275 14.6617 5.74984 14.1394 5.74984 13.495C5.74984 12.8507 5.2275 12.3284 4.58317 12.3284C3.93884 12.3284 3.4165 12.8507 3.4165 13.495C3.4165 14.1394 3.93884 14.6617 4.58317 14.6617Z"
                    fill="#F7F8F5"
                  />
                  <path
                    d="M10.4167 14.6617C11.061 14.6617 11.5833 14.1394 11.5833 13.495C11.5833 12.8507 11.061 12.3284 10.4167 12.3284C9.77238 12.3284 9.25 12.8507 9.25 13.495C9.25 14.1394 9.77238 14.6617 10.4167 14.6617Z"
                    fill="#F7F8F5"
                  />
                </g>
              </svg>
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
