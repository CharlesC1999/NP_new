import React from "react";
import styles from "./MclassDetailContentArticleWeb.module.css";

const ClassIntroMobile = ({ image }) => {
  return (
    <div className={styles.imageTextSetMobile}>
      <div className={styles.classIntroImageContainerMobile}>
        <img
          src={`/images/class-images/${image.Image_URL}`}
          alt
          className={styles.classIntroImageMobile}
        />
      </div>
      <div className={styles.classIntroTextMobile}>{image.Description}</div>
    </div>
  );
};

export default ClassIntroMobile;
