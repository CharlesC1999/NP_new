import React, { useState, useEffect } from "react";
import ClassStyles from "./class.module.css";
// import Check from "@/components/checkbox-custom/CheckBoxCustom";
// 加上context鉤子
import { useCart } from "@/hooks/use-cart";
import { FaCheck } from "react-icons/fa6";

const Class = () => {
  const {
    items,
    increaseItem,
    decreaseItem,
    removeItem,
    setItems,
    totalItems,
  } = useCart();
  // const { totalItems, totalPrice } = useCart();

  // 勾勾
  const handleCheck = (id) => {
    const nextItems = items.map((v) => {
      if (v.id === id) {
        return { ...v, checked: !v.checked };
      } else {
        return v;
      }
    });
    setItems(nextItems);
  };

  // 全選的核取方塊用的事件處理函式
  const handleToggleCheckedAll = (e) => {
    const nextItems = items.map((v, i) => {
      // 強制所有選項物件的checked屬性，和全選的e.target.checked完全一致
      return { ...v, checked: e.target.checked };
    });

    // 狀態修改通用第3步
    setItems(nextItems);
  };

  return (
    <>
      {/* 課程欄位，桌機樣式 */}
      <main
        className={` mb-2 fw-bold  ${ClassStyles.main} ${ClassStyles.marginT} ${ClassStyles.desk}`}
        style={{ color: "#50bf8b", marginTop: "100px" }}
      >
        課程
      </main>
      <main
        className={`${ClassStyles.ProductBorder} ${ClassStyles.main} ${ClassStyles.desk}`}
      >
        <div className={`row ${ClassStyles.topBar}`}>
          <div
            className="col d-flex flex-direction-row"
            style={{ width: 100, minWidth: 77 }}
          >
            <div className="pt-2">
              {/* // 全選的checkbox */}
              <div className={ClassStyles["checkbox-wrapper"]}>
                <FaCheck
                  style={{ fontSize: "16px" }}
                  className={`${ClassStyles["fa-check"]} ${
                    items.every((v) => v.checked) ? "d-block" : "d-none"
                  } ${items.length === 0 ? "d-none" : ""} `}
                />
                <input
                  checked={items.every((v) => v.checked)}
                  onClick={handleToggleCheckedAll}
                  type="checkbox"
                  className={`${ClassStyles["test"]} ${
                    items.length === 0
                      ? ""
                      : items.every((v) => v.checked)
                      ? ClassStyles.checked
                      : " "
                  } `}
                />
              </div>
            </div>

            <label className={`mt-1 m-1 ${ClassStyles.fc} `} htmlFor="">
              全選
            </label>
          </div>
          <div className="col-2" />
          {/* <div className="col-3" /> */}
          <div
            className={`col-3 text-center align-self-center ${ClassStyles.fc}`}
          >
            課程名稱
          </div>
          <div
            className={`col text-center align-self-center ${ClassStyles.fc}`}
          >
            人數
          </div>
          <div
            className={`col text-center align-self-center ${ClassStyles.fc}`}
          >
            價格
          </div>
          <div
            className={`col text-center align-self-center ${ClassStyles.fc}`}
          >
            小計
          </div>
          <div
            className={`col text-center align-self-center ${ClassStyles.fc}`}
          >
            刪除
          </div>
        </div>

        {/*  */}
        {items.map((element) => {
          return (
            <div className="row" key={element.id}>
              <div
                className="col d-flex align-items-center justify-content-start ps-3"
                // style={{
                //   width: 100,
                //   minWidth: 77,
                //   borderTop: "1px solid #def9ec",
                // }}
                // style={{ borderBottom: "1px solid #def9ec" }}
              >
                {/* // 勾勾 */}
                <div className={ClassStyles["checkbox-wrapper"]}>
                  <FaCheck
                    style={{ "font-size": "16px" }}
                    className={`${ClassStyles["fa-check"]}  ${
                      element.checked ? "d-block" : "d-none"
                    }`}
                  />
                  <input
                    onChange={() => {
                      handleCheck(element.id);
                    }}
                    checked={element.checked}
                    type="checkbox"
                    className={`${ClassStyles["test"]} ${
                      element.checked ? ClassStyles.checked : ""
                    }`}
                  />
                </div>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                <img
                  src={`/images/class-images/${element.image}`}
                  className="img-fluid"
                  alt={element.name}
                  style={{ minWidth: 75 }}
                />
              </div>
              <div
                className="col-3  align-self-center pt-3 "
                style={{ paddingLeft: "50px" }}
              >
                <h4 className={ClassStyles.fc}>{element.className}</h4>
                <p style={{ fontSize: "16px" }}>{element.classDate}</p>
              </div>
              <div
                className={`${ClassStyles.add} col align-self-center text-center`}
              >
                {/* <div class="add d-flex align-items-center"> */}
                <span
                  className={`${ClassStyles.plus}`}
                  onClick={() => {
                    decreaseItem(element.id);
                  }}
                >
                  -
                </span>
                <span>{element.qty} </span>
                <span
                  onClick={() => {
                    increaseItem(element.id);
                  }}
                  className={`${ClassStyles.plus}`}
                >
                  +
                </span>
                {/* </div> */}
              </div>
              <div className="col align-self-center text-center">
                {element.price}
              </div>
              <div className="col align-self-center text-center">
                {element.price * element.qty}
              </div>
              <div
                className="col d-flex align-items-center justify-content-center"
                style={{ height: 160 }}
              >
                <img
                  src="/images/Delete.jpg"
                  className={`${ClassStyles.plus}`}
                  onClick={() => {
                    removeItem(element.id);
                  }}
                />
              </div>
            </div>
          );
        })}
      </main>

      {/* 手機樣式 */}
      <main
        className={`${ClassStyles.main} ${ClassStyles.ProductBorder} ${ClassStyles.mobile} mt-5`}
      >
        <div className={`${ClassStyles.topBar} row`}>
          <div
            className={`${ClassStyles.fc} col ps-4 `}
            style={{ fontSize: 16 }}
          >
            課程({totalItems})
          </div>
        </div>
        {/*  */}
        {items.map((element) => {
          return (
            <div className="row" key={element.id}>
              {/* 叉叉 */}
              {/* <div class="delete"></div> */}
              <div className="col-4 p-0">
                <img
                  src={`/images/class-images/${element.image}`}
                  alt=""
                  style={{ objectFit: "cover", height: "100%", width: "121px" }}
                />
              </div>
              <div className="col-8 pb-3 pt-2">
                <div className={`${ClassStyles.fc} row mt-1`}>
                  <div className="col-9 ps-2">{element.className}</div>
                  <div className="col ps-4">
                    <img
                      src="/images/Frame 40118.png"
                      className={`${ClassStyles.plus}`}
                      alt=""
                      onClick={() => {
                        removeItem(element.id);
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-1">
                  <span className="col" style={{ fontSize: "12px" }}>
                    {element.classDate}
                  </span>
                  {/* <span
                    className="col-5 pt-1"
                    style={{ marginLeft: "-25px", fontSize: "14px" }}
                  >
                    2024/04/05
                  </span> */}
                </div>
                <div className="row mt-1">
                  <div className="col d-flex flex-column align-items-center justify-content-between">
                    <span className={`${ClassStyles.mobileFc} text-center`}>
                      {" "}
                      人數{" "}
                    </span>
                    <div className={`${ClassStyles.add}`}>
                      <span
                        className={`${ClassStyles.plus} ${ClassStyles.fc}`}
                        onClick={() => {
                          decreaseItem(element.id);
                        }}
                      >
                        -
                      </span>
                      <span>{element.qty}</span>
                      <span
                        className={`${ClassStyles.plus} ${ClassStyles.fc}`}
                        onClick={() => {
                          increaseItem(element.id);
                        }}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="col d-flex flex-column align-items-center justify-content-between">
                    <span className={`${ClassStyles.mobileFc} text-center`}>
                      {" "}
                      價格{" "}
                    </span>
                    <span className={ClassStyles.fb}>
                      {element.qty * element.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div className="row" style={{ border: "1px solid #d9d9d9" }}>
          <div className="col py-2">
            <div className={`${ClassStyles.fb} row ps-3 pb-2`}>
              {" "}
              折價券代碼、折價券 :{" "}
            </div>
            <div className="row">
              使用折價券
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
        </div> */}
        {/* <div
          className="row py-2"
          style={{ border: "1px solid #d9d9d9", borderTop: 0 }}
        >
          <div className={`${ClassStyles.fb} col`}>課程結帳金額 :</div>
          <div
            className={`${ClassStyles.fc} col`}
            style={{ marginLeft: "-100px" }}
          >
            {totalPrice}
          </div>
        </div> */}
      </main>
    </>
  );
};

export default Class;
