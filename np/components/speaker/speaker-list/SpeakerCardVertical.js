import React from "react";
import styles from "./SpeakerCardVertical.module.scss"
import Link from "next/link"

function SpeakerCardVertical(props) {
  return( <Link href={`/speaker/${props.id}`} className={styles.speakerCardLink}>
  <div className={styles.speaker}>
    <div className={styles.speakerImg}>
      <img src="/speaker-image/lecturer16.jpg" alt />
    </div>
    <div className={styles.speakerName}>
      <h5>{props.name}</h5>
      <h6>{props.title}</h6>
    </div>
  </div>
</Link>
)
}
   
export default SpeakerCardVertical