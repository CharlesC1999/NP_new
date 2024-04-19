import React from "react";
import styles from "./FavorTabs.module.css";

function FavorTabs() {
  return (
    <div className={styles.tabs}>
      <div className={`${styles.tab} ${styles.active}`}>食譜</div>
      <div className={styles.tab}>課程</div>
      <div className={styles.tab}>商品</div>
    </div>
  );
}

export default FavorTabs;
