import React, { useState } from "react";
import data from "@/data/speaker.json";
import styles from "@/styles/speaker/index.module.scss";
import SpeakerCardVertical from "@/components/speaker/speaker-list/speakerCardVertical";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/Header";
import Pagination from "@/components/pagination";
import Footer from "@/components/Footer";

export default function Speaker() {
  const groupSpeakers = (speakers, itemsPerGroup) => {
  return speakers.reduce((allGroups, current, index) => {
    const groupIndex = Math.floor(index / itemsPerGroup);

    // 確保當前組存在
    if (!allGroups[groupIndex]) {
      allGroups[groupIndex] = [];
    }

    // 將當前講師加入當前組
    allGroups[groupIndex].push(current);
    return allGroups;
  }, []);
}
  const [speakers, setSpeaker] = useState(data);
  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`globalContainer ${styles.container}`}>
        <div className={styles.title}>
          <h3>講師陣容</h3>
        </div>
        <div className={styles.speakerCardContainer}>
          {/* <div className={styles.speakerGroup}>
            {speakers.map((speaker) => {
              return (
                <SpeakerCardVertical
                  key={speaker.speaker_id}
                  name={speaker.speaker_name}
                  title={speaker.speaker_title}
                />
              );
            })}
          </div> */}
          {groupSpeakers(speakers, 4).map((group, index) => (
      <div key={index} className={styles.speakerGroup}>
        {group.map((speaker) => (
          <SpeakerCardVertical
            key={speaker.speaker_id}
            id={speaker.speaker_id}
            name={speaker.speaker_name}
            title={speaker.speaker_title}
          />
        ))}
      </div>
    ))}
          <div className={styles.speakerGroup}>
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical />
          </div>
          <div className={styles.speakerGroup}>
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical />
          </div>
        </div>
        <Pagination/>
      </div>

      <Footer />
    </>
  );
}
