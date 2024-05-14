import React from "react";
import styles from "./Card4Hot.module.css";
import "@fortawesome/fontawesome-free/css/all.css";
import FavIconProduct from "../favor/FavIconProduct";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/use-cart";

import toast, { Toaster } from "react-hot-toast";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function Card4Hot({ id, name, price, d_price, image }) {
  const { favorClass, auth, setAction } = useAuth();
  const { addProduct } = useCart();

  const MySwal = withReactContent(Swal);

  const notify = (productName) => {
    MySwal.fire({
      title: "成功加入",
      text: productName + "已成功加入購物車!",
      icon: "success",
    });
  };
  return (
    <>
      <div className={`${styles["card4"]}`}>
        <div className={`${styles["card4Img"]}`}>
          <a href={`/product/${id}`}>
            <img
              src={`/images/products/${image}`}
              className="{`${styles['card4ImgTop']}`}"
              alt="..."
            />
          </a>
        </div>
        <div className={`${styles["card4Body"]}`}>
          <h5 className={`${styles["card4Title"]}`}>{name}</h5>
          <div className={`d-flex ${styles["card4Content"]}`}>
            <div className={`d-flex ${styles["card4Text"]}`}>
              <p>$ {price}</p>
              <h6>NT$ {d_price}</h6>
            </div>
            <div>
              <FavIconProduct id={id} />
            </div>
          </div>

          {/* <a className={`d-flex ${styles["card4Btn"]}`} type="button" href="#">
             <i className="fa-solid fa-cart-shopping"></i>加入購物車 */}

          <a
            className={`d-flex ${styles["card4Btn"]}`}
            type="button"
            href="#"
            onClick={() => {
              if (!auth.isLoggedIn) {
                return toast.error("請先登入再使用!");
              }

              notify(name);
              console.log("Adding product:", {
                id,
                name,
                price: d_price,
                image,
              });
              addProduct({ id, name, price: d_price, image });
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i>加入購物車
          </a>
        </div>
      </div>
    </>
  );
}

export default Card4Hot;
