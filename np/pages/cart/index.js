import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import shopStyles from "./shopStyle1.module.css";
import styles from "@/components/header.module.scss";
import stylesFooter from "../../components/footer.module.css";
import HeaderSetting from "@/styles/headerSetting.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// 購物車用到的主鍵
import Header from "@/components/Header";
import Footer from "../../components/footer";
import Navbar from "@/components/shopcart/Navbar";
import Class from "@/components/shopcart/Class";
import Commodity from "@/components/shopcart/Commodity";

// 加上context鉤子
import { useCart } from "@/hooks/use-cart";

// 綠色勾勾
import Check from "@/components/checkbox-custom/CheckBoxCustom";

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

  const { totalItems, totalPrice, totalProduct, totalProductPrice } = useCart();

  // 設定可控元件使用優惠券
  // const CouponOptions = ["滿千折扣50元", "全館折扣20元", "不使用優惠券"];

  const data = [
    {
      id: 1,
      name: "滿千折扣10元",
      disPrice: 10,
    },
    {
      id: 2,
      name: "全館折扣50元",
      disPrice: 50,
    },
    {
      id: 3,
      name: "不使用優惠券",
      disPrice: 0,
    },
  ];
  const [coupon, setCoupon] = useState(data.name);
  console.log(coupon);

  // const [discount, setDiscount] = useState(0);

  const handleDiscount = (e) => {
    const selectedID = parseInt(e.target.value); // Make sure to parse the ID to a number
    const selectedCoupon = data.find((coupon) => coupon.id === selectedID); // Use find, not filter
    setCoupon(selectedCoupon); // Update the coupon state with the selected coupon object
  };
  // const finalPrice= if()

  //
  const [finalPrice, setFinalPrice] = useState(totalPrice + totalProductPrice);
  const discountAmount = coupon ? coupon.disPrice : 0;
  console.log(finalPrice);
  useEffect(() => {
    if (finalPrice !== false) {
      // 如果 finalPrice 不是 false，计算最终价格
      const discountAmount = coupon ? coupon.disPrice : 0;
      const calculatedFinalPrice =
        totalPrice + totalProductPrice - discountAmount;
      // 获取当前优惠券的折扣金额

      setFinalPrice(
        isNaN(calculatedFinalPrice)
          ? totalPrice + totalProductPrice
          : calculatedFinalPrice
      );
      console.log(totalPrice, totalProductPrice, finalPrice, "gdesgsd");
      // 计算并更新最终价格
    }
  }, [coupon, totalPrice, totalProductPrice, finalPrice]);
  //

  useEffect(() => {
    const couponData = window.localStorage.getItem("coupon666");
    if (couponData) {
      setCoupon(JSON.parse(couponData));
    }
  }, []);
  //setItem
  useEffect(() => {
    if (coupon) {
      window.localStorage.setItem("coupon666", JSON.stringify(coupon));
    }
  }, [coupon]);

  // console.log(finalPrice);

  // 存到LOCALSTORAGE
  // const [discountAmount,setDiscountAmount]=useState([])
  // c;

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
            <select
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
            </select>
          </div>
          {/*  */}
          {/* <div>{coupon}</div> */}
          <div
            className={`${shopStyles.pay} d-flex justify-content-between mt-2 pt-2`}
            style={{ width: "500px" }}
          >
            {/* 折扣 */}
            <p className={`${shopStyles.fs} `}>折扣金額:</p>
            <h5 className="pt-1">
              ${/* {} */}
              {coupon ? coupon.disPrice : 0}元
            </h5>
          </div>
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
            {/* {discountAmount ? (
              <h5> ${totalPrice - discountAmount}元 </h5>
            ) : (
              <h5> {totalPrice}元</h5>
            )} */}
            <h5>${finalPrice}元</h5>

            {/* <h5> {discountAmount}元 </h5> */}

            {/* <h5>${finalPrice !== false ? finalPrice : totalPrice}</h5> */}
          </div>
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
          {/* <div className="row"> */}
          {/* 使用折價券 */}
          {/* <div className="pay d-flex justify-content" style={{ width: "100%" }}> */}
          {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkboxNoLabel"
                    defaultValue=""
                    aria-label="..."
                  />
                  <label className="me-2" style={{ fontSize: "16px" }}>
                    使用折價券{" "}
                  </label>
                </div> */}
          <select
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
          </select>
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
                <h5>${finalPrice}元</h5>
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
