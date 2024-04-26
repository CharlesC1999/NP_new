import React from "react";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import shopStyles from "./shopStyle1.module.css";

const ShopCart1 = () => {
  return (
    <>
      {/* 桌電size */}
      <div
        className={`container ${shopStyles.container2} ${shopStyles.desktop}`}
      >
        {/*  */}
        <nav className={`pt-5 ${shopStyles.navbar}`}>
          <div className={`${shopStyles.cir} ${shopStyles.circle1}`}>
            {/* <span>1</span> */}
            {/* <span>購物車</span> */}
          </div>
          <div className={`${shopStyles.line}`} />
          <div className={`${shopStyles.cir} ${shopStyles.circle2}`}>
            {/* <span>2</span> */}
            {/* <span>填寫資料</span> */}
          </div>
          <div className={`${shopStyles.line}`} />
          <div className={`${shopStyles.cir} ${shopStyles.circle3}`} />
        </nav>
        {/* 課程欄位 */}
        <main
          className={` mb-2 fw-bold  ${shopStyles.main} ${shopStyles.marginT}`}
          style={{ color: "#50bf8b", marginTop: "100px" }}
        >
          課程
        </main>
        <main className={`${shopStyles.ProductBorder} ${shopStyles.main}`}>
          <div className={`row ${shopStyles.topBar}`}>
            <div
              className="col d-flex flex-direction-row"
              style={{ width: 100, minWidth: 77 }}
            >
              <input
                className="mt-1 ms-3 me-2"
                type="checkbox"
                defaultValue=""
                id=""
              />
              <label className={`mt-1 m-1 ${shopStyles.fc} `} htmlFor="">
                全選
              </label>
            </div>
            <div className="col-2" />
            <div className="col-3" />
            <div
              className={`col text-center align-self-center ${shopStyles.fc}`}
            >
              人數
            </div>
            <div
              className={`col text-center align-self-center ${shopStyles.fc}`}
            >
              價格
            </div>
            <div
              className={`col text-center align-self-center ${shopStyles.fc}`}
            >
              小記
            </div>
            <div
              className={`col text-center align-self-center ${shopStyles.fc}`}
            >
              刪除
            </div>
          </div>
          <div className="row">
            <div
              className="col d-flex align-items-center justify-content-start ps-3"
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
                src="/images/Rectangle 143.jpg"
                className="img-fluid"
                alt="..."
                style={{ minWidth: 75 }}
              />
            </div>
            <div
              className="col-3  align-self-center pt-3 "
              style={{ paddingLeft: "100px" }}
            >
              <h4 className={shopStyles.fc}>肉桂捲初級班</h4>
              <p style={{ fontSize: "20px" }}>2024/04/05</p>
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
              <img src="/images/Delete.jpg" alt="" />
            </div>
          </div>
        </main>
        {/* 商品欄位 */}
        <main
          className={`${shopStyles.main} mt-5 mb-2 fw-bold`}
          style={{ color: "#50bf8b" }}
        >
          商品
        </main>
        <main className={`${shopStyles.ProductBorder} ${shopStyles.main}`}>
          <div className={`${shopStyles.topBar} row `}>
            <div
              className="col d-flex flex-direction-row"
              style={{ width: 100, minWidth: 77 }}
            >
              <input
                className="mt-2 ms-3 me-2"
                type="checkbox"
                defaultValue=""
                id=""
              />
              <label className={`${shopStyles.fc}  m-1 fw-bold`} htmlFor="">
                {" "}
                全選{" "}
              </label>
            </div>
            <div className="col-2" />
            <div
              className={`${shopStyles.fc} col-3 text-center align-self-center fw-bold`}
            >
              產品名稱
            </div>
            <div
              className={`${shopStyles.fc} col text-center align-self-center fw-bold`}
            >
              人數
            </div>
            <div
              className={`${shopStyles.fc} col text-center align-self-center fw-bold`}
            >
              價格
            </div>
            <div
              className={`${shopStyles.fc} col text-center align-self-center fw-bold`}
            >
              小記
            </div>
            <div
              className={`${shopStyles.fc} col text-center align-self-center fw-bold`}
            >
              刪除
            </div>
          </div>
          <div className="row">
            <div
              className="col d-flex align-items-center justify-content-start ps-3"
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
                src="/images/Rectangle 143.jpg"
                className="img-fluid"
                alt="..."
                style={{ minWidth: 75 }}
              />
            </div>
            <div className="col-3 align-self-center text-center">
              <h4 className={shopStyles.fc}>肉桂捲</h4>
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
              <img src="/images/Delete.jpg" alt="" />
            </div>
          </div>
        </main>
        {/* 折價券、付款 */}
        <article
          className={`${shopStyles.article} d-flex justify-content-center align-items-center flex-column mt-5`}
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
              繼續購物
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
              送出
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
        <nav className={`${shopStyles.navbar} pt-5`}>
          <div className={`${shopStyles.cir} ${shopStyles.circle1}`} />
          <div className={`${shopStyles.line}`} />
          <div className={`${shopStyles.cir} ${shopStyles.circle2}`} />
          <div className={`${shopStyles.line}`} />
          <div className={`${shopStyles.cir} ${shopStyles.circle3}`} />
        </nav>
        {/* 課程欄位 */}
        {/* <main class="mt-5 mb-2 fw-bold fs-5" style="color: #50bf8b">商品</main> */}
        <main className={`${shopStyles.main} ${shopStyles.ProductBorder} mt-5`}>
          <div className={`${shopStyles.topBar} row`}>
            <div
              className={`${shopStyles.fc} col ps-4 `}
              style={{ fontSize: 16 }}
            >
              課程(4)
            </div>
          </div>
          <div className="row">
            {/* 叉叉 */}
            {/* <div class="delete"></div> */}
            <div className="col-4 p-0">
              <img
                src="/images/Rectangle 143.jpg"
                alt=""
                className=" "
                style={{ objectFit: "cover", height: "100%", weight: "121px" }}
              />
            </div>
            <div className="col-8 pb-3 pt-2">
              <div className={`${shopStyles.fc} row mt-1`}>
                <div className="col-9 ps-2">肉桂捲初級班</div>
                <div className="col ps-4">
                  <img src="/images/Frame 40118.png" alt="" />
                </div>
              </div>
              <div className="row mt-1">
                <span className="col-5" style={{ fontSize: "16px" }}>
                  課程時間:
                </span>
                <span
                  className="col-5 pt-1"
                  style={{ marginLeft: "-25px", fontSize: "14px" }}
                >
                  2024/04/05
                </span>
              </div>
              <div className="row mt-1">
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className={`${shopStyles.mobileFc} text-center`}>
                    {" "}
                    人數{" "}
                  </span>
                  <div className={`${shopStyles.add}`}>
                    <span className={shopStyles.fc}>-</span>
                    <span>1</span>
                    <span className={shopStyles.fc}>+</span>
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className={`${shopStyles.mobileFc} text-center`}>
                    價格
                  </span>
                  <span className={shopStyles.fb}>$1200</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* 叉叉 */}
            {/* <div class="delete"></div> */}
            <div className="col-4 p-0">
              <img
                src="/images/Rectangle 143.jpg"
                alt=""
                className=""
                style={{ objectFit: "cover", height: "100%", weight: "121px" }}
              />
            </div>
            <div className="col-8 pb-3 pt-2">
              <div className={`${shopStyles.fc} mt-1 row `}>
                <div className="col-9 ps-2">肉桂捲初級班</div>
                <div className="col ps-4">
                  <img src="/images/Frame 40118.png" alt="" />
                </div>
              </div>
              <div className="row mt-1">
                <span className="col-5" style={{ fontSize: "16px" }}>
                  課程時間:
                </span>
                <span
                  className="col-5"
                  style={{ marginLeft: "-25px", fontSize: "14px" }}
                >
                  2024/04/05
                </span>
              </div>
              <div className="row mt-1">
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className={`${shopStyles.mobileFc} text-center`}>
                    {" "}
                    人數{" "}
                  </span>
                  <div className={`${shopStyles.add}`}>
                    <span className={shopStyles.fc}>-</span>
                    <span>1</span>
                    <span className={shopStyles.fc}>+</span>
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className={`${shopStyles.mobileFc} text-center`}>
                    價格
                  </span>
                  <span className={`${shopStyles.fb}`}>$1200</span>
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
              <div className={`${shopStyles.fb} row ps-3 pb-2`}>
                折價券代碼、折價券 :
              </div>
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
                    <label className="me-2" style={{ fontSize: "16px" }}>
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
              </div>
            </div>
          </div>
          <div
            className="row py-2"
            style={{ border: "1px solid #d9d9d9", borderTop: 0 }}
          >
            <div className={`${shopStyles.fb} col`}>課程結帳金額 :</div>
            <div
              className={`${shopStyles.fc} col`}
              style={{ marginLeft: "-100px" }}
            >
              $3600
            </div>
          </div>
        </main>
        {/* 商品欄位 */}
        <main className={`${shopStyles.main} ${shopStyles.ProductBorder}`}>
          <div className={`${shopStyles.topBar} row `}>
            <div
              className={`${shopStyles.fc} col ps-4 `}
              style={{ fontSize: 16 }}
            >
              產品(2)
            </div>
          </div>
          <div className="row">
            {/* 叉叉 */}
            {/* <div class="delete"></div> */}
            <div className="col-4 p-0">
              <img
                src="/images/Rectangle 143.jpg"
                alt=""
                className=""
                style={{ objectFit: "cover", height: "100%", weight: "121px" }}
              />
            </div>
            <div className="col-8 pb-3 pt-2">
              <div className={`${shopStyles.fc} mt-1 row`}>
                <div className="col-9 ps-2">肉桂捲初級班</div>
                <div className="col ps-4">
                  <img src="/images/Frame 40118.png" alt="" />
                </div>
              </div>
              <div className="row mt-1">
                <span className="col-5" style={{ fontSize: "16px" }}>
                  課程時間:
                </span>
                <span
                  className="col-5"
                  style={{ marginLeft: "-25px", fontSize: "14px" }}
                >
                  2024/04/05
                </span>
              </div>
              <div className="row mt-1">
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className={`${shopStyles.fc} text-center`}> 人數 </span>
                  <div className={`${shopStyles.add}`}>
                    <span className={`${shopStyles.fc}`}>-</span>
                    <span>1</span>
                    <span className={`${shopStyles.fc}`}>+</span>
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className={`${shopStyles.fc} text-center`}>價格</span>
                  <span className={`${shopStyles.fc}`}>$1200</span>
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
                src="/images/Rectangle 143.jpg"
                alt=""
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="col-8 pb-3 pt-2">
              <div className={`${shopStyles.fc} mt-1 row`}>
                <div className="col-9 ps-2">肉桂捲初級班</div>
                <div className="col ps-4">
                  <img src="/images/Frame 40118.png" alt="" />
                </div>
              </div>
              <div className="row mt-1">
                <span className="col-5" style={{ fontSize: "16px" }}>
                  課程時間:
                </span>
                <span
                  className="col-5"
                  style={{ marginLeft: "-25px", fontSize: "14px" }}
                >
                  2024/04/05
                </span>
              </div>
              <div className="row mt-1">
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className={`${shopStyles.fc} text-center`}> 人數 </span>
                  <div className={`${shopStyles.add}`}>
                    <span className={`${shopStyles.fc}`}>-</span>
                    <span>1</span>
                    <span className={`${shopStyles.fc}`}>+</span>
                  </div>
                </div>
                <div className="col d-flex flex-column align-items-center justify-content-between">
                  <span className={`${shopStyles.fc} text-center`}>價格</span>
                  <span className={`${shopStyles.fc}`}>$1200</span>
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
              <div className={`${shopStyles.fb} row ps-3 pb-2`}>
                折價券代碼、折價券 :
              </div>
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
                    <label className="me-2" style={{ fontSize: "16px" }}>
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
              </div>
            </div>
          </div>
          <div
            className="row py-2"
            style={{ border: "1px solid #d9d9d9", borderTop: 0 }}
          >
            <div className={`${shopStyles.fb} col`}>課程結帳金額 :</div>
            <div
              className={`${shopStyles.fc} col`}
              style={{ marginLeft: "-100px" }}
            >
              $3600
            </div>
          </div>
          {/* </footer> */}
        </main>
        {/* 折價券、付款 */}
        <article
          className={`${shopStyles.send} ${shopStyles.article} d-flex justify-content-center align-items-center py-2`}
        >
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center flex-column">
              <span className={`${shopStyles.fs} ${shopStyles.fb}`}>
                結帳金額:
              </span>
              <span className={`${shopStyles.fc} fs-4 pe-3`}>$3600</span>
            </div>
            <div className="col">
              <button
                className={`${shopStyles.button} ms-4 mt-1`}
                type="submit"
              >
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
