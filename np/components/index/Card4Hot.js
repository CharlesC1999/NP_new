import React from "react";
import styles from "./Card4Hot.module.css";
import '@fortawesome/fontawesome-free/css/all.css';

function Card4Hot() {
  return(
    <>
        <div className={`${styles['card4']}`}>
            <div className={`${styles['card4Img']}`}>
                <a href="product.html"><img src="/index-images/image1.png" className="{`${styles['card4ImgTop']}`}" alt="..."/></a>
            </div>
            <div className={`py-2 ${styles['card4Body']}`}>
                <h5 className={`${styles['card4Title']}`}><a href="product.html">山竹</a></h5>
                <div className={`d-flex ${styles['card4Text']}`}>
                    <p>$ 300</p>&emsp;
                    <h6>NT$ 600</h6>
                </div>
                <a className={`${styles['card4Btn']}`} type="button" href=""><i className="fa-solid fa-cart-shopping"></i>&emsp;加入購物車</a>
            </div>
        </div>
    </>
     )
}

export default Card4Hot