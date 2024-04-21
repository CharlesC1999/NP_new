import React from "react";
import styles from "./SpeakerCardVertical.module.scss"

function SpeakerCardVertical() {
  return( <a href="#" className={styles.speakerCardLink}>
  <div className={styles.speaker}>
    <div className={styles.speakerImg}>
      <img src="/speaker-image/lecturer16.jpg" alt />
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