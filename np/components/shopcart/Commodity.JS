import React, { useState } from "react";
import CommodityStyles from "./commodity.module.css";

const Commodity = () => {
  const classIndex = [
    { id: 0, count: 1, name: "肉桂捲初級班", price: 1500 },
    { id: 1, count: 1, name: "cake初級班", price: 1200 },
    { id: 2, count: 1, name: "肉捲初級班", price: 1000 },
  ];
  const [classData, classProductsData] = useState(classIndex);

  const prodcts = [
    { id: 0, count: 1, name: "肉桂捲", price: 1500 },
    { id: 1, count: 1, name: "meet", price: 1200 },
    { id: 2, count: 1, name: "肉捲", price: 1000 },
  ];
  const [productData, setProductsData] = useState(prodcts);

  // const [quantity,setQuantity] = useState(0)
  const increase = (id) => {
    // setQuantity(quantity + 1)
    const addProducts = productData.map((v, i) => {
      if (v.id === id) return { ...v, count: v.count + 1 };
      else return v;
    });

    setProductsData(addProducts);
  };

  const decrease = (id) => {
    // if(quantity>0){
    //   setQuantity(quantity - 1)
    // }
    const reduceProducts = productData.map((v, i) => {
      if (v.id === id && v.count > 0) return { ...v, count: v.count - 1 };
      else return v;
    });

    setProductsData(reduceProducts);
  };

  const remove = (id) => {
    const removeProduct = productData.filter((v, i) => {
      return v.id !== id;
    });

    setProductsData(removeProduct);
  };

  return (
    <>
      {/* 商品欄位 桌機樣式 */}
      <main
        className={`${CommodityStyles.main} mt-5 mb-2 fw-bold ${CommodityStyles.desk} `}
        style={{ color: "#50bf8b" }}
      >
        商品
      </main>

      {/*  */}

      <main
        className={`${CommodityStyles.ProductBorder} ${CommodityStyles.main} ${CommodityStyles.desk}`}
      >
        <div className={`${CommodityStyles.topBar} row `}>
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
            <label className={`${CommodityStyles.fc}  m-1 fw-bold`} htmlFor="">
              {" "}
              全選{" "}
            </label>
          </div>
          <div className="col-2" />
          <div
            className={`${CommodityStyles.fc} col-3 text-center align-self-center fw-bold`}
          >
            產品名稱
          </div>
          <div
            className={`${CommodityStyles.fc} col text-center align-self-center fw-bold`}
          >
            人數
          </div>
          <div
            className={`${CommodityStyles.fc} col text-center align-self-center fw-bold`}
          >
            價格
          </div>
          <div
            className={`${CommodityStyles.fc} col text-center align-self-center fw-bold`}
          >
            小記
          </div>
          <div
            className={`${CommodityStyles.fc} col text-center align-self-center fw-bold`}
          >
            刪除
          </div>
        </div>

        {productData.map((element) => {
          return (
            <div className="row" key={element.id}>
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
                <h4 className={CommodityStyles.fc}>{element.name}</h4>
              </div>
              <div
                className={`${CommodityStyles.add} col align-self-center text-center`}
              >
                {" "}
                {/* <div class="add d-flex align-items-center"> */}
                <span
                  onClick={() => {
                    const nextCount = element.count - 1;
                    if (nextCount === 0) {
                      remove(element.id);
                    } else {
                      decrease(element.id);
                    }
                  }}
                  className={`${CommodityStyles.plus}`}
                >
                  -
                </span>
                <span>{element.count}</span>
                <span
                  onClick={() => {
                    increase(element.id);
                  }}
                  className={`${CommodityStyles.plus}`}
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
                  className={`${CommodityStyles.plus}`}
                  alt=""
                  onClick={() => {
                    const nextData = productData.filter((v, i) => {
                      return v.id !== element.id;
                    });
                    setProductsData(nextData);
                  }}
                />
              </div>
            </div>
          );
        })}
      </main>

      {/* 商品欄位 手機樣式*/}
      <main
        className={`${CommodityStyles.main} ${CommodityStyles.ProductBorder} ${CommodityStyles.mobile}`}
      >
        <div className={`${CommodityStyles.topBar} row `}>
          <div
            className={`${CommodityStyles.fc} col ps-4 `}
            style={{ fontSize: 16 }}
          >
            產品(2)
          </div>
        </div>

        {productData.map((element) => {
          return (
            <div className="row" key={element.id}>
              {/* 叉叉 */}
              {/* <div class="delete"></div> */}
              <div className="col-4 p-0">
                <img
                  src="/images/Rectangle 143.jpg"
                  alt=""
                  className=""
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    weight: "121px",
                  }}
                  onClick={() => {
                    const nextData = productData.filter((v, i) => {
                      return v.id !== element.id;
                    });
                    setProductsData(nextData);
                  }}
                />
              </div>
              <div className="col-8 pb-3 pt-2">
                <div className={`${CommodityStyles.fc} mt-1 row`}>
                  <div className="col-9 ps-4">{element.name}</div>
                  <div className="col ps-4">
                    <img
                      src="/images/Frame 40118.png"
                      alt=""
                      onClick={() => {
                        const nextData = productData.filter((v, i) => {
                          return v.id !== element.id;
                        });
                        setProductsData(nextData);
                      }}
                      className={`${CommodityStyles.plus}`}
                    />
                  </div>
                </div>
                <div className="row mt-1">
                  <span
                    className="col-5"
                    style={{ fontSize: "16px", color: "transparent" }}
                  >
                    課程時間:
                  </span>
                  <span
                    className="col-5"
                    style={{
                      marginLeft: "-25px",
                      fontSize: "14px",
                      color: "transparent",
                    }}
                  >
                    2024/04/05
                  </span>
                </div>
                <div className="row mt-1">
                  <div className="col d-flex flex-column align-items-center justify-content-between">
                    <span className={`${CommodityStyles.fc} text-center`}>
                      {" "}
                      人數{" "}
                    </span>
                    <div className={`${CommodityStyles.add}`}>
                      <span
                        className={`${CommodityStyles.fc}`}
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
                        className={`${CommodityStyles.fc}`}
                        onClick={() => {
                          increase(element.id);
                        }}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="col d-flex flex-column align-items-center justify-content-between">
                    <span className={`${CommodityStyles.fc} text-center`}>
                      價格
                    </span>
                    <span className={`${CommodityStyles.fb}`}>
                      {element.count * element.price}
                    </span>
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
          );
        })}
        {/* <footer> */}
        <div className="row" style={{ border: "1px solid #d9d9d9" }}>
          <div className="col py-2">
            <div className={`${CommodityStyles.fb} row ps-3 pb-2`}>
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
          <div className={`${CommodityStyles.fb} col`}>課程結帳金額 :</div>
          <div
            className={`${CommodityStyles.fc} col`}
            style={{ marginLeft: "-100px" }}
          >
            $
            {productData.reduce(
              (total, product) => total + product.count * product.price,
              0
            )}
          </div>
        </div>
        {/* </footer> */}
      </main>
    </>
  );
};

export default Commodity;
