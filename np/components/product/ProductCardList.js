import React, { useState } from "react";
import styles from "./ProductCardList.module.css";

function ProductCardList() {

  return(
    <>
       <div className={`${styles.card1List} d-flex`}>
            <div className={styles.card1ListImg}>
                <a href><img src="/index-images/image1.png" className="" alt="..." /></a>
            </div>
            <div className={styles.card1BodyList}>
                <h6 className={styles.card1Title}><a href="">煙燻鮭魚</a></h6>
                <div className={`${styles.card1Heart} d-flex justify-content-between`}>
                    <div className={`${styles.heartIcon} d-flex`}>
                        <button disabled className={`${styles.iconButton} pb-3`} type><i className={`fa-solid fa-star ${styles.starColor}`} /></button> 
                        <p>(4.0)</p>
                    </div>
                    <div className>
                        <button className={styles.iconButton} type="button"><i className={`fa-sharp fa-regular fa-heart ${styles.heartColor}`} /></button>
                    </div>
                </div>
                <div className={`${styles.card1Text} d-flex justify-content-between`}>
                    <div className="d-flex">
                        <h6>NT$ 600</h6>
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