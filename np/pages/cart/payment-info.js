// import React from "react";
import styles3 from "./shopStyle3.module.css";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "@/components/header.module.scss";
import stylesFooter from "../../components/footer.module.css";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

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
  return (
    <>
      <Header />
      {/*  */}
      <div className={`${styles3.desktop}  ${styles3.container2}  container `}>
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
            <div className={`${styles3.fc} col text-center`}>優惠價</div>
            <div className={`${styles3.fc} col text-center`}>數量</div>
            <div className={`${styles3.fc} col text-center`}>小計</div>
            <div className={`${styles3.fc} col text-center`}>庫存</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} col text-center pt-2`}>肉桂捲</div>
            <div className={`${styles3.fb} col text-center pt-2`}>NT$200</div>
            <div className={`${styles3.fb} col text-center pt-2`}>2</div>
            <div className={`${styles3.fb} col text-center pt-2`}>NT$400</div>
            <div className={`${styles3.fb} col text-center pt-2`}>有</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} col text-center pt-2`}>肉桂捲</div>
            <div className={`${styles3.fb} col text-center pt-2`}>NT$200</div>
            <div className={`${styles3.fb} col text-center pt-2`}>2</div>
            <div className={`${styles3.fb} col text-center pt-2`}>NT$400</div>
            <div className={`${styles3.fb} col text-center pt-2`}>有</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} col text-center pt-2`}>肉桂捲</div>
            <div className={`${styles3.fb} col text-center pt-2`}>NT$200</div>
            <div className={`${styles3.fb} col text-center pt-2`}>2</div>
            <div className={`${styles3.fb} col text-center pt-2`}>NT$400</div>
            <div className={`${styles3.fb} col text-center pt-2`}>有</div>
          </div>
        </section>
        {/* 商品欄位 */}
        <section className={`${styles3.section} ${styles3.ProductBorder} mt-4`}>
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
            <div className={`${styles3.fb} pt-2 col-2`}>刷卡</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} pt-2 col-2`}>收件者</div>
            <div className={`${styles3.fb} pt-2 col-2`}>王美華</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} pt-2 col-2`}>Email</div>
            <div className={`${styles3.fb} pt-2 col-2`}>lsacas34@gmail.com</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} pt-2 col-2`}>取貨地址</div>
            <div className="col-4 fb pt-2">台北市XXXXXXXXXXXX</div>
          </div>
          <div className="row py-2">
            <div className={`${styles3.fb} pt-2 col d-flex align-items-center`}>
              <input type="checkbox" className="me-3" /> 我同意此購買資訊
            </div>
          </div>
        </section>
        {/* 折價券、付款 */}
        <div
          className={`${styles3.pay2} d-flex justify-content-center py-4`}
          style={{ width: "100%" }}
        >
          <a
            href=""
            className={`${styles3.keepbuy} ${styles3.a} d-flex justify-content-center align-items-center mt-1`}
            type="submit"
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
          <div className="row py-2 mt-1">
            <div className={`${styles3.fc} row ps-4 `}>肉桂捲初級班</div>
            <div className={`${styles3.fb} row ps-4`} style={{ fontSize: 12 }}>
              課程時間:2024/04/05
            </div>
            <div className="row mt-4">
              <div className="col-3 border ms-2">有庫存</div>
              <div className={`${styles3.fb} col fw-bold`}>$1200 x 1</div>
            </div>
          </div>
          <div
            className="row py-2 mt-1"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fc} row ps-4 `}>肉桂捲初級班</div>
            <div className={`${styles3.fb} row ps-4`} style={{ fontSize: 12 }}>
              課程時間:2024/04/05
            </div>
            <div className="row mt-4">
              <div className="col-3 border ms-2">有庫存</div>
              <div className={`${styles3.fb} col fw-bold`}>$1200 x 1</div>
            </div>
          </div>
          <div
            className="row py-2 mt-1"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fc} row ps-4 `}>肉桂捲初級班</div>
            <div className={`${styles3.fb} row ps-4 `} style={{ fontSize: 12 }}>
              {/* 課程時間:2024/04/05 */}
            </div>
            <div className="row mt-4">
              <div className="col-3 border ms-2">有庫存</div>
              <div className={`${styles3.fb} col fw-bold`}>$1200 x 1</div>
            </div>
          </div>
          <div
            className="row py-2 pt-3"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fb} col`}>折價券折抵</div>
            <div
              className={`${styles3.fb} col text-center text-warning fw-bold`}
            >
              0 元
            </div>
          </div>
          <div
            className="row py-2 pt-3"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fb} col`}>運費</div>
            <div
              className={`${styles3.fb} col text-center text-warning fw-bold`}
            >
              0 元
            </div>
          </div>
          <div
            className="row py-2 pt-3"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fb} col`}>訂單總價</div>
            <div
              className={`${styles3.fb} col text-center text-success fw-bold`}
            >
              3600 元
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
          <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
            <div className={`${styles3.fb} col mt-1`}>付款方式</div>
            <div className={`${styles3.fb} col mt-1`}>刷卡</div>
          </div>
          <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
            <div className={`${styles3.fb} col mt-1`}>收件者</div>
            <div className={`${styles3.fb} col mt-1`}>王美華</div>
          </div>
          <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
            <div className={`${styles3.fb} col mt-1`}>Email</div>
            <div className={`${styles3.fb} col mt-1`}>lucas34@gmail.com</div>
          </div>
          <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
            <div className={`${styles3.fb} col mt-1`}>取貨地址</div>
            <div className={`${styles3.fb} col mt-1`}>台北市xxxxxxxxx</div>
          </div>
          <div className="row py-2" style={{ borderTop: "1px solid #78cea6" }}>
            <div className="col d-flex align-items-center">
              <input type="checkbox" className="me-2" />
              <span>我同意此購買資訊</span>
            </div>
          </div>
        </section>
        {/* 折價券、付款 */}
        <div
          className={`${styles3.pay2} d-flex justify-content-center py-4`}
          style={{ width: "100%" }}
        >
          <div
            className={`${styles3.pay2} d-flex justify-content-center py-4`}
            style={{ width: "100%" }}
          >
            <a
              href=""
              className={`${styles3.keepbuy} d-flex justify-content-center align-items-center mt-1`}
              type="submit"
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
    </>
  );
};
export default ShopCart3;
