import React from "react";
import styles from "./Card5class.module.css";

function Card5class() {
  return (
    <>
        <div className={`${styles.card5}`}>
          <div className={`d-flex`}>
            <div className={`${styles.card5Img}`}>
              <img src="/lecture-image/bg-class3.jpg" alt="" />
            </div>
            <div className={`d-flex ${styles.card5Text}`}>
              <div className={`${styles.card5TextRwd}`}>
                <h5>草莓季！生巧克力草莓塔</h5>
                          </div>
                          <div className={`d-flex`}>
                          <h6>食物造型師</h6>&ensp;
                          <h6>施建斌</h6>
                          </div>
              <p className={`${styles.BorderP}`}>
              "當季酸香的草莓是許多人又愛又怕的水果，獨特的香氣及鮮紅的外表讓人難以抗拒，但同時也有讓人眉頭緊皺的酸味。將草莓與甜甜的食材一起品嘗，甜味平衡了草莓的酸味而留下香氣，與甜味融合的草莓甜點就成了大家都喜愛的心頭好！
              </p>
              <div className={`${styles.card5P}`}>
                <p className={styles.lectureTime}>課程時間&emsp;03月02日(六) 14:30-17:00</p>
                <p>
                  課程定價&emsp;<span className={`${styles.LineP}`}>$ 2999</span>
                </p>
                <p>
                  限時優惠&emsp;
                  <span className={`${styles.ColorP}`}>$ 2000</span>
                </p>
              </div>
              <button className={`btn btn-success ${styles.card5Btn}`}>
                了解更多
              </button>
            </div>
          </div>
        </div>
    </>
  );
}

export default Card5class;
