import React from "react"
import styles from "./SpeakerCardHorizontal.module.scss"
import Link from "next/link"
function SpeakerCardHorizontal({name,description,id,image}) {
  return (<Link href={`/speaker/speaker-detail?sid=${id}`} className={styles.speakerCardListLink}>
  <div className={styles.speakerCardList}>
    <div className={styles.speakerImg}>
      <img src={`/speaker-image/${image}`} alt />
    </div>
    <div className={styles.speakerContent}>
      <h6>{name}</h6>
      <p>
       {description}
      </p>
    </div>
  </div>
</Link>
)
}

export default SpeakerCardHorizontal