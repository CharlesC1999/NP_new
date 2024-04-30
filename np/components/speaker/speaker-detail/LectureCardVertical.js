import React from "react";
import styles from "./LectureCardVertical.module.scss";
import Link from "next/link";
function LectureCardVertical({name,description,image,classID }) {
  return(<div className={`${styles.lecture} ${styles.boxShadow}`}>
  <div className={styles.lectureImg}>
    <img src={`/images/class-images/${image}`} alt />
  </div>
  <div className={styles.lectureCardBody}>
    <h5>{name}</h5>
    <p>
     {description}
    </p>
    <Link href={`/class-page/detail?id=${classID}`} role="button" className={styles.btn}>
      {" "}
      了解詳情
    </Link>
  </div>
</div>)
}

export default LectureCardVertical