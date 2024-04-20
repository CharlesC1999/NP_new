import React from "react";
import styles from "./index.module.scss";
import SpeakerCardVertical from "@/components/speaker/speaker-list/speakerCardVertical";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/Header";
import Footer from "@/components/Footer";

export default function Speaker() {
  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`globalContainer ${styles.container}`}>
        <div className={styles.title}>
          <h3>講師陣容</h3>
        </div>
        <div className={styles.speakerCardContainer}>
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
          <div className={styles.speakerGroup}>
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
