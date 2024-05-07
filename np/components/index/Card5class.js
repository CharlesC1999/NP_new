import React from "react";
import styles from "./Card5class.module.css";
import Link from "next/link";
function Card5class({id,name,speaker_name,description,date,price,d_price,image,speaker_title}) {
  return (
    <>
        <div className={`${styles.card5}`}>
          <div className={`d-flex`}>
            <div className={`${styles.card5Img}`}>
              <img src={`/images/class-images/${image}`}alt="" />
            </div>
            <div className={`d-flex ${styles.card5Text}`}>
              <div className={`${styles.card5TextRwd}`}>
                <h5>{name}</h5>
                          </div>
                          <div className={`d-flex`}>
                          <h6>{speaker_title}</h6>&ensp;
                          <h6>{speaker_name}</h6>
                          </div>
              <p className={`${styles.BorderP}`}>
             {description}
              </p>
              <div className={`${styles.card5P}`}>
                <p className={styles.lectureTime}>課程時間&emsp;{date}</p>
                <p>
                  課程定價&emsp;<span className={`${styles.LineP}`}>{price}</span>
                </p>
                <p>
                  限時優惠&emsp;
                  <span className={`${styles.ColorP}`}>$ {d_price}</span>
                </p>
              </div>
              <Link href={`class-page/class-detail?class__i_d=${id}`} className={`btn btn-success ${styles.card5Btn}`}>
                了解更多
              </Link>
            </div>
          </div>
        </div>
    </>
  );
}

export default Card5class;
