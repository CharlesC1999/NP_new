import React from "react";
import styles from "./toTheTop.module.scss";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 滑動效果
  });
};

export default function ToTheTop() {
  return (
    <>
      <button onClick={scrollToTop} className={styles.backToTop}>
        <img src="/images/toTheTopImg.png" className={styles.backToTopImg} />
      </button>
    </>
  );
}
