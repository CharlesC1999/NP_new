import { useState, useEffect } from "react";

//styles
import style from "@/styles/Product/products.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";
import FavIconProduct from "../favor/FavIconProduct";

// 加入全域鉤子
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/use-cart";

const notifyBtn = () => toast("已加入購物車 🛒");

function ProductMainText({
  id,
  name,
  price,
  description,
  discount_price,
  review_comments,
  average_rating,
  img, // 取第一個元素
  qty,
  upload_date,
  handleReviewCount,
}) {
  const reviewCount = review_comments.length;
  // 加入全域鉤子
  const { favorClass, auth, setAction } = useAuth();
  const { addProduct } = useCart();
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <div className={`${style["product-text"]} d-flex flex-column`}>
        <div className={`${style["h3"]} mb-3`}>{name}</div>
        <p className={`${style["p"]} my-2`}>{description}</p>
        {discount_price ? (
          <>
            <div className={`${style["d-price"]}`}>${price}</div>
            <div className={`${style["price"]}`}>${discount_price}</div>
          </>
        ) : (
          <div className={`${style["price"]}`}>${price}</div>
        )}
        <div
          className={`${style["star-row"]} d-flex flex-row my-2 align-items-center justify-content-between`}
        >
          <div
            className={`${style["star"]} pe-2 d-flex flex-row align-items-center justify-content-between`}
          >
            <div>
              <i className={`fa-solid fa-star`} />
              {average_rating}
            </div>
            <div className={`${style["star-text"]} ps-2 `}>
              ({reviewCount}則評論)
            </div>
          </div>
          <FavIconProduct id={id} />
        </div>
        <input
          className={`${style["amount"]} ps-4 my-2`}
          type="number"
          defaultValue={1}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button
          type="submit"
          className={`${style["buy-btn"]}  my-2 btn d-flex justify-content-center align-items-center`}
          // onClick={notifyBtn}
          onClick={() => {
            if (!auth.isLoggedIn) {
              return toast.error("請先登入再使用!");
            }
            notifyBtn();
            addProduct({
              id,
              name,
              price,
              description,
              discount_price,
              img,
              qty: quantity,
            });
            console.log("Adding product:", {
              id,
              name,
              price,
              img: img[0],
              qty,
            });
          }}
        >
          &nbsp;&nbsp;加入購物車{" "}
          <i
            className={`${style["fa-cart-shopping"]} fa-solid fa-cart-shopping ms-2`}
          ></i>
        </button>
      </div>
    </>
  );
}

export default ProductMainText;
