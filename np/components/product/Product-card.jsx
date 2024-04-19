import React, { useState } from "react";
import styles from "./Product-card.module.css";

function ProductCard() {

  return(
    <>
        <div className={styles.card1}>
            <div className={styles.card1Img}>
                <a href=""><img src="/index-images/image2.png" alt="..." /></a>
            </div>
            <div className={`${styles.card1Body} py-3`}>
                <h5 className={styles.card1Titlea}><a href="">煙燻鮭魚</a></h5>
                <div className={`d-flex justify-content-between ${styles.card1Heart}`}>
                    <div className={`d-flex ${styles.heartIcon}`}>
                       <i className={`py-1 fa-solid fa-star ${styles.starColor}`} /> 
                        <p>(4.0)</p>

                    </div>
                    <div className={`pr-3`}>
                        <button className={styles.iconButton} type="button"><i className={`fa-sharp fa-regular fa-heart ${styles.heartColor}`} /></button>
                    </div>
                </div>
                <div className={`d-flex justify-content-between ${styles.card1Text}`}>
                    <div className={`d-flex`}>
                        <h6>NT$ 600</h6>
                        <p>$ 300</p>
                    </div>
                    <div>
                        <button className={`${styles.card1Btn} ${styles.iconButton}`} type="button"><i className="fa-solid fa-cart-shopping"/></button>
                    </div>
                </div>
            </div>
        </div>

    </>
     )
}

export default ProductCard