import React from "react";
import styles3 from "./shopStyle3.module.css";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";

const ShopCart3 = () => {
  return (
    <>
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
          className={`${styles3.section} ${styles3.mgt} mb-2 fw-bold fs-5`}
          style={{ color: "#50bf8b" }}
        >
          購物明細
        </section>
        <section className={`${styles3.ProductBorder} ${styles3.section}`}>
          <div className={`${styles3.topBar} row `}>
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
            <div className={`${styles3.fc} col `}>付款方式與運送方式</div>
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
              <input type="checkbox" /> 我同意此購買資訊
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
            返回上一頁
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
            送出訂單.
          </button>
        </div>
        {/* </form> */}
        {/* </div> */}
      </div>
      {/* 手機size */}
      <div className={`${styles3.mobile}  ${styles3.container2} container`}>
        {/*  */}
        {/* <nav className="pt-5 nav">
          <div className="cir circle1" />
          <div className="line" />
          <div className="cir circle2" />
          <div className="line" />
          <div className="cir circle3" />
        </nav> */}

        <nav className={`pt-5 ${styles3.nav}`}>
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
              <div className={`${styles3.fb} col`}>$1200 x 1</div>
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
              <div className={`${styles3.fb} col`}>$1200 x 1</div>
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
              <div className={`${styles3.fb} col`}>$1200 x 1</div>
            </div>
          </div>
          <div
            className="row py-2 pt-3"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fb} col`}>折價券折抵</div>
            <div className={`${styles3.fb} col text-center`}>0 元</div>
          </div>
          <div
            className="row py-2 pt-3"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fb} col`}>運費</div>
            <div className={`${styles3.fb} col text-center`}>0 元</div>
          </div>
          <div
            className="row py-2 pt-3"
            style={{ borderTop: "1px solid #78cea6" }}
          >
            <div className={`${styles3.fb} col`}>訂單總價</div>
            <div className={`${styles3.fb} col text-center`}>3600 元</div>
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
            <div className="col mt-2">
              <input type="checkbox" className="" /> 我同意此購買資訊
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
              返回上一頁
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
              送出訂單
            </button>
          </div>
          {/* </form> */}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
export default ShopCart3;
