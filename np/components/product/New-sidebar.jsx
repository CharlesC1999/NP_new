import React from "react";
import styles from "./New-sidebar.module.css";

function Newsidebar() {
  return(
    <>
    <div className={`d-flex ${styles.hotBox}`}>
        <div className={styles.hotImg}>
            <a href=""><img src="/index-images/thumbnail-4.png" alt /></a>
        </div>
        <div className={styles.hotText}>
            <a href="">
                <h6 className={styles.hotTitle}>芒果汁</h6>
            </a>
            <h6 className>$ 99</h6>
        </div>
    </div>

    </>
  )
}

export default Newsidebar


