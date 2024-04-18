import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./buycard.module.css";


function Buycard(){
  return (
  <>
  <div className={styles.buyCard}>
  <div className={styles.buyCardContent}>
    <div className={styles.bccolumn}>
      <div className={styles.bcimg} />
    </div>
    <div className={styles.bccolumn2}>
      <div className={styles.buyItem}>
        <div className={styles.buyItemMain}>
          <div className={styles.biContent}>新鮮 蔬菜 </div>
          <div className={styles.biNumber}>商品規格數量..... </div>
          <div className={styles.biState}>狀態 : 待收貨</div>
        </div>
        <div className={styles.biMb }>
          <div className={styles.biMoney}>訂單金額: $200</div>
          <a href className={`${styles.buyCardBtn} btn` }>查看詳情</a>
        </div>
      </div>
    </div>
  </div>
</div>
</>)
}

export default Buycard

