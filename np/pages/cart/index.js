import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import shopStyles from "./shopStyle1.module.css";
import styles from "@/components/header.module.scss";
import stylesFooter from "../../components/footer.module.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "../../components/footer";
import Navbar from "@/components/shopcart/Navbar";
import Class from "@/components/shopcart/Class";
import Commodity from "@/components/shopcart/Commodity";
// 購物車用到的主鍵
const ShopCart1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("所有分類");
  const dropdownRef = useRef(null);

  let hasMargin = true;
  let isMobile = false;

  const menuItems = [
    { id: 1, name: "所有分類", href: "#", className: styles.selectionLink },
    { id: 2, name: "商品列表", href: "#", className: styles.selectionLink },
    { id: 3, name: "食譜精選", href: "#", className: styles.selectionLink },
    { id: 4, name: "精選課程", href: "#", className: styles.selectionLink },
    { id: 5, name: "講師陣容", href: "#", className: styles.selectionLink },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (name) => {
    setSelectedText(name);
    setIsOpen(false); // 关闭下拉菜单
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const classIndex = [
    { id: 0, count: 1, name: "肉桂捲初級班", price: 1500 },
    { id: 1, count: 1, name: "cake初級班", price: 1200 },
    { id: 2, count: 1, name: "肉捲初級班", price: 1000 },
  ];
  const [classData, classProductsData] = useState(classIndex);

  const prodcts = [
    { id: 0, count: 1, name: "肉桂捲", price: 1500 },
    { id: 1, count: 1, name: "meet", price: 1200 },
    { id: 2, count: 1, name: "肉捲", price: 1000 },
  ];
  const [productData, setProductsData] = useState(prodcts);
  // const [quantity,setQuantity] = useState(0)
  const increase = (id) => {
    // setQuantity(quantity + 1)
    const addProducts = classData.map((v, i) => {
      if (v.id === id) return { ...v, count: v.count + 1 };
      else return v;
    });

    classProductsData(addProducts);
  };

  const decrease = (id) => {
    // if(quantity>0){
    //   setQuantity(quantity - 1)
    // }
    const reduceProducts = classData.map((v, i) => {
      if (v.id === id && v.count > 0) return { ...v, count: v.count - 1 };
      else return v;
    });

    classProductsData(reduceProducts);
  };

  const remove = (id) => {
    const removeProduct = classData.filter((v, i) => {
      return v.id !== id;
    });

    classProductsData(removeProduct);
  };

  const productDataTotal = productData.reduce(
    (total, product) => total + product.count * product.price,
    0
  );
  const classDataTotal = classData.reduce(
    (total, product) => total + product.count * product.price,
    0
  );
  const combinedTotal = productDataTotal + classDataTotal;
  return (
    <>
      <Header />
      {/* 桌電size */}
      <div
        className={`container ${shopStyles.container2} ${shopStyles.desktop}`}
      >
        {/*  */}
        <Navbar />
        {/* 課程欄位 */}
        <Class />
        {/* 商品欄位 */}
        <Commodity />
        {/* 折價券、付款 */}
        <article
          className={`${shopStyles.article} d-flex justify-content-center align-items-center flex-column mt-5 mb-5`}
          style={{ maxWidth: 1440 }}
        >
          <div
            className={`${shopStyles.pay} d-flex justify-content-evenly mt-3`}
            style={{ width: "100%" }}
          >
            <p className={`${shopStyles.fs} pe-3`}>折價券</p>
            <h5 className="pt-2">$0元</h5>
          </div>
          {/*  */}
          <div
            className={`${shopStyles.pay} d-flex justify-content-evenly`}
            style={{ width: "100%" }}
          >
            <div className="form-check" style={{ marginLeft: 80 }}>
              <input
                className="form-check-input mt-2"
                type="checkbox"
                id="checkboxNoLabel"
                defaultValue=""
                aria-label="..."
              />
              <label htmlFor="" className={`${shopStyles.fs} pe-3`}>
                使用折價券{" "}
              </label>
            </div>
            <select
              className="form-select form-select-sm me-5"
              aria-label="Small select example "
              style={{ width: 100 }}
            >
              <option selected="">使用優惠券</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>
          </div>
          {/*  */}
          <div
            className={`${shopStyles.pay} d-flex justify-content-evenly mt-2 pt-2`}
            style={{ width: "100%" }}
          >
            <p className={`${shopStyles.fs} `}>折扣金額:</p>
            <h5 className="pt-1">$0元</h5>
          </div>
          <div
            className={`${shopStyles.pay} d-flex justify-content-evenly`}
            style={{ width: "100%" }}
          >
            <p className={`${shopStyles.fs} `}>運費 :</p>
            <h5 className="ps-5">$0元</h5>
          </div>
          <div
            className={`${shopStyles.pay} d-flex justify-content-evenly ms-3`}
            style={{ width: "100%" }}
          >
            <p className={`${shopStyles.fs} `}>訂單合計:</p>
            <h5>$2000元</h5>
          </div>
          <div
            className={`${shopStyles.pay2}  d-flex justify-content-center py-4`}
            style={{ width: "100%", borderTop: "1px solid #d9d9d9" }}
          >
            {/* <button  >
    繼續購物
  </button> */}
            <a
              href=""
              className={`${shopStyles.keepbuy} d-flex justify-content-center align-items-center`}
              type="submit"
              style={{}}
            >
              <h3 className="fw-bold pt-1">繼續購物</h3>
            </a>
            <button
              className={`ms-4 ${shopStyles.button}`}
              type="submit"
              style={{
                backgroundColor: "#78cea6",
                color: "#ffffff",
                border: "1px solid #78cea6",
              }}
            >
              <h3 className="fw-bold pt-1">送出</h3>
            </button>
          </div>
        </article>
        {/* </form> */}
        {/* </div> */}
      </div>
      {/* 手機size */}
      <div
        className={`${shopStyles.container2} ${shopStyles.mobile} container`}
      >
        {/*  */}
        <Navbar />
        {/* 課程欄位 */}
        {/* <main class="mt-5 mb-2 fw-bold fs-5" style="color: #50bf8b">商品</main> */}
        <Class />
        {/* 商品欄位 */}
        <Commodity />
        {/* 折價券、付款 */}
        <article
          className={`${shopStyles.send} ${shopStyles.article} d-flex justify-content-center align-items-center py-2 `}
        >
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center flex-column ">
              <span className={`${shopStyles.fs} ${shopStyles.fb} `}>
                結帳金額:
              </span>
              <span className={`${shopStyles.fc} fs-4 pe-3`}>
                {combinedTotal}
              </span>
            </div>
            <div className="col">
              <button
                className={`${shopStyles.button} ms-4 mt-1`}
                type="submit"
              >
                <h3 className="fw-bold pt-1">送出</h3>
              </button>
            </div>
          </div>
        </article>
        {/* </form> */}
        {/* </div> */}
      </div>
      <Footer />
    </>
  );
};
export default ShopCart1;
