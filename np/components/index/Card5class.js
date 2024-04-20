import React from "react";
import styles from "./Card5class.module.css";

function Card5class() {
  return(
    <>
    <div>
        <div className={`${styles.card5}`}>
            <div className={`d-flex`}>
                <div className={`${styles.card5Img}`}>
                    <img src="/index-images/Herosection02.png" alt=""/>
                </div>
                <div className={`${styles.card5Text}`}>
                    <div className={`${styles.card5TextRwd}`}>
                        <h5>手作情人節大餐質感餐桌感餐桌感餐桌</h5>
                    </div>
                    <h6>食物造型師</h6>
                    <p className={`${styles.BorderP}`}>有機敏豆(四季豆)－古坑
                        古坑的有機敏豆(四季豆)是經過有機認證的高品質蔬菜，栽培過程中不使用農藥，確保食材的安全。敏豆的嫩莢爽脆，富含纖維和維生素，是營養均衡飲食的佳選。以古坑的有機敏豆，為您的餐桌增添清新的味道。
                    </p>
                    <div className={`${styles.card5P}`}>
                        <p>課程定價&emsp;<span className={`${styles.LineP}`}>$ 300</span></p>
                        <p>課程時間&emsp;03月02日(六) 14:30-17:00</p>
                        <p>限時優惠&emsp;<span className={`${styles.ColorP}`}>$ 2000</span></p>
                    </div>
                    <button className={`btn btn-success ${styles.card5Btn}`}>了解更多</button>
                </div>
            </div>
        </div>
    </div>
    </>
     )
}

export default Card5class