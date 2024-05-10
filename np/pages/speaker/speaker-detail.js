import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// 測試用的 json
// import data from "@/data/speaker.json";
import styles from "@/styles/speaker/speaker-detail.module.scss";
import SpeakerCardHorizontal from "@/components/speaker/speaker-detail/SpeakerCardHorizontal";
import SpeakerProfileSection from "@/components/speaker/speaker-detail/SpeakerProfileSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/Header";
import Footer from "@/components/Footer";
import LectureCardVertical from "@/components/speaker/speaker-detail/LectureCardVertical";

// 資料來自伺服器
// 資料來源: `https://my-json-server.typicode.com/eyesofkids/json-fake-data/products/${pid}`
// 先註解json的資料模型樣貌
// const speaker =
// {
//   "speaker_id": 1,
//   "speaker_name": "施建偉",
//   "speaker_title": "國際美食總冠軍",
//   "speaker_description": "2014 年獲選為 FDA 年度優良廚師，更在 2015 年台灣國際美食展職業組比賽中榮獲總冠軍，他不僅在國際賽事中表現出色，也致力於烹飪教育和料理創新。他的教學兼具理論與實踐，強調食材的選擇與處理技術，以及如何將傳統與創新完美融合。他的課程深受學生歡迎，培養出許多業界專業人才。",
//   "speaker_experience": "明上園楓味館廚藝總監、德霖技術學院廚藝系助理教授",
//   "speaker_license": "西餐乙級證照、中餐乙級證照",
//   "speaker_image": "1706685864.png",
//   "valid": 1
//  }

export default function SpeakerDetail() {
  // 物件狀態的初始值，通常需把每個屬性的初始值寫出
  const [speaker, setSpeaker] = useState({
    speaker_id: "",
    speaker_name: "",
    speaker_title: "",
    speaker_description: "",
    speaker_experience: "",
    speaker_license: "",
    speaker_image: "",
    valid: 1,
  });
  // 所有講師的資料
  const [speakers, setSpeakers] = useState([]);
  // 新增一個狀態來存儲過濾後的講師數據
  const [filteredSpeakers, setFilteredSpeakers] = useState([]);
  //新增一個狀態儲存講師開設的課程資訊
  const [relatedClass, setRelatedClass] = useState([{
    "class__i_d": "",
    "class_name": "",
    "class_description": "",
    "image__u_r_l": ""
}]);
  // 宣告出 router 物件，可以取得兩個值
  // 1. router.query，是一個物件，其中有動態路由的參數值pid
  // 2. router.isReady，是一個布林值，代表本頁面元件已完成水合作用，可以得到pid值
  const router = useRouter();

  // 與伺服器要求獲取資料的 async 函式
  const getSpeakers = async (sid) => {
    const url = `http://localhost:3005/api/speakers/${sid}`;
    // 如果有用 async-await，要習慣使用 try...catch 處理錯誤
    try {
      const res = await fetch(url);
      const data = await res.json();

      // 為了確保是資料是物件，所以先檢查後再設定
      if (typeof data.data.speaker === "object" && data !== null) {
        // 設定到狀態中
        setSpeaker(data.data.speaker);
      } else {
        console.log("伺服器回傳資料類型錯誤（需為物件），無法設定到狀態中");
      }
      if (data.status === "success") {
        setSpeakers(data.data.speakers);
        setRelatedClass(data.data.ClassData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // 將 speakers 篩選出推薦講師的資料來源 filterSpeakers （也是一個陣列）
  // 規則：當頁講師 id 的後五筆資料，若是排序最後五筆的講師，側邊推薦講師都顯示最後五筆
  useEffect(() => {
    const id = Number(router.query.sid);
    let filterSpeakers;
    id < speakers.length - 4
      ? (filterSpeakers = speakers.slice(id, id + 5))
      : (filterSpeakers = speakers.slice(speakers.length - 5, speakers.length));
    // console.log(filterSpeakers);
    setFilteredSpeakers(filterSpeakers);
  }, [speakers, router.query.sid]);
  // 頁面初次渲染後向伺服器要求資料
  // 監聽router.isReady，true 或是sid有變動時，都會重新向伺服器取得資料
  useEffect(() => {
    // console.log("isReady", router.isReady, "query", router.query);
    if (router.isReady) {
      getSpeakers(router.query.sid);
    }
  }, [router.isReady, router.query.sid]);

  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`globalContainer ${styles.container}`}>
        <div className={`${styles.navLeft} ${styles.boxShadow}`}>
          <h5>推薦講師</h5>
          <div className={styles.divider}></div>
          <div className={styles.speakerCardListGroup}>
            {filteredSpeakers.map((v) => {
              return (
                <SpeakerCardHorizontal
                  key={v.speaker_id}
                  id={v.speaker_id}
                  name={v.speaker_name}
                  description={v.speaker_description}
                  image={v.speaker_image}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.navRight}>
          <div className={styles.profile}>
            <div className={styles.profileImg}>
              <img
                src={`/speaker-image/${speaker.speaker_image}`}
                alt={speaker.speaker_name}
              />
            </div>
            <div className={styles.profileContent}>
              <div className={styles.profileName}>
                <h3>{speaker.speaker_name}</h3>
                <h5>{speaker.speaker_title}</h5>
              </div>
              <div className={styles.profileBody}>
                <SpeakerProfileSection
                  description={speaker.speaker_description}
                  experience={speaker.speaker_experience}
                  license={speaker.speaker_license}
                />
              </div>
            </div>
          </div>
          <div className={styles.upcomingLectures}>
            <p className={styles.title}>近期課程</p>
            <div className={styles.lectureGroup}>
              {relatedClass.map((v) => {
                return (
                  <LectureCardVertical
                    key={v.class__i_d}
                    name={v.class_name}
                    description={v.class_description}
                    image={v.image__u_r_l}
                    classID={v.class__i_d}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
