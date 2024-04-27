import React from "react";
import styles from "@/components/product/sideBar/CateSidebar.module.css";

function CateSidebar() {
  return (
    <>
      <div className="d-flex gap-3 flex-column mt-3">
        <div className={`d-flex ${styles.sideBox}`}>
          <div className={styles.sideImg}>
            <a href="">
              <img src="/index-images/category-1.png" alt />
            </a>
          </div>
          <div className={styles.sideText}>
            <a href="">
              <h6 className={styles.left}>乳製品</h6>
            </a>
            <h6 className={styles.right}>3</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default CateSidebar;
