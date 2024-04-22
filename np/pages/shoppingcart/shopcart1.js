import React from "react";
import styles from "./shopStyle1.module.css";
import Image from "../../public/images/Rectangle 143.jpg";

const ShopCart1 = () => {
  return (
    <>
      {/* 桌電size */}
      <div className="container {container2 desktop}">
        {/*  */}
        <nav className={styles.navbar}>
          <div className={`styles.cir styles.circle1`} />
          <div className={`styles.line`} />
          <div className={`styles.cir styles.circle2`} />
          <div className={`styles.line`} />
          <div className={`styles.cir styles.circle3`} />
        </nav>
        {/* 課程欄位 */}
        <main
          className="mt-5 mb-2 fw-bold fs-5 main "
          style={{ color: "#50bf8b" }}
        >
          課程
        </main>
        <main className="ProductBorder main ">
          <div className="row topBar">
            <div className="col-1" style={{ width: 100, minWidth: 77 }}>
              <input
                className="mt-2 ms-3"
                type="checkbox"
                defaultValue=""
                id=""
              />
              <label className="mt-1 m-1 fc" htmlFor="">
                {" "}
                全選{" "}
              </label>
            </div>
            <div className="col-2" />
            <div className="col-3" />
            <div className="col text-center align-self-center fc">人數</div>
            <div className="col text-center align-self-center fc">價格</div>
            <div className="col text-center align-self-center fc">小記</div>
            <div className="col text-center align-self-center fc">刪除</div>
          </div>
          <div className="row">
            <div
              className="col-1 d-flex align-items-center justify-content-center"
              style={{ width: 100, minWidth: 77 }}
            >
              <input
                className="mt-2 ms-3"
                type="checkbox"
                defaultValue=""
                id=""
              />
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
              <img
                src="../../public/images/Rectangle 143.jpg"
                className="img-fluid"
                alt="..."
                style={{ minWidth: 75 }}
              />
            </div>
            <div className="col-3 ps-5 align-self-center pt-2">
              <h4 className="fc">肉桂捲初級班</h4>
              <p>2024/04/05</p>
            </div>
            <div className="col align-self-center text-center">
              {/* <div class="add d-flex align-items-center"> */}
              <span>-</span> <span>1</span> <span>+</span>
              {/* </div> */}
            </div>
            <div className="col align-self-center text-center">$1399</div>
            <div className="col align-self-center text-center">$1399</div>
            <div
              className="col d-flex align-items-center justify-content-center"
              style={{ height: 160 }}
            >
              <img src="../../public/images/Delete.jpg" alt="" />
            </div>
          </div>
        </main>
        {/* 商品欄位 */}
        <main
          className="mt-5 mb-2 fw-bold fs-5 .main"
          style={{ color: "#50bf8b" }}
        >
          商品
        </main>
        <main className="ProductBorder main">
          <div className="row topBar">
            <div className="col-1" style={{ width: 100, minWidth: 77 }}>
              <input
                className="mt-2 ms-3"
                type="checkbox"
                defaultValue=""
                id=""
              />
              <label className="mt-1 m-1 fw-bold fc" htmlFor="">
                {" "}
                全選{" "}
              </label>
            </div>
            <div className="col-2" />
            <div className="col-3 text-center align-self-center fw-bold fc">
              產品名稱
            </div>
            <div className="col text-center align-self-center fw-bold fc">
              人數
            </div>
            <div className="col text-center align-self-center fw-bold fc">
              價格
            </div>
            <div className="col text-center align-self-center fw-bold fc">
              小記
            </div>
            <div className="col text-center align-self-center fw-bold fc">
              刪除
            </div>
          </div>
          <div className="row">
            <div
              className="col-1 d-flex align-items-center justify-content-center"
              style={{ width: 100, minWidth: 77 }}
            >
              <input
                className="mt-2 ms-3"
                type="checkbox"
                defaultValue=""
                id=""
              />
            </div>
            <div className="col-2 d-flex align-items-center justify-content-center">
              <img
                src="../../public/images/Rectangle 143.jpg"
                className="img-fluid"
                alt="..."
                style={{ minWidth: 75 }}
              />
            </div>
            <div className="col-3 align-self-center text-center">
              <h4 className="fc">肉桂捲</h4>
            </div>
            <div className="col align-self-center text-center">
              {/* <div class="add d-flex align-items-center"> */}
              <span>-</span> <span>1</span> <span>+</span>
              {/* </div> */}
            </div>
            <div className="col align-self-center text-center">$1399</div>
            <div className="col align-self-center text-center">$1399</div>
            <div
              className="col d-flex align-items-center justify-content-center"
              style={{ height: 160 }}
            >
              <img src="../../public/images/Delete.jpg" alt="" />
            </div>
          </div>
        </main>
        {/* 折價券、付款 */}
        <article
          className="d-flex justify-content-center align-items-center flex-column mt-5 article"
          style={{ maxWidth: 1440 }}
        >
          <div
            className="pay d-flex justify-content-evenly mt-3"
            style={{ width: "100%" }}
          >
            <p className="pe-3">折價券</p>
            <p>$0元</p>
          </div>
          {/*  */}
          <div
            className="pay d-flex justify-content-evenly"
            style={{ width: "100%" }}
          >
            <div className="form-check" style={{ marginLeft: 55 }}>
              <input
                className="form-check-input"
                type="checkbox"
                id="checkboxNoLabel"
                defaultValue=""
                aria-label="..."
              />
              <label htmlFor="">使用折價券 </label>
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
            className="pay d-flex justify-content-evenly mt-2"
            style={{ width: "100%" }}
          >
            <p>折扣金額:</p>
            <p>$0元</p>
          </div>
          <div
            className="pay d-flex justify-content-evenly"
            style={{ width: "100%" }}
          >
            <p className="pe-4">運費 :</p>
            <p>$0元</p>
          </div>
          <div
            className="pay d-flex justify-content-evenly ms-3"
            style={{ width: "100%" }}
          >
            <p>訂單合計:</p>
            <p>$2000元</p>
          </div>
          <div
            className="pay2 d-flex justify-content-center py-4"
            style={{ width: "100%", borderTop: "1px solid #d9d9d9" }}
          >
            {/* <button  >
    繼續購物
  </button> */}
            <a
              href=""
              className="keepbuy d-flex justify-content-center align-items-center"
              type="submit"
              style={{}}
            >
              繼續購物
            </a>
            <button
              className="ms-4 button"
              type="submit"
              style={{
                backgroundColor: "#78cea6",
                color: "#ffffff",
                border: "1px solid #78cea6",
              }}
            >
              送出
            </button>
          </div>
        </article>
        {/* </form> */}
        {/* </div> */}
      </div>
      {/* 手機size */}
      <div className="container container2 mobile">
        {/*  */}
        <nav className="pt-4 navbar">
          <div className="cir circle1" />
          <div className="line" />
          <div className="cir circle2" />
          <div className="line" />
          <div className="cir circle3" />
        </nav>
        {/* 課程欄位 */}
        {/* <main class="mt-5 mb-2 fw-bold fs-5" style="color: #50bf8b">商品</main> */}
        <main className="ProductBorder mt-5 main ">
          <div className="row topBar">
            <div className="col ps-4 fc" style={{ fontSize: 16 }}>
              課程(4)
            </div>
          </div>
          <div className="row">
            {/* 叉叉 */}
            {/* <div class="delete"></div> */}
            <div className="col-4 p-0">
              <img
                src="../../public/images/Rectangle 143.jpg"
                alt=""
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="col-8 pb-3 pt-2">
              <div className="row fc mt-1">
                <div className="col-9 ps-2">肉桂捲初級班</div>
                <div className="col ps-4">
                  <img src="../../public/images/Frame 40118.png" alt="" />
                </div>
              </div>
              <div className="row mt-1">
                <span className="col-5">課程時間:</span>
                <span className="col-5" style={{ marginLeft: "-30px" }}>
                  2024/04/05
                </span>
              </div>
              <div className="row mt-1">
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className="text-center fc"> 人數 </span>
                  <div className="add">
                    <span className="fc">-</span>
                    <span>1</span>
                    <span className="fc">+</span>
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className="text-center fc">價格</span>
                  <span className="fc">$1200</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* 叉叉 */}
            {/* <div class="delete"></div> */}
            <div className="col-4 p-0">
              <img
                src="../../public/images/Rectangle 143.jpg"
                alt=""
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="col-8 pb-3 pt-2">
              <div className="row fc mt-1">
                <div className="col-9 ps-2">肉桂捲初級班</div>
                <div className="col ps-4">
                  <img src="../../public/images/Frame 40118.png" alt="" />
                </div>
              </div>
              <div className="row mt-1">
                <span className="col-5">課程時間:</span>
                <span className="col-5" style={{ marginLeft: "-30px" }}>
                  2024/04/05
                </span>
              </div>
              <div className="row mt-1">
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className="text-center fc"> 人數 </span>
                  <div className="add">
                    <span className="fc">-</span>
                    <span>1</span>
                    <span className="fc">+</span>
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className="text-center fc">價格</span>
                  <span className="fc">$1200</span>
                </div>
                {/* <div
          class="col d-flex flex-column align-items-center justify-content-between"
        >
          <span>小記</span>
          <span>$1200</span>
        </div> */}
              </div>
            </div>
          </div>
          {/* <footer> */}
          <div className="row" style={{ border: "1px solid #d9d9d9" }}>
            <div className="col py-2">
              <div className="row ps-3 pb-2 fb">折價券代碼、折價券 :</div>
              <div className="row">
                {/* 使用折價券 */}
                <div
                  className="pay d-flex justify-content"
                  style={{ width: "100%" }}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkboxNoLabel"
                      defaultValue=""
                      aria-label="..."
                    />
                    <label className="me-2">使用折價券 </label>
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
              </div>
            </div>
          </div>
          <div
            className="row py-2"
            style={{ border: "1px solid #d9d9d9", borderTop: 0 }}
          >
            <div className="col fb">課程結帳金額 :</div>
            <div className="col fc" style={{ marginLeft: "-100px" }}>
              $3600
            </div>
          </div>
        </main>
        {/* 商品欄位 */}
        <main className="ProductBorder main ">
          <div className="row topBar">
            <div className="col ps-4 fc" style={{ fontSize: 16 }}>
              產品(2)
            </div>
          </div>
          <div className="row">
            {/* 叉叉 */}
            {/* <div class="delete"></div> */}
            <div className="col-4 p-0">
              <img
                src="../../public/images/Rectangle 143.jpg"
                alt=""
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="col-8 pb-3 pt-2">
              <div className="row fc mt-1">
                <div className="col-9 ps-2">肉桂捲初級班</div>
                <div className="col ps-4">
                  <img src="../../public/images/Frame 40118.png" alt="" />
                </div>
              </div>
              <div className="row mt-1">
                <span className="col-5">課程時間:</span>
                <span className="col-5" style={{ marginLeft: "-30px" }}>
                  2024/04/05
                </span>
              </div>
              <div className="row mt-1">
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className="text-center fc"> 人數 </span>
                  <div className="add">
                    <span className="fc">-</span>
                    <span>1</span>
                    <span className="fc">+</span>
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className="text-center fc">價格</span>
                  <span className="fc">$1200</span>
                </div>
                {/* <div
          class="col d-flex flex-column align-items-center justify-content-between"
        >
          <span>小記</span>
          <span>$1200</span>
        </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            {/* 叉叉 */}
            {/* <div class="delete"></div> */}
            <div className="col-4 p-0">
              <img
                src="../../public/images/Rectangle 143.jpg"
                alt=""
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="col-8 pb-3 pt-2">
              <div className="row fc mt-1">
                <div className="col-9 ps-2">肉桂捲初級班</div>
                <div className="col ps-4">
                  <img src="../../public/images/Frame 40118.png" alt="" />
                </div>
              </div>
              <div className="row mt-1">
                <span className="col-5">課程時間:</span>
                <span className="col-5" style={{ marginLeft: "-30px" }}>
                  2024/04/05
                </span>
              </div>
              <div className="row mt-1">
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className="text-center fc"> 人數 </span>
                  <div className="add">
                    <span className="fc">-</span>
                    <span>1</span>
                    <span className="fc">+</span>
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className="text-center fc">價格</span>
                  <span className="fc">$1200</span>
                </div>
                {/* <div
          class="col d-flex flex-column align-items-center justify-content-between"
        >
          <span>小記</span>
          <span>$1200</span>
        </div> */}
              </div>
            </div>
          </div>
          {/* <footer> */}
          <div className="row" style={{ border: "1px solid #d9d9d9" }}>
            <div className="col py-2">
              <div className="row ps-3 pb-2 fb">折價券代碼、折價券 :</div>
              <div className="row">
                {/* 使用折價券 */}
                <div
                  className="pay d-flex justify-content"
                  style={{ width: "100%" }}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkboxNoLabel"
                      defaultValue=""
                      aria-label="..."
                    />
                    <label className="me-2">使用折價券 </label>
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
              </div>
            </div>
          </div>
          <div
            className="row py-2"
            style={{ border: "1px solid #d9d9d9", borderTop: 0 }}
          >
            <div className="col fb">課程結帳金額 :</div>
            <div className="col fc" style={{ marginLeft: "-100px" }}>
              $3600
            </div>
          </div>
          {/* </footer> */}
        </main>
        {/* 折價券、付款 */}
        <article className="d-flex justify-content-center align-items-center py-2 send article">
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center flex-column">
              <span className="fb">結帳金額:</span>
              <span className="pe-3 fc">$3600</span>
            </div>
            <div className="col">
              <button className="ms-4 button" type="submit">
                送出
              </button>
            </div>
          </div>
        </article>
        {/* </form> */}
        {/* </div> */}
      </div>
    </>
  );
};
export default ShopCart1;
