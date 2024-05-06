import React from "react";
import styles from "@/components/product/sideBar/CateSidebar.module.css";

function CateSidebar({ cateName, onClick }) {
  return (
    <>
      <div onClick={onClick} className="d-flex gap-3 flex-column mt-3">
        <div className={`d-flex ${styles.sideBox}`}>
          <div className={styles.sideImg}>
            <a href="">
              <img src="/index-images/category-1.png" alt />
            </a>
          </div>
          <div className={styles.sideText}>
            <a href="">
              <h6 className={styles.left}>{cateName}</h6>
            </a>
            <h6 className={styles.right}></h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default CateSidebar;
