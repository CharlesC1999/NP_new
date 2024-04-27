import { useState, useEffect } from "react";

//styles
import "bootstrap/dist/css/bootstrap.min.css";
import style from "@/styles/Product/products.module.scss";

export default function ProductSection01() {
  return (
    <>
      <div className={`${style["detail-list"]}flex-column`}>
        <div className={`d-flex flex-column`}>
          <h5 className={`${style["h5"]}`}>商品簡介</h5>
          <p className={`${style["detail-text"]}`}>
            以純海水放養的虱目魚，無土味且營養價值高。產地位於紅樹林溼地，水中含豐富有機質及浮游生物，提供充分的天然養份。生態養殖虱目魚活動力高，因而肉質極富彈性，肉色偏粉紅，是老饕心中的夢幻滋味。
          </p>
        </div>
        <div className={`${style["big-truck-text-box"]} d-flex flex-column`}>
          <h5 className={`${style["h5"]}`}>配送說明</h5>
          <div className={`${style["truck-text-box"]} d-flex flex-row pb-3`}>
            <div className={`${style["truck-titel"]} me-5`}>寄送時間</div>
            <div className={`${style["truck-text"]}`}>
              預計訂單成立後7個工作天內送達不含週六日及國定假日。如廠商有約定日將於約定日期內送達，約定日期需於訂單成立後14天內。
            </div>
          </div>
          <div className={`${style["truck-text-box"]} d-flex flex-row pb-3`}>
            <div className={`${style["truck-titel"]} me-5`}>送貨方式</div>
            <div className={`${style["truck-text"]}`}>
              透過宅配或是郵局送達。消費者訂購之商品若經配送兩次無法送達，再經本公司以電話與E-mail均無法聯繫逾三天者，本公司將取消該筆訂單，並且全額退款。
            </div>
          </div>
          <div className={`${style["truck-text-box"]} d-flex flex-row pb-3`}>
            <div className={`${style["truck-titel"]} me-5`}>送貨範圍</div>
            <div className={`${style["truck-text"]}`}>
              限台灣本島地區。注意！收件地址請勿為郵政信箱。若有台灣本島以外地區送貨需求，收貨人地址請填台灣本島親友的地址。
            </div>
          </div>
        </div>
        <div className={`d-flex flex-column`}>
          <h5 className={`${style["h5"]}`}>注意事項</h5>
          <p className={`${style["truck-text"]}`}>
            以純海水放養的虱目魚，無土味且營養價值高。產地位於紅樹林溼地，水中含豐富有機質及浮游生物，提供充分的天然養份。生態養殖虱目魚活動力高，因而肉質極富彈性，肉色偏粉紅，是老饕心中的夢幻滋味。
          </p>
        </div>
      </div>
    </>
  );
}
