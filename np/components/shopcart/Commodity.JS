// import React, { useState } from "react";
import CommodityStyles from "./commodity.module.css";
// 加上context鉤子
import { useCart } from "@/hooks/use-cart";
// import Check from "@/components/checkbox-custom/CheckBoxCustom";

// 綠色勾勾
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckBoxStyle from "@/components/checkbox-custom/CheckBoxCustom.module.scss";

// import Check from "../../public/images/products";
const Commodity = () => {
  const {
    productItems,
    increaseProduct,
    decreaseProduct,
    removeProduct,
    setProductItems,
  } = useCart();
  // const { totalProduct, totalProductPrice,set } = useCart();
  //  勾勾
  const [checked, setChecked] = useState(false);

  const [allChecked, setAllChecked] = useState(false);

  console.log(productItems);
  // console.log("Product image path:", element.image); // 检查图片路径是否正确

  // 處理商品勾選
  const handleCheck = (id) => {
    const nextProducts = productItems.map((v) => {
      if (v.id === id) {
        return { ...v, checked: !v.checked };
      } else {
        return v;
      }
    });
    setProductItems(nextProducts);
  };

  // 全選的核取方塊用的事件處理函式
  const handleToggleCheckedAll = (e) => {
    const nextProducts = productItems.map((v, i) => {
      // 強制所有選項物件的checked屬性，和全選的e.target.checked完全一致
      return { ...v, checked: e.target.checked };
    });

    // 狀態修改通用第3步
    setProductItems(nextProducts);
  };

  // 最終要送出的訂單
  const finalProduct = productItems.filter((v) => v.checked);
  console.log(finalProduct);

  console.log(productItems);
  // 結束處理商品勾選

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
            <div className="pt-2">
              {/* 綠色勾勾 */}
              {/* // 全選的checkbox */}
              <div className={CommodityStyles["checkbox-wrapper"]}>
                <FaCheck
                  style={{ fontSize: "16px" }}
                  className={`${CommodityStyles["fa-check"]} ${
                    productItems.every((v) => v.checked) ? "d-block" : "d-none"
                  } ${productItems.length === 0 ? "d-none" : ""} `}
                />
                <input
                  checked={productItems.every((v) => v.checked)}
                  onClick={handleToggleCheckedAll}
                  type="checkbox"
                  className={`${CommodityStyles["test"]} ${
                    productItems.length === 0
                      ? ""
                      : productItems.every((v) => v.checked)
                      ? CommodityStyles.checked
                      : " "
                  } `}
                />
              </div>
            </div>

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
            數量
          </div>
          <div
            className={`${CommodityStyles.fc} col text-center align-self-center fw-bold`}
          >
            價格
          </div>
          <div
            className={`${CommodityStyles.fc} col text-center align-self-center fw-bold`}
          >
            小計
          </div>
          <div
            className={`${CommodityStyles.fc} col text-center align-self-center fw-bold`}
          >
            刪除
          </div>
        </div>

        {productItems.map((element, index) => {
          return (
            <div className="row" key={element.id}>
              <div
                className="col d-flex align-items-center justify-content-start ps-3"
                style={{ width: 100, minWidth: 77 }}
              >
                {/* // 勾勾 */}
                <div className={CommodityStyles["checkbox-wrapper"]}>
                  <FaCheck
                    style={{ "font-size": "16px" }}
                    className={`${CommodityStyles["fa-check"]}  ${
                      element.checked ? "d-block" : "d-none"
                    }`}
                  />
                  <input
                    onChange={() => {
                      handleCheck(element.id);
                    }}
                    checked={element.checked}
                    type="checkbox"
                    className={`${CommodityStyles["test"]} ${
                      element.checked ? CommodityStyles.checked : ""
                    }`}
                  />
                </div>
              </div>
              <div className="col-2 d-flex align-items-center justify-content-center">
                {element.image || (element.img && element.img[0]) ? (
                  <img
                    src={`/images/products/${
                      element.image || element.img[0] || element.img.image_url
                    }`}
                    className="img-fluid"
                    alt={element.name || "Default name"}
                    style={{ minWidth: 75 }}
                  />
                ) : (
                  <span>No image available</span>
                )}
                {/* console.log({`/images/products/${element.image}`}) */}
              </div>
              <div className="col-3 align-self-center text-center px-4">
                <h4 className={CommodityStyles.fc}>{element.name}</h4>
              </div>
              <div
                className={`${CommodityStyles.add} col align-self-center text-center`}
              >
                {" "}
                {/* <div class="add d-flex align-items-center"> */}
                <span
                  onClick={() => {
                    decreaseProduct(element.id);
                  }}
                  className={`${CommodityStyles.plus}`}
                >
                  -
                </span>
                <span>
                  {element.qty}
                  {/* {element.quantity} */}
                </span>
                <span
                  onClick={() => {
                    increaseProduct(element.id);
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
                {element.qty * element.price}
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
                    removeProduct(element.id);
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

        {productItems.map((element, index) => {
          return (
            <div className="row" key={element.id}>
              {/* 叉叉 */}
              {/* <div class="delete"></div> */}
              <div className="col-4 p-0">
                {element.image || (element.img && element.img[0]) ? (
                  <img
                    src={`/images/products/${element.image || element.img[0]}`}
                    className="img-fluid"
                    alt={element.name || "Default name"}
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "121px",
                    }}
                  />
                ) : (
                  <span>No image available</span>
                )}
              </div>
              <div className="col-8 pb-3 pt-2">
                <div className={`${CommodityStyles.fc} mt-1 row`}>
                  <div className="col-9 ps-4">{element.name}</div>
                  <div className="col ps-4">
                    <img
                      src="/images/Frame 40118.png"
                      alt=""
                      onClick={() => {
                        removeProduct(element.id);
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
                      數量{" "}
                    </span>
                    <div className={`${CommodityStyles.add}`}>
                      <span
                        className={`${CommodityStyles.fc}`}
                        onClick={() => {
                          decreaseProduct(element.id);
                        }}
                      >
                        -
                      </span>
                      <span>{element.qty}</span>
                      <span
                        className={`${CommodityStyles.fc}`}
                        onClick={() => {
                          increaseProduct(element.id);
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
                      {element.qty * element.price}
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

        {/* <div
          className="row py-2"
          style={{ border: "1px solid #d9d9d9", borderTop: 0 }}
        >
          <div className={`${CommodityStyles.fb} col`}>產品結帳金額 :</div>
          <div
            className={`${CommodityStyles.fc} col`}
            style={{ marginLeft: "-100px" }}
          >
            {totalProductPrice} */}
        {/* $ */}
        {/* {productData.reduce(
              (total, product) => total + product.count * product.price,
              0
            )} */}
        {/* </div>
        </div> */}
        {/* </footer> */}
      </main>
    </>
  );
};

export default Commodity;
