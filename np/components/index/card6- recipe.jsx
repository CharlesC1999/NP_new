import React from "react";
import styles from "./card6-recipe.module.css";

function Card6Recipe() {
  return(
    <>
        <div className={`${styles['card6']}`}>
            <div className="d-flex">
                <div className={`${styles['card6Img']}`}>
                    <a href=""><img src="/index-images/Rectangle 2.png" alt=""/></a>
                </div>
                <div className={`${styles['card6Text']}`}>
                    <a href="">
                        <h5>手作情人節大餐</h5>
                    </a>
                    <p>一夜干午仔魚240g±10%_包
                        3包組這組一夜干午仔魚以新鮮午仔魚經過嚴格製程製成，每包240克，總共3包。透過一夜的自然風乾，保留了午仔魚的鮮味和營養價值。魚肉質鮮嫩，風味獨特，適合當零嘴或配菜，是海味愛好者的美味選擇。
                    </p>
                </div>
            </div>
    </div>
    </>
     )
}

export default Card6Recipe