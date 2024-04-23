import React, { useState } from "react";
import data from "@/data/speaker.json";
import styles from "@/styles/speaker/speaker-detail.module.scss";
import SpeakerCardHorizontal from "@/components/speaker/speaker-detail/SpeakerCardHorizontal";
import SpeakerProfileSection from "@/components/speaker/speaker-detail/SpeakerProfileSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/Header";
import Footer from "@/components/Footer";
import LectureCardVertical from "@/components/speaker/speaker-detail/LectureCardVertical";

export default function SpeakerDetail() {
  // 初始值
  const [speaker, setSpeaker] = useState(data);

  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`globalContainer ${styles.container}`}>
        <div className={`${styles.navLeft} ${styles.boxShadow}`}>
          <h5>推薦講師</h5>
          <div className={styles.divider}></div>
          <div className={styles.speakerCardListGroup}>
            <SpeakerCardHorizontal />
            <SpeakerCardHorizontal />
            <SpeakerCardHorizontal />
            <SpeakerCardHorizontal />
            <SpeakerCardHorizontal />
          </div>
        </div>
        <div className={styles.navRight}>
          <div className={styles.profile}>
            <div className={styles.profileImg}>
              <img src="/speaker-image/lecturer3.jpg" alt="" />
            </div>
            <div className={styles.profileContent}>
              <div className={styles.profileName}>
                <h3>{data[0].speaker_name}</h3>
                <h5>{data[0].speaker_title}</h5>
              </div>
              <div className={styles.profileBody}>
                <SpeakerProfileSection
                  description={data[0].speaker_description}
                  experience={data[0].speaker_experience}
                  license={data[0].speaker_license}
                />
              </div>
            </div>
          </div>
          <div className={styles.upcomingLectures}>
            <p className={styles.title}>近期課程</p>
            <div className={styles.lectureGroup}>
              <LectureCardVertical />
              <LectureCardVertical />
              {/* <LectureCardVertical />
              <LectureCardVertical /> */}
              {/*   RWD 要隱藏最後兩張卡片，用 js 寫 */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
