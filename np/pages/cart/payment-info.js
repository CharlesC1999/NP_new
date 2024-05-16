// import React from "react";
import styles3 from "./shopStyle3.module.css";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "@/components/header.module.scss";
import stylesFooter from "../../components/footer.module.css";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import HeaderSetting from "@/styles/headerSetting.module.scss";

import Footer from "../../components/footer";

import toast, { Toast, Toaster } from "react-hot-toast";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useCart } from "@/hooks/use-cart";
import axios from "axios";

const ShopCart3 = () => {
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

  // -----------------------------

  // 去抓存取在localStorage的資料
  // 抓課程資料
  const [items, setItems] = useState([]);

  useEffect(() => {
    // 从 localStorage 获取名为 'itemsCard666' 的值
    const storedItems = localStorage.getItem("itemsCard666");
    if (storedItems) {
      setItems(JSON.parse(storedItems)); // 解析字符串并设置状态
    }
    console.log(items);
  }, []);

  const items2 = items.filter((v) => {
    return v.checked;
  });
  console.log(items2);

  // 去抓存取在localStorage的資料
  // 抓商品資料

  const [productItems, setproductItems] = useState([]);

  useEffect(() => {
    // 从 localStorage 获取名为 'productItem666' 的值
    const storedItems = localStorage.getItem("productItem666");
    if (storedItems) {
      setproductItems(JSON.parse(storedItems)); // 解析字符串并设置状态
    }
  }, []);

  const productItems2 = productItems.filter((v) => {
    return v.checked;
  });
  console.log(productItems2);
  // 去抓存取在localStorage的資料
  //  抓使用得優惠券

  const [coupon, setCoupon] = useState({});

  useEffect(() => {
    const storedCoupon = localStorage.getItem("coupon666");
    if (storedCoupon) {
      setCoupon(JSON.parse(storedCoupon));
    }
  }, []);

  // 去抓存在localStorage的資料dataCoupon666

  const [dataCoupon, setDataCoupon] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("dataCoupon666");
    if (storedData) {
      setDataCoupon(JSON.parse(storedData));
    }
  }, []);

  console.log(dataCoupon);

  const dataCoupon2 = dataCoupon.map((v) => {
    return v.discount_amount;
  });
  console.log(dataCoupon2);

  // const dataCouponId = dataCoupon[0].coupon__i_d;
  // console.log(dataCouponId);
  const dataCouponId = dataCoupon.length > 0 ? dataCoupon[0].coupon__i_d : null;
  console.log(dataCouponId);

  const displayTexts = dataCoupon2.map((discountAmount) => {
    if (discountAmount < 1) {
      return `${
        discountAmount.endsWith("5")
          ? discountAmount * 100
          : discountAmount * 10
      } 折`;
    } else {
      return `${parseInt(discountAmount)} 元`;
    }
  });
  console.log(displayTexts);
  // 計算總金額
  // 去抓存全域鉤子的資料
  // 設定總額
  const { totalItems, totalPrice, totalProduct, totalProductPrice } = useCart();

  // 去抓localStorage付款方式的資料
  const [payMethod, setPayMethod] = useState("");

  useEffect(() => {
    const storedPayMethod = localStorage.getItem("paymentMethod");
    if (storedPayMethod) {
      const cleanPayMethod = storedPayMethod.replace(/^"|"$/g, "");
      setPayMethod(cleanPayMethod);
    }
  }, []);

  // 去抓localStorage總價的資料finalPriceAfterDiscount55666
  const [finalPriceAfterDiscount, setFinalPriceAfterDiscount] = useState(0);

  useEffect(() => {
    const storedFinalPrice = localStorage.getItem(
      "finalPriceAfterDiscount55666"
    );
    if (storedFinalPrice) {
      const cleanFinalPrice = storedFinalPrice.replace(/^"|"$/g, "");
      setFinalPriceAfterDiscount(cleanFinalPrice);
    }
  }, []);

  // 去抓存取在localStorage的資料
  // 抓取收件者姓名
  const [receiverName, setReceiverName] = useState(""); // 初始化为空字符串

  useEffect(() => {
    // 从 localStorage 获取名为 'inputNumber' 的值
    const storedName = localStorage.getItem("inputName1");
    if (storedName) {
      // 移除首尾可能的引号
      const cleanName = storedName.replace(/^"|"$/g, "");
      setReceiverName(cleanName); // 更新状态变量，确保不带引号
    }
  }, []);

  //  抓取手機資料
  const [phoneNumber, setPhoneNumber] = useState(""); // 初始化为空字符串

  useEffect(() => {
    // 从 localStorage 获取名为 'phoneNumber' 的值
    let storedPhoneNumber = localStorage.getItem("inputNumber");
    if (storedPhoneNumber) {
      // 移除字符串首尾可能的引号
      storedPhoneNumber = storedPhoneNumber.replace(/^"|"$/g, "");
      setPhoneNumber(storedPhoneNumber);
    }
  }, []);

  // 抓取收件者地址
  const [receiverAddress, setReceiverAddress] = useState(""); // 初始化为空字符串

  useEffect(() => {
    // 从 localStorage 获取名为 'inputAddress' 的值
    let storedAddress = localStorage.getItem("inputAddress1");
    if (storedAddress) {
      // 移除字符串首尾可能的引号
      storedAddress = storedAddress.replace(/^"|"$/g, "");
      setReceiverAddress(storedAddress);
    }
  }, []);

  // 點擊後彈出line支付 視窗、他點擊後會彈出視窗
  const MySwal = withReactContent(Swal);

  // const handlePaymentConfirmation = async (orderToLinePay) => {
  const [orderToLinePay, setOrderToLinePay] = useState("");

  // ---------------
  //  顯示訂單編號在ui測試用
  const [lineOrder, setLineOrder] = useState("");
  const [error, setError] = useState("");
  // const [finalPrice, setFinalPrice] = useState("");

  console.log("lineOrder", lineOrder);
  const allPrice = totalPrice + totalProductPrice;
  console.log(allPrice);
  console.log("coupon", coupon.disPrice);
  const finalPrice =
    coupon.disPrice !== undefined ? allPrice - coupon.disPrice : allPrice;
  console.log(finalPrice);

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

  // 處理表單提交事件
  const handleSubmit = async (event) => {
    // 阻擋表單預設行為
    event.preventDefault();

    const formData = {
      //  課程
      items: items2.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.qty,
        pricePerItem: item.price,
        totalPrice: item.price * item.qty,
      })),
      // 商品
      productItems: productItems2.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.qty,
        pricePerItem: item.price,
        totalProductPrice: item.price * item.qty,
      })),
      // 合計
      totalPrice: totalPrice + totalProductPrice || 0,
      // 優惠券id
      couponId: dataCouponId || 0,
      // 優惠券扣掉價格
      discountPrice: allPrice - finalPriceAfterDiscount || 0,
      // 最終價格
      finalPrice:
        totalPrice + totalProductPrice - (allPrice - finalPriceAfterDiscount) ||
        0,
      // 收件人
      receiverName: receiverName,
      // 手機
      phoneNumber: phoneNumber,
      // 地址
      receiverAddress: receiverAddress,
      // 付款方式
      paymentMethod: payMethod,
      // 會員id
      userId: userId,
    };

    // 发送数据到服务器
    try {
      const response = await fetch("http://localhost:3005/api/cartList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      console.log("服务器返回:", responseData);
      //
      if (responseData.status === "success") {
        setOrderToLinePay(responseData);
        setLineOrder(responseData.data.lineOrder);
        notifySA(responseData);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("提交表单错误:", error);
    }
  };

  // 接收到後端資料的後續處理、顯示
  // const [responseData, setResponseData] = useState(null);  // 用于存储后端数据的状态
  // const [error, setError] = useState('');  // 用于存储错误信息的状态

  const notifySA = async (orderToLinePay) => {
    MySwal.fire({
      // title: "",
      text: "確認付款？",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "是",
      confirmButtonColor: "#50bf8b",
      cancelButtonText: "否",
      reverseButtons: true,
    }).then((result) => {
      console.log("orderToLinePay", orderToLinePay);
      // console.log(lineOrder.id);
      if (result.isConfirmed) {
        const orderId = `orderId=${orderToLinePay.data.lineOrder.orderId}`;
        console.log("Is confirmed:", result.isConfirmed);
        fetch(`http://localhost:3005/api/cartList/reserve?${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(lineOrder),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            console.log("response", response);
            throw new Error("Network response was not ok");
          })
          .then((data) => {
            console.log("成功收到後端回傳的資料", data);
            window.location.href = data;
            console.log("Redirecting to LINE Pay:", data.paymentUrl);
            window.location.href = data.paymentUrl;
          })

          .catch((error) => {
            console.error("第二個按鈕", error);
          });
        // const url = `http://localhost:3005/api/cartList/reserve?${orderId}`;
        // console.log("Request URL:", url);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={HeaderSetting.mobileAdjust}>
        <div className={HeaderSetting.headerSetting}>
          <Header />
        </div>
        {/*  */}
        <div
          className={`${styles3.desktop}  ${styles3.container2}  container `}
        >
          <nav className={`pt-5 ${styles3.nav}`}>
            <div className={`${styles3.cir} ${styles3.circle1}`}>
              {/* <span>1</span> */}
              {/* <span>購物車</span> */}
            </div>
            <div className={`${styles3.line} ${styles3.line1}`} />
            <div className={`${styles3.cir} ${styles3.circle2}`}>
              {/* <span>2</span> */}
              {/* <span>填寫資料</span> */}
            </div>
            <div className={`${styles3.line}`} />
            <div className={`${styles3.cir} ${styles3.circle3}`} />
          </nav>
          {/* 課程欄位 */}
          <section
            className={`${styles3.section} ${styles3.mgt} mb-2 fw-bold `}
            style={{ color: "#50bf8b" }}
          >
            購物明細
          </section>
          <section className={`${styles3.ProductBorder} ${styles3.section}`}>
            <div className={`${styles3.topBar} row py-3`}>
              <div className={`${styles3.fc} col text-center`}>商品明細</div>
              <div className={`${styles3.fc} col text-center`}>單價</div>
              <div className={`${styles3.fc} col text-center`}>數量</div>
              <div className={`${styles3.fc} col text-center`}>小計</div>
              {/* <div className={`${styles3.fc} col text-center`}>庫存</div> */}
            </div>

            {items2.map((item, index) => (
              <div key={index} className="row py-2">
                <div className={`${styles3.fb} col text-center pt-2`}>
                  {item.className}
                </div>
                <div
                  className={`${styles3.fb} col d-flex align-items-center justify-content-center `}
                >
                  NT${item.price}
                </div>
                <div
                  className={`${styles3.fb} col d-flex align-items-center justify-content-center`}
                >
                  {item.qty}
                </div>
                <div
                  className={`${styles3.fb} col d-flex align-items-center justify-content-center`}
                >
                  NT${item.price * item.qty}
                </div>
                {/* <div
                  className={`${styles3.fb} col d-flex align-items-center justify-content-center`}
                >
                  NT${item.price * item.qty}
                </div> */}
              </div>
            ))}
            {productItems2.map((item, index) => (
              <div key={index} className="row py-2">
                <div className={`${styles3.fb} col text-center pt-2`}>
                  {item.name}
                </div>
                <div
                  className={`${styles3.fb} col d-flex align-items-center justify-content-center `}
                >
                  NT${item.price}
                </div>
                <div
                  className={`${styles3.fb} col d-flex align-items-center justify-content-center`}
                >
                  {item.qty}
                </div>
                <div
                  className={`${styles3.fb} col d-flex align-items-center justify-content-center`}
                >
                  NT${item.price * item.qty}
                </div>
                {/* <div
                  className={`${styles3.fb} col d-flex align-items-center justify-content-center`}
                >
                  有
                </div> */}
              </div>
            ))}
            <div
              className="row py-2 pt-3"
              style={{ borderTop: "1px solid #50bf8b" }}
            >
              <div className={`${styles3.fc} col text-center`}>合計</div>
              <div className={`${styles3.fc} col text-center`}></div>
              <div className={`${styles3.fc} col text-center`}></div>
              <div className={`${styles3.fc} col text-center`}>
                NT$ {allPrice}
              </div>
              {/* <div className={`${styles3.fc} col text-center`}>
                NT$ {totalPrice}
              </div> */}
            </div>
            <div className="row py-2 pt-3 pb-3">
              <div className={`${styles3.fc} col text-center`}>優惠券折抵</div>
              {/* <div className={`${styles3.fc} col text-center`}></div> */}
              <div className={`${styles3.fc} col text-center`}></div>
              <div
                className={`${styles3.fc} col text-center `}
                style={{ fontSize: "25PX" }}
              >
                -
              </div>
              <div
                className={`${styles3.fc} col d-flex align-items-center justify-content-center`}
                // style={{ paddingRight: "40PX" }}
              >
                NT${allPrice - finalPriceAfterDiscount}
                {/* NT${coupon.disPrice} */}
              </div>
            </div>

            {/* 計算使用優惠卷金額、折扣 */}
            {/* <div>
              {displayTexts.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div> */}

            <div
              className="row py-2 pt-3"
              style={{ borderTop: "1px solid #50bf8b" }}
            >
              <div className={`${styles3.fc} col text-center`}>訂單總額</div>
              <div className={`${styles3.fc} col text-center`}></div>
              <div className={`${styles3.fc} col text-center`}></div>
              {/* <div className={`${styles3.fc} col text-center`}></div> */}
              <div className={`${styles3.fc} col text-center`}>
                NT${finalPriceAfterDiscount}
                {/* 舊的折扣後金額NT$ {finalPrice} */}
              </div>
            </div>
          </section>
          {/* 商品欄位 */}
          <section
            className={`${styles3.section} ${styles3.ProductBorder} mt-4`}
          >
            <div className={`${styles3.topBar} row`}>
              <div
                className={`${styles3.section} ${styles3.mgt} mb-2 fw-bold pt-2`}
              >
                付款方式與運送方式
              </div>
            </div>

            <div className="row py-2">
              <div className={`${styles3.fb} pt-2 col-2`}>配送方式</div>
              <div className={`${styles3.fb} pt-2 col-2`}>宅配</div>
            </div>
            <div className="row py-2">
              <div className={`${styles3.fb} pt-2 col-2`}>付款方式</div>
              <div className={`${styles3.fb} pt-2 col-2`}>{payMethod}</div>
            </div>
            <div className="row py-2">
              <div className={`${styles3.fb} pt-2 col-2`}>收件者</div>
              <div className={`${styles3.fb} pt-2 col-2`}>{receiverName}</div>
            </div>
            <div className="row py-2">
              <div className={`${styles3.fb} pt-2 col-2`}>聯絡電話</div>
              <div className={`${styles3.fb} pt-2 col-2`}>{phoneNumber}</div>
            </div>
            <div className="row py-2">
              <div className={`${styles3.fb} pt-2 col-2`}>取貨地址</div>
              <div className="col-4 fb pt-2">{receiverAddress}</div>
            </div>
            <div className="row py-2">
              <div
                className={`${styles3.fb} pt-2 col d-flex align-items-center`}
              >
                <input type="checkbox" className="me-3" /> 我同意此購買資訊
              </div>
            </div>
          </section>

          {/*  */}
          {/* <p>Order ID: {lineOrder.orderId}</p>
          <p>Currency: {lineOrder.currency}</p>
          <p>Total Amount: {lineOrder.amount}</p> */}

          {/* 折價券、付款 */}
          <div
            className={`${styles3.pay2} d-flex justify-content-center py-4`}
            style={{ width: "100%" }}
          >
            <a
              href="http://localhost:3000/cart/cart-list"
              className={`${styles3.keepbuy} ${styles3.a} d-flex justify-content-center align-items-center mt-1`}
              // type="submit"
              style={{}}
            >
              <h3 className="fw-bold pt-1">返回上一頁</h3>
            </a>
            <button
              className={`${styles3.button} ms-4 mt-1 `}
              type="submit"
              style={{
                backgroundColor: "#78cea6",
                color: "#ffffff",
                border: "1px solid #78cea6",
              }}
              // onClick={handlePaymentConfirmation}
              onClick={() => {
                // handlePaymentConfirmation();
                // handleSecondAction();
              }}
            >
              <h3 className="fw-bold pt-1">送出訂單</h3>
            </button>
          </div>
          {/* </form> */}
          {/* </div> */}
        </div>
        {/* 手機size */}
        <div className={`${styles3.mobile}  ${styles3.container2} container`}>
          {/*  */}

          <nav className={`pt-3 ${styles3.nav}`}>
            <div className={`${styles3.cir} ${styles3.circle1}`}></div>
            <div className={`${styles3.line} `} />
            <div className={`${styles3.cir} ${styles3.circle2}`}></div>
            <div className={`${styles3.line}`} />
            <div className={`${styles3.cir} ${styles3.circle3}`} />
          </nav>
          {/* 課程欄位 */}
          <section
            className={`${styles3.ProductBorder} ${styles3.section} mt-5`}
            style={{ width: 345, marginTop: 100 }}
          >
            <div className={`${styles3.topBar} row`}>
              <div className={`${styles3.fc} col`}>購物明細</div>
            </div>
            {items2.map((item, index) => (
              <div key={index} className="row py-2 mt-1">
                <div className={`${styles3.fc} row ps-4`}>{item.className}</div>
                <div
                  className={`${styles3.fb} row ps-4`}
                  style={{ fontSize: 12 }}
                >
                  課程時間: {item.classDate}{" "}
                  {/* 假设 sn 字段用来存储日期信息 */}
                </div>
                <div className="row mt-4">
                  <div className="col-3 border ms-2">有庫存</div>
                  <div className={`${styles3.fb} col fw-bold`}>
                    ${item.price} x {item.qty}
                  </div>
                </div>
              </div>
            ))}
            {productItems2.map((item, index) => (
              <div key={index} className="row py-2 mt-1">
                <div className={`${styles3.fc} row ps-4`}>{item.name}</div>
                <div
                  className={`${styles3.fb} row ps-4`}
                  style={{ fontSize: 12 }}
                >
                  {/* 課程時間: {item.sn} 假设 sn 字段用来存储日期信息 */}
                </div>
                <div className="row mt-4">
                  <div className="col-3 border ms-2">有庫存</div>
                  <div className={`${styles3.fb} col fw-bold`}>
                    ${item.price} x {item.qty}
                  </div>
                </div>
              </div>
            ))}

            <div
              className="row py-2 pt-3"
              style={{ borderTop: "1px solid #78cea6" }}
            >
              <div className={`${styles3.fb} col`}>合計</div>
              <div
                className={`${styles3.fb} col text-center text-warning fw-bold`}
              >
                {allPrice} 元
              </div>
            </div>
            <div
              className="row py-2 pt-3"
              style={{ borderTop: "1px solid #78cea6" }}
            >
              <div className={`${styles3.fb} col`}>優惠券折抵</div>
              <div
                className={`${styles3.fb} col text-center text-warning fw-bold pe-4`}
                style={{ paddingLeft: "70px" }}
              >
                {allPrice - finalPriceAfterDiscount}元
              </div>
            </div>
            <div
              className="row py-2 pt-3"
              style={{ borderTop: "1px solid #78cea6" }}
            >
              <div className={`${styles3.fb} col`}>訂單總額</div>
              <div
                className={`${styles3.fb} col text-center text-success fw-bold`}
              >
                {finalPriceAfterDiscount}元
              </div>
            </div>
          </section>
          {/* 商品欄位 */}
          <section
            className={`${styles3.ProductBorder} ${styles3.section} mt-5`}
            style={{ width: 345 }}
          >
            <div className={`${styles3.topBar} row`}>
              <div className={`${styles3.fc} col`}>收件資訊</div>
            </div>
            <div className="row py-2">
              <div className={`${styles3.fb} col mt-1`}>配送方式</div>
              <div className={`${styles3.fb} col mt-1`}>宅配</div>
            </div>
            <div
              className="row py-2"
              style={{ borderTop: "1px solid #78cea6" }}
            >
              <div className={`${styles3.fb} col mt-1`}>付款方式</div>
              <div className={`${styles3.fb} col mt-1`}>LinePay</div>
            </div>
            <div
              className="row py-2"
              style={{ borderTop: "1px solid #78cea6" }}
            >
              <div className={`${styles3.fb} col mt-1`}>收件者</div>
              <div className={`${styles3.fb} col mt-1`}>{receiverName}</div>
            </div>
            <div
              className="row py-2"
              style={{ borderTop: "1px solid #78cea6" }}
            >
              <div className={`${styles3.fb} col mt-1`}>電話</div>
              <div className={`${styles3.fb} col mt-1`}>{phoneNumber}</div>
            </div>
            <div
              className="row py-2"
              style={{ borderTop: "1px solid #78cea6" }}
            >
              <div className={`${styles3.fb} col mt-1`}>取貨地址</div>
              <div className={`${styles3.fb} col mt-1`}>{receiverAddress}</div>
            </div>
            <div
              className="row py-2"
              style={{ borderTop: "1px solid #78cea6" }}
            >
              <div className="col d-flex align-items-center">
                <input type="checkbox" className="me-2" />
                <span>我同意此購買資訊</span>
              </div>
            </div>
          </section>
          {/* 折價券、付款 */}
          <div
            className={`${styles3.pay2} d-flex justify-content-center pb-4`}
            style={{ width: "100%" }}
          >
            <div
              className={`${styles3.pay2} d-flex justify-content-center py-4`}
              style={{ width: "100%" }}
            >
              <a
                href="http://localhost:3000/cart/cart-list"
                className={`${styles3.keepbuy} d-flex justify-content-center align-items-center mt-1`}
                // type="submit"
                style={{}}
              >
                <h3 className={`${styles3.h3} fw-bold pt-1`}>返回上頁</h3>
              </a>
              <button
                className={`${styles3.button} ms-4 mt-1`}
                type="submit"
                style={{
                  backgroundColor: "#78cea6",
                  color: "#ffffff",
                  border: "1px solid #78cea6",
                }}
                // onClick={handlePaymentConfirmation}
              >
                <h3 className={`${styles3.h3} fw-bold pt-1`}>送出訂單</h3>
              </button>
            </div>
            {/* </form> */}
            {/* </div> */}
          </div>
        </div>
        {/*  */}

        <Footer />
      </div>
    </form>
  );
};
export default ShopCart3;
