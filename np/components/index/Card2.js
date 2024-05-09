import React from "react";
import styles from "./card2.module.css";

function Card2({title,description,link,image,url}) {
  return(
    <>
        <div className={styles.card2Box}>
            <div className={styles.card2BoxImg}>
                <img src={`/index-images/card02-icon/${image}`} alt="" />
            </div>
            <div className={`${styles.card2BoxText}`}>
                <h6>{title}</h6>
                <div className={`${styles.card2h6}`}>
                    <p>{description}</p>
                </div>
                <a href={url} className={`btn btn-outline-success ${styles.card2btn}`} type="button">
                    {link} →
                </a>
            </div>
        </div>
    </>
     )
}

export default Card2