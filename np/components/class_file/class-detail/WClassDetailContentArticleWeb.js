import React from "react";
import styles from "./WclassDetailContentArticleWeb.module.css";
// import db from "#configs/mysql.js";

const ArticleSetWeb = ({ image }) => {
  return (
    <div className={styles.imageTextSet}>
      <div className={styles.classIntroImageContainer}>
        <img
          src={`/images/class-images/${image.Image_URL}`}
          alt
          className={styles.classIntroImage}
        />
      </div>
      <div className={styles.classIntroText}>{image.Description}</div>
    </div>
  );
};

export default ArticleSetWeb;
