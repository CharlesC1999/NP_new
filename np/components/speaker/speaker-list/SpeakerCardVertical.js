import React from "react";
import styles from "./SpeakerCardVertical.module.scss"

function SpeakerCardVertical(props) {
  return( <Link href={`/speaker/detail?sid=${props.id}`} className={styles.speakerCardLink}>
  <div className={styles.speaker}>
    <div className={styles.speakerImg}>
      <img src={`/speaker-image/${props.img}`} alt />
    </div>
    <div className={styles.speakerName}>
      <h5>戴于益</h5>
      <h6>米其林藍帶 CEO</h6>
    </div>
  </div>
</a>
)
}
   
export default SpeakerCardVertical