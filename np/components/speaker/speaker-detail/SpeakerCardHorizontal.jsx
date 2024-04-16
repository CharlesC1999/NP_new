import React from "react"
import styles from "./SpeakerCardHorizontal.module.css"
function SpeakerCardHorizontal() {
  return (<a href="#" className={styles.speakerCardListLink}>
  <div className={styles.speakerCardList}>
    <div className={styles.speakerImg}>
      <img src="/speaker-image/lecturer3.jpg" alt />
    </div>
    <div className={styles.speakerContent}>
      <h6>林繼正</h6>
      <p>
        50歲卸下福華飯店主廚職務，步入高雄餐旅大學的教學殿堂20多年，其間還遠赴法國、擔任藍帶客座大師講堂教師，桃李滿天下，把中式麵點的文化傳播海內外。不久前從高雄餐旅退休，以分享喜樂的心，要把在業界和學校所累積的豐富經驗，以系列課程在廚藝教室傳承，教好做、好包、好吃的中式麵食。
      </p>
    </div>
  </div>
</a>
)
}

export default SpeakerCardHorizontal