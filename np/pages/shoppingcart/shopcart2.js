import React from "react";
import styles2 from "./shopStyle2.module.css";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";

const ShopCart2 = () => {
  return (
    <>
      <div className={`${styles2.frame} container`}>
        <form action="" method="POST">
          {/* <nav className="nav">
            <div className="cir circle1" />
            <div className="line line1" />
            <div className="cir circle2" />
            <div className="line" />
            <div className="cir circle3" />
          </nav> */}

          <nav className={`pt-5 ${styles2.nav}`}>
            <div className={`${styles2.cir} ${styles2.circle1}`}>
              {/* <span>1</span> */}
              {/* <span>購物車</span> */}
            </div>
            <div className={`${styles2.line} ${styles2.line1}`} />
            <div className={`${styles2.cir} ${styles2.circle2}`}>
              {/* <span>2</span> */}
              {/* <span>填寫資料</span> */}
            </div>
            <div className={`${styles2.line}`} />
            <div className={`${styles2.cir} ${styles2.circle3}`} />
          </nav>
          {/* 表單部分 */}
          <div className={`${styles2.mgt} row `}>
            <div className="col-sm-6">
              <aside
                className={`${styles2.left} ${styles2["form-container"]} m-2`}
                style={{ minWidth: "100%" }}
              >
                {/* <myH4 className="myH4">顧客資訊</myH4> */}
                {/* <div className={styles2.myH4}>顧客資訊</div> */}
                <div className={styles2.myH4}>顧客資訊</div>
                <div className="mb-3">
                  <label htmlFor="name" className={`${styles2.label} mt-3`}>
                    姓名:
                  </label>
                  <input
                    type="text"
                    className={`${styles2.input} form-control`}
                    id="formGroupExampleInput"
                    placeholder=""
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className={`${styles2.label} form-label`}
                  >
                    電子信箱
                  </label>
                  <input
                    type="email"
                    className={`${styles2.input} form-control`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                {/* 套bs5套件 */}
                <label htmlFor="phone" className={`${styles2.label}`}>
                  電話號碼:
                </label>
                <div className="input-group mb-3" style={{}}>
                  <div
                    className={`${styles2.button} ${styles2.input} btn btn-outline-secondary dropdown-toggle py-1`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ width: "40%" }}
                  >
                    TW +886
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Separated link
                      </a>
                    </li>
                  </ul>
                  <input
                    type="text"
                    className="form-control py-1"
                    aria-label="Text input with dropdown button"
                  />
                </div>
                <div className="form-group form-check">
                  {/* <input type="radio" id="rememberPhone" name="rememberPhone" value="rememberPhone">
          儲存這個號碼 */}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPhone"
                    defaultValue=""
                    aria-label="..."
                  />
                  <h5>儲存這個號碼</h5>
                </div>
                {/* 第二段 */}
                {/* <myH4>訂單備註</myH4> */}
                {/* <myH4 className="myH4">訂單備註</myH4> */}
                {/* <div className={styles2.myH4}>訂單備註</div> */}
                <div className={styles2.myH4} style={{ marginTop: "15px" }}>
                  訂單備註
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: 100 }}
                    defaultValue={""}
                  />
                </div>
                {/* 第三段 */}
                <div
                  className={`${styles2.backage} d-flex justify-content-between mt-5`}
                >
                  <h5 style={{ fontSize: 24, color: "#4D785D" }}>
                    送貨資料
                    <span style={{ fontSize: 10 }}>
                      {" "}
                      (以選擇的送貨方式:宅配到府)
                    </span>
                  </h5>
                  <span className="pt-2" style={{ fontSize: 14 }}>
                    運費:NT$0
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className={`${styles2.label} mt-3`}>
                    收件人名稱:
                  </label>
                  <input
                    type="text"
                    className={`${styles2.input} form-control`}
                    id="formGroupExampleInput"
                    placeholder=""
                  />
                </div>
                {/* 套bs5套件 */}
                <label htmlFor="phone" className={`${styles2.label}`}>
                  電話號碼:
                </label>
                <div className="input-group mb-3" style={{}}>
                  <div
                    className={`${styles2.button} ${styles2.input} btn btn-outline-secondary dropdown-toggle py-1`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ width: "40%" }}
                  >
                    TW +886
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Separated link
                      </a>
                    </li>
                  </ul>
                  <input
                    type="text"
                    className="form-control py-1"
                    aria-label="Text input with dropdown button"
                  />
                </div>
                <div className="form-group form-check">
                  {/* <input type="radio" id="rememberPhone" name="rememberPhone" value="rememberPhone">
          儲存這個號碼 */}
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPhone"
                    defaultValue=""
                    aria-label="..."
                  />
                  <h5>儲存這個號碼</h5>
                </div>
                {/* 第四段 */}
                {/* <myH4>送貨地址</myH4> */}
                {/* <myH4 className="myH4">送貨地址</myH4> */}
                {/* <div className={styles2.myH4}>送貨地址</div> */}
                <div className={styles2.myH4} style={{ marginTop: "15px" }}>
                  送貨地址
                </div>
                <div className="row py-1">
                  {/* <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      // className={`form-control ${styles2.myH4}`}
                      placeholder="城市/縣"
                      aria-label="First name"
                      style={{ height: "30px" }}
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control  bg-secondary-subtle"
                      placeholder="地區"
                      aria-label="Last name"
                    />
                  </div> */}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className={`${styles2.input} form-control`}
                    // className=""
                    id="formGroupExampleInput"
                    placeholder="地址"
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPhone"
                    defaultValue=""
                    aria-label="..."
                  />
                  <h5>儲存這個送貨地址</h5>
                </div>
                <div
                  className="form-group form-check pb-3 mb-0"
                  // style={{ borderBottom: "1px solid #4D785D" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPhone"
                    defaultValue=""
                    aria-label="..."
                  />
                  <h5>設定為預設地址</h5>
                </div>
                {/* <div className="">
                  <label
                    htmlFor="name"
                    className={`${styles2.label} mt-3 ps-2`}
                  >
                    希望到貨時間 / 選擇時段
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="備註:"
                  />
                </div> */}
              </aside>
            </div>
            {/* 右邊刷信用卡 */}
            <div className="col-sm-6">
              <aside
                className={`${styles2.right} ${styles2["form-container"]} m-2`}
                style={{ minWidth: "100%" }}
              >
                {/* <myH4>選擇付款方式</myH4> */}
                {/* <myH4 className="myH4">選擇付款方式</myH4> */}
                {/* <div className={styles2.myH4}>選擇付款方式</div> */}
                <div className={styles2.myH4}>選擇付款方式</div>
                <label
                  htmlFor="name"
                  className={`${styles2.label} mt-3`}
                  style={{ opacity: 0 }}
                >
                  透明
                </label>
                <div
                  className={`${styles2["line-pay"]} d-flex align-items-center`}
                >
                  <div className="form-check mt-2 ms-3">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckDefault"
                    />
                    <label
                      className={`${styles2.label} form-check-label ms-3`}
                      htmlFor="flexCheckDefault"
                    >
                      Line Pay
                    </label>
                  </div>
                </div>
                {/* 刷卡 */}
                <label
                  htmlFor="name"
                  className={`${styles2.label} mt-3`}
                  style={{ opacity: 0 }}
                >
                  透明
                </label>
                <div className={`${styles2["credit-card"]}`}>
                  <div
                    className={`${styles2["line-pay"]} d-flex align-items-center`}
                  >
                    <div className="form-check mt-2 ms-3">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault"
                      />
                      <label
                        className={`${styles2.label} form-check-label ms-3`}
                        htmlFor="flexCheckDefault"
                      >
                        信用卡
                      </label>
                    </div>
                  </div>
                  {/*  */}
                  <div
                    className={`${styles2["credit-card-item"]} pt-2 pb-1 ps-2`}
                  >
                    {" "}
                    <h5>以選擇的付款資訊</h5>
                  </div>
                  <input
                    type="number"
                    className={`${styles2["line-pay"]} ps-2`}
                    placeholder="卡號"
                    style={{ width: "100%" }}
                  />
                  {/* </div> */}
                </div>
                <div
                  className={`${styles2["credit-card-item"]} pt-2 pb-1 ps-2`}
                >
                  {" "}
                  <h5>以選擇的付款資訊</h5>
                </div>
                <input
                  type="number"
                  className={`${styles2["line-pay"]} ps-2`}
                  placeholder="卡號"
                  style={{ width: "100%" }}
                />
                {/* </div> */}
                <div
                  className={`${styles2["credit-card-item"]} pt-2 pb-1 ps-2`}
                >
                  {" "}
                  <h5>以選擇的付款資訊</h5>
                </div>
                <input
                  type="number"
                  className={`${styles2["line-pay"]} ps-2`}
                  placeholder="卡號"
                  style={{ width: "100%" }}
                />
                <div
                  className={`${styles2["credit-card-item"]} pt-2 pb-1 ps-2`}
                >
                  {" "}
                  <h5>以選擇的付款資訊</h5>
                </div>
                <input
                  type="number"
                  className={`${styles2["line-pay"]} ps-2`}
                  placeholder="卡號"
                  style={{ width: "100%" }}
                />
                <div className="form-group form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberPhone"
                    defaultValue=""
                    aria-label="..."
                  />
                  <h5>同意記住信用卡資訊</h5>
                </div>
                <h5 className="ps-4">本金流服務................</h5>
              </aside>
            </div>
          </div>
          {/* 最下面 */}
          <article
            className={`${styles2.article} d-flex justify-content align-items-center flex-column mt-4`}
            style={{ maxWidth: 1440 }}
          >
            <div
              className={`${styles2.pay1} d-flex flex-column  align-items-center py-3`}
              style={{ width: 345, maxWidth: 1440 }}
            >
              <div className="form-group form-check mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberPhone"
                  defaultValue=""
                  aria-label="..."
                />
                <h5> 儲存這個送貨地址</h5>
              </div>
              <div className="form-group form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberPhone"
                  defaultValue=""
                  aria-label="..."
                />
                <h5>儲存這個送貨地址</h5>
              </div>
              <div className="form-group form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberPhone"
                  defaultValue=""
                  aria-label="..."
                />
                <h5>儲存這個送貨地址</h5>
              </div>
            </div>
            <div
              className={`${styles2.pay2} d-flex justify-content-center py-4`}
              style={{ width: "100%" }}
            >
              <a
                href=""
                className={`${styles2.keepbuy} d-flex justify-content-center align-items-center mt-1`}
                type="submit"
                style={{}}
              >
                繼續購物
              </a>
              <button
                className={` ${styles2.butt} ms-4 mt-1`}
                type="submit"
                style={{
                  backgroundColor: "#78cea6",
                  color: "#ffffff",
                  border: "1px solid #78cea6",
                }}
              >
                前往結帳
              </button>
            </div>
          </article>
        </form>
      </div>
    </>
  );
};
export default ShopCart2;
