import React from "react";
import styles from "./card2.module.css";

function Card2() {
  return(
    <>
     
        <div className={styles.card2Box}>
            <div className={styles.card2BoxImg}>
                <img src="/index-images/Vector.png" alt="" />
            </div>
            <div className={`${styles.card2BoxText}`}>
                <h6>喚醒身心的天然食材</h6>
                <div className={`${styles.card2h6}`}>
                    <p>減去農藥殘留的擔憂，我們從源頭嚴格把關，只為給您純淨無憂的每一口</p>
                </div>
                <a href="" className={`btn btn-outline-success ${styles.card2btn}`} type="button">
                    新鮮食材 →
                </a>
            </div>
        </div>
  
    </>
     )
}

export default Card2