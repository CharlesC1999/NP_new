import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import shopStyles from "./shopStyle1.module.css";
import styles from "@/components/header.module.scss";
import JumpOut from "@/styles/cart/cartJumpOut.module.scss";
import stylesFooter from "../../components/footer.module.css";
import HeaderSetting from "@/styles/headerSetting.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { RiDiscountPercentLine } from "react-icons/ri";
import { Link } from "react-router-dom";
// 購物車用到的主鍵
import Header from "@/components/Header";
import Footer from "../../components/footer";
import Navbar from "@/components/shopcart/Navbar";
import Class from "@/components/shopcart/Class";
import Commodity from "@/components/shopcart/Commodity";
import CouponC from "@/components/shopcart/couponC";

// 加上context鉤子
import { useCart } from "@/hooks/use-cart";

// 綠色勾勾
import Check from "@/components/checkbox-custom/CheckBoxCustom";

// 用來關、開優惠券的按鈕
const JumpOutCoupon = ({ onClose, onSelect }) => {
  const [couponsData, setCouponsData] = useState([]);
  // 抓會員localstorage資料
  const [userData, setUserData] = useState("");

  useEffect(() => {
    // 組件渲染後立即執行的effect，檢查LocalStorage中是否有資料
    const forShowCoupon = localStorage.getItem("userData");
    if (forShowCoupon) {
      // 如果LocalStorage中有資料，則將其轉換為JavaScript物件並存入state中
      setUserData(JSON.parse(forShowCoupon));
    }
  }, []);

  const member = userData.id;
  // console.log(userData);
  console.log(member);

  useEffect(() => {
    const params = {
      member,
    };
    console.log(params); // 全部篩選的條件
    getCoupoon(params);
  }, [member]);

  const getCoupoon = async (params) => {
    const searchParams = new URLSearchParams(params);
    const url = `http://localhost:3005/api/cartGetCoupon/getCouponsDetail/?${searchParams.toString()}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      // 為了要確保資料是陣列，所以檢查後再設定
      if (data && data.status === "success") {
        setCouponsData(data.data.couponsSql); // 更新課程數據
      }
      return data; // 返回數據
    } catch (e) {
      console.error("Failed to fetch classes:", e);
      return {};
    }
  };

  useEffect(() => {
    getCoupoon();
  }, []);
  // 用來點旁邊關閉
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  console.log("氣屁氣", couponsData);

  // 新增點擊事件
  const handleSelectCoupon = (couponsData) => {
    onSelect(couponsData); // 调用从外部传入的 onSelect 函数
  };

  // 彈出畫面
  return (
    <div className={JumpOut.jumpOutWrapper} onClick={handleClose}>
      <div className={JumpOut.jumpOutContainer}>
        <header className={`h2 text-dark ${JumpOut.titleText}`}>
          <RiDiscountPercentLine size={36} color="#50bf8b" />
          請選擇優惠券
        </header>
        <section className={JumpOut.mainArea}>
          {couponsData.map((couponsData, index) => (
            <CouponC
              couponDetail={couponsData}
              key={index}
              Index={index}
              className={JumpOut.CouponList}
              onSelect={handleSelectCoupon} // 传递处理函数到每个 CouponC
            />
          ))}
        </section>
      </div>
    </div>
  );
};

const ShopCart1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("所有分類");
  const [showFullScreen, setShowFullScreen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (showFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showFullScreen]);

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

  const { totalItems, totalPrice, totalProduct, totalProductPrice } = useCart();

  // 設定可控元件使用優惠券
  // const CouponOptions = ["滿千折扣50元", "全館折扣20元", "不使用優惠券"];

  // const data = [
  //   {
  //     id: 1,
  //     name: "滿千折扣10元",
  //     disPrice: 10,
  //   },
  //   {
  //     id: 2,
  //     name: "全館折扣50元",
  //     disPrice: 50,
  //   },
  //   {
  //     id: 3,
  //     name: "不使用優惠券",
  //     disPrice: 0,
  //   },
  // ];
  // const [coupon, setCoupon] = useState(data.name);
  // console.log(coupon);

  // const [discount, setDiscount] = useState(0);

  // 之前的優惠券不會用到-----------
  // const handleDiscount = (e) => {
  //   const selectedID = parseInt(e.target.value); // Make sure to parse the ID to a number
  //   const selectedCoupon = data.find((coupon) => coupon.id === selectedID); // Use find, not filter
  //   setCoupon(selectedCoupon); // Update the coupon state with the selected coupon object
  // };
  // // const finalPrice= if()

  // console.log(totalPrice);
  // console.log(totalProductPrice);

  // const [finalPrice, setFinalPrice] = useState(totalPrice + totalProductPrice);
  // const discountAmount = coupon ? coupon.disPrice : 0;
  // console.log(finalPrice);
  // useEffect(() => {
  //   if (finalPrice !== false) {
  //     // 如果 finalPrice 不是 false，计算最终价格
  //     const discountAmount = coupon ? coupon.disPrice : 0;
  //     const calculatedFinalPrice =
  //       totalPrice + totalProductPrice - discountAmount;
  //     // 获取当前优惠券的折扣金额

  //     setFinalPrice(
  //       isNaN(calculatedFinalPrice)
  //         ? totalPrice + totalProductPrice
  //         : calculatedFinalPrice
  //     );
  //     console.log(totalPrice, totalProductPrice, finalPrice, "價格");
  //     // 计算并更新最终价格
  //   }
  // }, [coupon, totalPrice, totalProductPrice, finalPrice]);
  // //

  // useEffect(() => {
  //   const couponData = window.localStorage.getItem("coupon666");
  //   if (couponData) {
  //     setCoupon(JSON.parse(couponData));
  //   }
  // }, []);
  // //setItem
  // useEffect(() => {
  //   if (coupon) {
  //     window.localStorage.setItem("coupon666", JSON.stringify(coupon));
  //   }
  // }, [coupon]);

  // console.log(finalPrice);

  // ----------------------------------------------------
  // 去抓儲存在localstorage的使用者
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // 從 localStorage 獲取 userData
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      // 解析 JSON 字符串回物件
      const userData = JSON.parse(storedData);
      // 更新狀態以保存用戶 ID
      setUserId(userData.id);
    }
  }, []);
  console.log("userId", userId);
  // console.log(couponsData);

  // 這邊處理子元件點擊的優惠券
  const [selectedCoupon, setSelectedCoupon] = useState([]);

  // console.log(selectedCoupon);
  // 設定儲存優惠券在localstorage中
  useEffect(() => {
    const data = window.localStorage.getItem("dataCoupon666");
    if (data) {
      setSelectedCoupon(JSON.parse(data));
    }
  }, []);
  //setItem
  useEffect(() => {
    if (selectedCoupon.length > 0) {
      window.localStorage.setItem(
        "dataCoupon666",
        JSON.stringify(selectedCoupon)
      );
    }
  }, [selectedCoupon]);
  const handleCouponSelect = (couponData) => {
    setSelectedCoupon([couponData]);
    console.log("Selected coupon:", couponData);
    console.log(selectedCoupon);
    setShowFullScreen(false); // 关闭模态框
  };

  // const [finalPrice2, setFinalPrice2] = useState(
  //   totalPrice + totalProductPrice
  // );

  // console.log(finalPrice2);

  // 把折扣金額提出來------
  const [discountAmount2, setDiscountAmount2] = useState(0); // State to hold the discount amount

  useEffect(() => {
    if (selectedCoupon.length > 0) {
      const discount = Number(selectedCoupon[0].discount_amount);
      setDiscountAmount2(discount);
    }
  }, [selectedCoupon]);

  console.log(typeof discountAmount2);

  console.log(discountAmount2);
  // const displayText =
  //   discountAmount2 > 1 ? `${discountAmount2}元` : `${discountAmount2} 折扣`;

  // console.log(typeof displayText)(有分減掉、乘法用)
  const displayText =
    discountAmount2 > 1 ? `${discountAmount2}元` : `${discountAmount2} 折`;

  // 提取折扣数字的方法(有分減掉、乘法用)
  const numericValue = parseFloat(displayText.match(/-?\d+\.?\d*/)[0]);

  console.log(typeof numericValue); // 输出 "number"
  console.log(numericValue);

  const displayText2 =
    discountAmount2 > 1
      ? `${discountAmount2}元`
      : `${
          discountAmount2.toString().endsWith("5")
            ? discountAmount2 * 100
            : discountAmount2 * 10
        } 折`;
  console.log(discountAmount2);
  console.log(displayText2);
  // if (discountAmount < 1) {
  //   return `${
  //     discountAmount.endsWith("5")
  //       ? discountAmount * 100
  //       : discountAmount * 10
  //   } 折`;
  // } else {
  //   return `${parseInt(discountAmount)} 元`;
  // }

  // 把購買低消費金額提出來------
  const [minimumConsumption, setMinimumConsumption] = useState(0); //   minimumConsumption

  useEffect(() => {
    if (selectedCoupon.length > 0) {
      const consumption = Number(selectedCoupon[0].minimum_spend);
      setMinimumConsumption(consumption);
    }
  }, [selectedCoupon]);

  console.log(minimumConsumption);

  const finalPrice2 = totalPrice + totalProductPrice;
  console.log(finalPrice2);

  // 判斷優惠卷是使用乘法、除法並計算(若小於1用*，大於1用減法)

  let finalPriceAfterDiscount;

  // 檢查是否有折價券 (假設 numericValue 是折價券的值)
  if (numericValue && numericValue > 0) {
    if (finalPrice2 >= minimumConsumption) {
      // 如果滿足最低消費，根據 numericValue 的值應用不同的優惠
      if (numericValue < 1) {
        // 如果 numericValue 小於 1，視為折扣率，用乘法
        finalPriceAfterDiscount = finalPrice2 * numericValue;
      } else {
        // 如果 numericValue 大於等於 1，視為具體金額，用減法
        finalPriceAfterDiscount = finalPrice2 - numericValue;
      }
      // 將最終價格四捨五入到最接近的整數
      finalPriceAfterDiscount = Math.round(finalPriceAfterDiscount);
      // 或者，四捨五入保留兩位小數
      // finalPriceAfterDiscount = Number(finalPriceAfterDiscount.toFixed(2));
    } else {
      // 如果不滿足最低消費，顯示原價
      finalPriceAfterDiscount = finalPrice2;
    }
  } else {
    // 如果沒有折價券，顯示原價
    finalPriceAfterDiscount = finalPrice2;
  }

  console.log(finalPriceAfterDiscount);

  // 儲存最終價格到localstorage中
  useEffect(() => {
    localStorage.setItem(
      "finalPriceAfterDiscount55666",
      finalPriceAfterDiscount
    );
    console.log("Saved to localStorage:", finalPriceAfterDiscount);
  }, [finalPriceAfterDiscount]);
  return (
    <div className={HeaderSetting.mobileAdjust}>
      <div className={HeaderSetting.headerSetting}>
        <Header />
      </div>

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
            className={`${shopStyles.pay} d-flex justify-content-between mt-3`}
            style={{ width: "500px" }}
          >
            <div className=" d-flex">
              {/* <div className="pt-1"> <Check/></div> */}

              <label htmlFor="" className={`${shopStyles.fs} `}>
                使用折價券{" "}
              </label>
            </div>
            {/* 這裡 是之前優惠券 */}
            {/* <select
              className="form-select form-select-sm "
              // aria-label="Small select example "
              style={{ width: "150px" }}
              value={coupon ? coupon.id : ""}
              onChange={handleDiscount}
            >
              <option value="">使用優惠券</option>
              {data.map((v) => {
                return (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                );
              })}
            </select> */}

            <button
              onClick={() => {
                setShowFullScreen(!showFullScreen);
              }}
              className={shopStyles.try}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#50bf8b"
                  d="M22 4.25A2.25 2.25 0 0 0 19.75 2h-5.466a3.25 3.25 0 0 0-2.299.953l-8.5 8.51a3.25 3.25 0 0 0 .004 4.596l4.462 4.455a3.255 3.255 0 0 0 4.596-.001l.094-.094a5.5 5.5 0 1 1 7.777-7.779l.63-.63A3.25 3.25 0 0 0 22 9.712zm-6.5 2.752a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0m4.668 12.105a4.5 4.5 0 1 0-1.06 1.06l2.612 2.613a.75.75 0 1 0 1.06-1.06zM19.5 16.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
                />
              </svg>
            </button>
            {showFullScreen && (
              <JumpOutCoupon
                onClose={() => setShowFullScreen(false)}
                onSelect={handleCouponSelect}
              />
            )}
          </div>

          {/* 檢查優惠券 內容 */}
          {/* {selectedCoupon.map((coupon, index) => (
            <div key={index}>
              <p>ID: {coupon.coupon__i_d}</p>
              <p>Selected Coupon: {coupon.c_name}</p>
              <p>最低消費: {coupon.minimum_spend}</p>
              <p>Valid Until: {coupon.valid_end_date}</p>
              <p>折扣金額: {coupon.discount_amount}</p>
            </div>
          ))} */}
          {/* <p>${discountAmount}</p> */}
          {/*  */}
          {/* <div>{coupon}</div> */}
          <div
            className={`${shopStyles.pay} d-flex justify-content-between mt-2 pt-2`}
            style={{ width: "500px" }}
          >
            {/* 折扣 */}
            <p className={`${shopStyles.fs} `}>優惠券折扣:</p>
            <h5 className="pt-1"> {displayText2}</h5>
            {/* 測試用優惠券折扣  <h5 className="pt-1">
              {coupon ? coupon.disPrice : 0}
            </h5> */}
          </div>
          {/* 實際折扣為{displayText} */}
          {/* <h5>優惠券折扣 : </h5> */}
          {/* <h5>最低消費 : ${minimumConsumption}</h5> */}
          <div
            className={`${shopStyles.pay} d-flex justify-content-between`}
            style={{ width: "500px" }}
          >
            <p className={`${shopStyles.fs} `}>運費 :</p>
            <h5 className="ps-5">$0元</h5>
          </div>
          <div
            className={`${shopStyles.pay} d-flex justify-content-between `}
            style={{ width: "500px" }}
          >
            <p className={`${shopStyles.fs} `}>訂單合計:</p>

            <h5>${finalPriceAfterDiscount}元</h5>
          </div>

          {/*  檢查用<h5>折扣後價格: {finalPriceAfterDiscount}</h5> */}
          <h5>
            {finalPrice2 < minimumConsumption && (
              <p style={{ color: "#50bf8b" }}>
                此優惠券使用須滿足最低消費金額: {minimumConsumption}
              </p>
            )}
          </h5>
          <div
            className={`${shopStyles.pay2}  d-flex justify-content-center py-4`}
            style={{ width: "100%", borderTop: "1px solid #d9d9d9" }}
          >
            <a
              href="http://localhost:3000"
              className={`${shopStyles.keepbuy} d-flex justify-content-center align-items-center`}
              type="submit"
              style={{}}
            >
              <h3 className="fw-bold pt-1">繼續購物</h3>
            </a>
            <a
              href="http://localhost:3000/cart/cart-list"
              className={`ms-4 ${shopStyles.button} d-flex justify-content-center align-items-center`}
              // type="submit"
              style={{
                backgroundColor: "#78cea6",
                color: "#ffffff",
                border: "1px solid #78cea6",
                textDecoration: "none",
              }}
            >
              <h3 className="fw-bold pt-1">送出</h3>
            </a>
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
        <div
          className=" mt-5  d-flex justify-content-center align-items-center"
          style={{
            border: "1px solid #d9d9d9",
            width: "350px",
            height: "50px",
          }}
        >
          {/* <div className="col py-2"> */}
          <div
            className={`${shopStyles.fb}  ps-3 pb-2 col py-2 `}
            style={{
              marginLeft: "40px",
            }}
          >
            使用折價券 :
          </div>
          {/* 這裡是之前優惠券 */}
          {/* <select
            className="form-select form-select-sm me-4"
            // aria-label="Small select example "
            style={{ width: "130px" }}
            value={coupon ? coupon.id : ""}
            onChange={handleDiscount}
          >
            <option value="">使用優惠券</option>
            {data.map((v) => {
              return (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              );
            })}
          </select> */}
          <button
            onClick={() => {
              setShowFullScreen(!showFullScreen);
            }}
            className={shopStyles.try}
            style={{ marginRight: "80px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="#50bf8b"
                d="M22 4.25A2.25 2.25 0 0 0 19.75 2h-5.466a3.25 3.25 0 0 0-2.299.953l-8.5 8.51a3.25 3.25 0 0 0 .004 4.596l4.462 4.455a3.255 3.255 0 0 0 4.596-.001l.094-.094a5.5 5.5 0 1 1 7.777-7.779l.63-.63A3.25 3.25 0 0 0 22 9.712zm-6.5 2.752a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0m4.668 12.105a4.5 4.5 0 1 0-1.06 1.06l2.612 2.613a.75.75 0 1 0 1.06-1.06zM19.5 16.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0"
              />
            </svg>
          </button>
          {showFullScreen && (
            <JumpOutCoupon
              onClose={() => setShowFullScreen(false)}
              onSelect={handleCouponSelect}
            />
          )}
        </div>

        <article
          className={`${shopStyles.send} ${shopStyles.article} d-flex justify-content-center align-items-center py-2 `}
        >
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center flex-column ">
              <span className={`${shopStyles.fs} ${shopStyles.fb} `}>
                訂單合計:
              </span>
              <span className={`${shopStyles.fc} fs-4 pe-3`}>
                {/* {combinedTotal} */}
                {/* {discountAmount ? (
                  <h5> ${totalPrice - discountAmount}元 </h5>
                ) : (
                  <h5> {totalPrice}元</h5>
                )} */}
                <h5>${finalPriceAfterDiscount}元</h5>
                {/* {finalPrice ? ()} */}
              </span>
            </div>
            <div className="col">
              <a
                href="http://localhost:3000/cart/cart-list"
                className={`${shopStyles.button} ms-4 mt-1 ps-4 pt-1`}
                style={{ display: "inline-block", textDecoration: "none" }}
              >
                <h3 className="fw-bold pt-1">送出</h3>
              </a>
            </div>
          </div>
        </article>
        {/* </form> */}
        {/* </div> */}
      </div>
      <Footer />
    </div>
  );
};
export default ShopCart1;
