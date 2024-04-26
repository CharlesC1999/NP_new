import React, { useState } from "react";
import ClassStyles from "./class.module.css";
import Check from "@/components/checkbox-custom/CheckBoxCustom";

const Class = () => {
  const classIndex = [
    { id: 0, count: 1, name: "肉桂捲初級班", price: 1500 },
    { id: 1, count: 1, name: "cake初級班", price: 1200 },
    { id: 2, count: 1, name: "肉捲初級班", price: 1000 },
  ];
  const [classData, classProductsData] = useState(classIndex);

  // const [quantity,setQuantity] = useState(0)
  const increase = (id) => {
    // setQuantity(quantity + 1)
    const addProducts = classData.map((v, i) => {
      if (v.id === id) return { ...v, count: v.count + 1 };
      else return v;
    });

    classProductsData(addProducts);
  };

  const decrease = (id) => {
    // if(quantity>0){
    //   setQuantity(quantity - 1)
    // }
    const reduceProducts = classData.map((v, i) => {
      if (v.id === id && v.count > 0) return { ...v, count: v.count - 1 };
      else return v;
    });

    classProductsData(reduceProducts);
  };

  const remove = (id) => {
    const removeProduct = classData.filter((v, i) => {
      return v.id !== id;
    });

    classProductsData(removeProduct);
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
            {/* <input
              className="mt-1 ms-3 me-2"
              type="checkbox"
              defaultValue=""
              id=""
            /> */}
            <Check />
            <label className={`mt-1 m-1 ${ClassStyles.fc} `} htmlFor="">
              全選
            </label>
          </div>
          <div className="col-2" />
          <div className="col-3" />
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
            小記
          </div>
          <div
            className={`col text-center align-self-center ${ClassStyles.fc}`}
          >
            刪除
          </div>
        </div>

        {/*  */}
        {classData.map((element) => {
          return (
            <div className="row" key={element.id}>
              <div
                className="col d-flex align-items-center justify-content-start ps-3"
                style={{ width: 100, minWidth: 77 }}
              >
                {/* <input
                  className="mt-2 ms-3"
                  type="checkbox"
                  defaultValue=""
                  id=""
                /> */}
                <Check />
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
                <h4 className={ClassStyles.fc}>{element.name}</h4>
                <p style={{ fontSize: "20px" }}>2024/04/05</p>
              </div>
              <div
                className={`${ClassStyles.add} col align-self-center text-center`}
              >
                {/* <div class="add d-flex align-items-center"> */}
                <span
                  className={`${ClassStyles.plus}`}
                  onClick={() => {
                    const nextCount = element.count - 1;
                    if (nextCount === 0) {
                      remove(element.id);
                    } else {
                      decrease(element.id);
                    }
                  }}
                >
                  -
                </span>
                <span>{element.count} </span>
                <span
                  onClick={() => {
                    increase(element.id);
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
                {element.price * element.count}
              </div>
              <div
                className="col d-flex align-items-center justify-content-center"
                style={{ height: 160 }}
              >
                <img
                  src="/images/Delete.jpg"
                  className={`${ClassStyles.plus}`}
                  onClick={() => {
                    const nextData = classData.filter((v, i) => {
                      return v.id !== element.id;
                    });
                    classProductsData(nextData);
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
            課程(4)
          </div>
        </div>
        {/*  */}
        {classData.map((element) => {
          return (
            <div className="row" key={element.id}>
              {/* 叉叉 */}
              {/* <div class="delete"></div> */}
              <div className="col-4 p-0">
                <img
                  src="/images/Rectangle 143.jpg"
                  alt=""
                  style={{ objectFit: "cover", height: "100%", width: "121px" }}
                />
              </div>
              <div className="col-8 pb-3 pt-2">
                <div className={`${ClassStyles.fc} row mt-1`}>
                  <div className="col-9 ps-2">{element.name}</div>
                  <div className="col ps-4">
                    <img
                      src="/images/Frame 40118.png"
                      className={`${ClassStyles.plus}`}
                      alt=""
                      onClick={() => {
                        const nextData = classData.filter((v, i) => {
                          return v.id !== element.id;
                        });
                        classProductsData(nextData);
                      }}
                    />
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
                    <span className={`${ClassStyles.mobileFc} text-center`}>
                      {" "}
                      人數{" "}
                    </span>
                    <div className={`${ClassStyles.add}`}>
                      <span
                        className={`${ClassStyles.plus} ${ClassStyles.fc}`}
                        onClick={() => {
                          const nextCount = element.count - 1;
                          if (nextCount === 0) {
                            remove(element.id);
                          } else {
                            decrease(element.id);
                          }
                        }}
                      >
                        -
                      </span>
                      <span>{element.count}</span>
                      <span
                        className={`${ClassStyles.plus} ${ClassStyles.fc}`}
                        onClick={() => {
                          increase(element.id);
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
                      {element.count * element.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="row" style={{ border: "1px solid #d9d9d9" }}>
          <div className="col py-2">
            <div className={`${ClassStyles.fb} row ps-3 pb-2`}>
              {" "}
              折價券代碼、折價券 :{" "}
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
          <div className={`${ClassStyles.fb} col`}>課程結帳金額 :</div>
          <div
            className={`${ClassStyles.fc} col`}
            style={{ marginLeft: "-100px" }}
          >
            {/* 计算总价 */}$
            {classData.reduce(
              (total, product) => total + product.count * product.price,
              0
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Class;
