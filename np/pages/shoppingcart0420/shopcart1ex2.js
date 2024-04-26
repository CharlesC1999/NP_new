import React from "react";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "./shopStyle1.module.css";

const ShopCart1 = () => {
  return (
    <>
      <article
        className={`${styles.article} d-flex justify-content-center align-items-center flex-column mt-5`}
        style={{ maxWidth: 1440 }}
      >
        <div className={`${styles.pay} row mt-3`} style={{ width: "100%" }}>
          <p className={`${styles.fs} pe-3 col text-center`}>折價券</p>
          <p className={`${styles.fs} pe-3 col text-center`}>$0元</p>
        </div>
        {/*  */}
        <div className={`${styles.pay} row`} style={{ width: "100%" }}>
          <div
            className="form-check col  d-flex align-items-center"
            style={{ marginLeft: 80 }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              id="checkboxNoLabel"
              defaultValue=""
              aria-label="..."
            />
            <label htmlFor="" className={`${styles.fs} pe-3`}>
              使用折價券{" "}
            </label>
          </div>
          <select
            className="form-select form-select-sm me-5"
            aria-label="Small select example "
            style={{ width: 70 }}
          >
            <option selected="">使用優惠券</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </select>
        </div>
        {/*  */}
        <div
          className={`${styles.pay} d-flex justify-content-evenly mt-2`}
          style={{ width: "100%" }}
        >
          <p>折扣金額:</p>
          <p>$0元</p>
        </div>
        <div
          className={`${styles.pay} d-flex justify-content-evenly`}
          style={{ width: "100%" }}
        >
          <p className="pe-4">運費 :</p>
          <p>$0元</p>
        </div>
        <div
          className={`${styles.pay} d-flex justify-content-evenly ms-3`}
          style={{ width: "100%" }}
        >
          <p>訂單合計:</p>
          <p>$2000元</p>
        </div>
        <div
          className={`${styles.pay2}  d-flex justify-content-center py-4`}
          style={{ width: "100%", borderTop: "1px solid #d9d9d9" }}
        >
          {/* <button  >
    繼續購物
  </button> */}
          <a
            href=""
            className={`${styles.keepbuy} d-flex justify-content-center align-items-center`}
            type="submit"
            style={{}}
          >
            繼續購物
          </a>
          <button
            className={`ms-4 ${styles.button}`}
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
    </>
  );
};
export default ShopCart1;
