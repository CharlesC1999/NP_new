import React from "react";
import styles from "@/components/product/sideBar/CateSidebar.module.css";
import Link from "next/link";
Link;

function CateSidebar({ cateName, onClick, catePng }) {
  return (
    <>
      <div onClick={onClick} className="d-flex gap-3 flex-column mt-3">
        <div className={`d-flex ${styles.sideBox}`}>
          <div className={styles.sideImg}>
            <a href="" className="mx-1">
              <img src={`/index-images/${catePng}`} alt />
            </a>
          </div>
          <div className={styles.sideText}>
            <a href="">
              <h6 className={styles.left}>{cateName}</h6>
            </a>
            <h6 className={styles.right}>∞</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default CateSidebar;
