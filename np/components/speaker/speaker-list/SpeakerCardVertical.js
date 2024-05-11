import React from "react";
import styles from "./SpeakerCardVertical.module.scss"
import Link from "next/link"

function SpeakerCardVertical({ name, title, id, img, cate }) {
  const getColorByCategory = (category) => {
    switch (category) {
      case "中式料理":
        return '#2F9FE1';
      case "西式料理":
        return '#F8B11B';
      case "異國風味":
        return '#D44636';
      case "療癒點心":
        return '#F18795';
      case "健康蔬食":
        return '#578B6A';
    }
  }
    return (<Link href={`/speaker/speaker-detail?sid=${id}`} className={styles.speakerCardLink}>
      <div className={styles.speaker}>
        <div className={styles.speakerImg}>
          <div className={styles.speakerTag} style={{ background: getColorByCategory(cate) }}>
            <div className={styles.tagText}>{cate}</div>
            </div>
          <img src={`/speaker-image/${img}`} alt />
        </div>
        <div className={styles.speakerName}>
          <h5>{name}</h5>
          <h6>{title}</h6>
        </div>
      </div>
    </Link>
    )
  }
   
export default SpeakerCardVertical