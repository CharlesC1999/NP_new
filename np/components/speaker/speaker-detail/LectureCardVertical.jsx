import React from "react";
import styles from "./LectureCardVertical.module.css";
function LectureCardVertical() {
  return(<div className={`${styles.lecture} ${styles.boxShadow}`}>
  <div className={styles.lectureImg}>
    <img src="/lecture-image/bg-class3.jpg" alt />
  </div>
  <div className={styles.lectureCardBody}>
    <h5>質感餐桌基礎手機攝影</h5>
    <p>
      辛苦了一整周，週五晚上最適合來上一些邪惡美食搭配啤酒！擅長將複雜的料理簡單化的咚咚老師，這次要教大家用最輕鬆簡便的方式複製韓式酒館中的經典放縱料理！
      洋釀炸雞 (實作) 邪惡部隊鍋(示範)
      韓國炸雞酥脆的外皮加上濃稠的甜辣醬汁讓人欲罷不能，但是在家使用了大量的油油炸過後，剩下的油只能丟掉，對於一次只做幾人份的家庭來說相當不划算。咚咚老師要教大家不用油炸也能做出酥脆炸雞的做法，搭配秘製韓國洋釀醬汁比例，在家輕鬆就能享用「半半炸雞」！
      在韓式料理中獨具風格的部隊鍋，最標誌性的就是橘紅色的湯頭配上韓國泡麵及半融化的起司，讓人看了口水直流！將老師的特調湯底比例記下來，煮出一鍋辛香濃郁的鍋物其實一點都不難，在家煮還能盡情加入自己喜歡的火鍋料，澎湃的一鍋也相當聚餐時適合端出來款待家人朋友！
    </p>
    <a href="#" role="button" className={styles.btn}>
      {" "}
      立刻報名
    </a>
  </div>
</div>)
}

export default LectureCardVertical