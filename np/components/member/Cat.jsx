import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Cat.module.css";


function Cat(){
  return (
<>
  <div className={styles.couponcat}>
  <div className={styles.ccathover}><a href>全部</a></div>
  <div className={styles.ccat}><a href>可使用</a></div>
  <div className={styles.ccat}> <a href>已使用</a></div>
  <div className={styles.ccat}><a href>已失效</a></div>
</div>
</>
)
}

export default Cat
