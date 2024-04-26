// import React from "react";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles4 from "./shopStyle4.module.css";
import styles from "@/components/header.module.scss";
import stylesFooter from "../../components/footer.module.css";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

const ShopCart4 = () => {
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
  return (
    <>
      <Header />
      <div className={styles4.middle}>
        <img src="/images/Frame 40128.png" alt="" />
        <h3 className="mt-4 fw-bold">訂單完成</h3>
        <div
          className="pay2 d-flex justify-content-center py-5"
          style={{ width: "100%" }}
        >
          <a
            className={`${styles4.return} me-2 d-flex justify-content-center align-items-center`}
            type="submit"
          >
            <h3 className={`${styles4.h3} fw-bold `}>返回首頁</h3>
          </a>
          <button className={`${styles4.keepbuy} ms-4`} type="submit">
            <h3 className={`${styles4.h3} fw-bold pt-1`}>繼續購物</h3>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ShopCart4;
