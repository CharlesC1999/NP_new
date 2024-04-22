import { useState, useEffect } from "react";
//FontAwsome
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//styles
import "bootstrap/dist/css/bootstrap.min.css";
import style from "@/components/product/productSection02.module.scss";

export default function ProductSection02() {
  return (
    <>
      <div className={`${style["p-comment"]}flex-column`}>
        <div className={`d-flex flex-column`}>
          <h5 className={`${style["h5"]}`}>評論</h5>
          <div className={`d-flex flex-row align-items-center`}>
            <div className={`${style["img"]}`}>
              {/* <img src="" alt="" /> */}
            </div>
            <div className={`${style["user-name"]} px-2`}>abc123</div>
          </div>
          <div className={`${style["star"]} my-2`}>
            <span className={`${style["date"]} pe-2`}>2024/04/04</span>★★★★☆
          </div>
          <p className={`${style["p"]} mb-3`}>
            以純海水放養的虱目魚，無土味且營養價值高。產地位於紅樹林溼地，水中含豐富有機質及浮游生物，提供充分的天然養份。生態養殖虱目魚活動力高，因而肉質極富彈性，肉色偏粉紅，是老饕心中的夢幻滋味。
          </p>
          <div className={`${style["detail-text"]}`}>
            <FontAwesomeIcon icon={faThumbsUp} />
            <span className={`px-2`}>5</span>
          </div>
        </div>
      </div>
    </>
  );
}
