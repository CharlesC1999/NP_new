// import React from "react";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles4 from "./shopStyle4.module.css";
import styles from "@/components/header.module.scss";
import stylesFooter from "../../components/footer.module.css";
import { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import HeaderSetting from "@/styles/headerSetting.module.scss";
// import { useAuth } from "@/hooks/use-auth";

import toast, { Toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

import axiosInstance from "@/services/axios-instance";

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

  // -----------------------------接收linepay資料
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [result, setResult] = useState({
    returnCode: "",
    returnMessage: "",
  });
  // const auth = useAuth();

  const handleConfirm = async (transactionId) => {
    const res = await axiosInstance.get(
      `/cartList/confirm?transactionId=${transactionId}&orderId=${router.query.orderId}`
    );

    // console.log(data);
    console.log(res.data);

    if (res.data.status === "success") {
      toast.success("付款成功");
      console.log("Checkout successful:", res.data.status);

      localStorage.removeItem("dataCoupon666");
      localStorage.removeItem("itemsCard666");
      localStorage.removeItem("productItem666");
      localStorage.removeItem("finalPriceAfterDiscount55666");
    } else {
      toast.error("付款失敗");
    }

    if (res.data.data) {
      setResult(res.data.data);
      console.log(res.data.data);
    }

    // 處理完畢，關閉載入狀態
    setIsLoading(false);
  };

  // confirm回來用的
  useEffect(() => {
    if (router.isReady) {
      // 這裡確保能得到router.query值
      console.log(router.query);
      // http://localhost:3000/order?transactionId=2022112800733496610&orderId=da3b7389-1525-40e0-a139-52ff02a350a8
      // 這裡要得到交易id，處理伺服器通知line pay已確認付款，為必要流程
      // TODO: 除非為不需登入的交易，為提高安全性應檢查是否為會員登入狀態
      const { transactionId, orderId } = router.query;

      // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)
      if (!transactionId || !orderId) {
        // 關閉載入狀態
        setIsLoading(false);
        // 不繼續處理
        return;
      }

      // 向server發送確認交易api
      handleConfirm(transactionId);
    }

    // eslint-disable-next-line
  }, [router.isReady]);

  useEffect(() => {
    localStorage.removeItem("dataCoupon666");
    localStorage.removeItem("itemsCard666");
    localStorage.removeItem("productItem666");
    localStorage.removeItem("finalPriceAfterDiscount55666");
  }, []);
  return (
    <div className={HeaderSetting.mobileAdjust}>
      <div className={HeaderSetting.headerSetting}>
        <Header />
      </div>
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
            href="http://localhost:3000"
          >
            <h3
              className={`${styles4.h3} fw-bold `}
              style={{ marginBottom: "0" }}
            >
              返回首頁
            </h3>
          </a>
          <a
            className={`${styles4.keepbuy}  d-flex justify-content-center align-items-center`}
            style={{ marginBottom: "0", textDecoration: "none" }}
            type="submit"
            href="http://localhost:3000"
          >
            <h3
              className={`${styles4.h3} fw-bold`}
              style={{ marginBottom: "0" }}
            >
              繼續購物
            </h3>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ShopCart4;
