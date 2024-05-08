import React, { useState } from "react";
import styles from "@/styles/Product/ProductCardList.module.css";
import FavIconProduct from "../favor/FavIconProduct";
function ProductCardList({
    id,
    name,
    price,
    img,
    average_rating,
  }) {

  return(
    <>
       <div className={`${styles.card1List} d-flex`}>
            <div className={styles.card1ListImg}>
                <a href><img src="/index-images/image1.png" className="" alt="..." /></a>
            </div>
            <div className={styles.card1BodyList}>
                <h6 className={styles.card1Title}><a href="">{name}</a></h6>
                <div className={`${styles.card1Heart} d-flex justify-content-between`}>
                    <div className={`${styles.heartIcon} d-flex`}>
                        <button disabled className={`${styles.iconButton} pb-3`} type><i className={`fa-solid fa-star ${styles.starColor}`} /></button> 
                        <p>({average_rating})</p>
                    </div>
                    <div className>
                          <FavIconProduct id={id} />
                    </div>
                </div>
                <div className={`${styles.card1Text} d-flex justify-content-between`}>
                    <div className="d-flex">
                        <h6>{price}</h6>
                    </div>
                    <div>
                        <button className={`${styles.card1Btn} ${styles.iconButton}`} type="button"><i className="fa-solid fa-cart-shopping" /></button>
                    </div>
                </div>
            </div>
        </div>


    </>
     )
}

export default ProductCardList