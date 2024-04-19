import React from "react";
import styles from "./index.module.scss"
import SpeakerCardVertical from "@/components/speaker/speaker-list/speakerCardVertical";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/header";
import Footer from "@/components/footer";

export default function Speaker() {
  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`container ${styles.container}`}>
      <div className={styles.title}><h3>講師陣容</h3></div>
      <div className={styles.speakerCardContainer}>
        <div className={styles.speakerGroup}>
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical/>
          </div>
          <div className={styles.speakerGroup}>
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical/>
          </div>
          <div className={styles.speakerGroup}>
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical />
            <SpeakerCardVertical/>
        </div>
        </div>
    </div>
      <Footer/>
    </>
  );
}
