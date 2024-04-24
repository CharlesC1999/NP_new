import React, { useState, useEffect } from "react";
// 先用 json 測試排版
// import data from "@/data/speaker.json";
import styles from "@/styles/speaker/index.module.scss";
import SpeakerCardVertical from "@/components/speaker/speaker-list/speakerCardVertical";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/Header";
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
  };
  // 物件陣列初始化值使用空陣列
  const [speakers, setSpeaker] = useState([]);
  // 與伺服器要求獲取資料的 async 函式
  const getSpeakers = async () => {
    const url = "http://localhost:3005/api/test";

    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url);
      // 解析json格式資料成js的資料
      const data = await res.json();
      console.log(data);

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.speakers)) {
        // 設定到狀態中
        setSpeaker(data.data.speakers);
      } else {
        console.log("伺服器回傳資料類型錯誤，無法設定到狀態中");
      }
    } catch (e) {
      console.log(e);
    }
  };
  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getSpeakers();
  }, []);
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
                  img={speaker.speaker_image}
                />
              ))}
            </div>
          ))}
          {/* <div className={styles.speakerGroup}>
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
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
