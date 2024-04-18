import React, { useState } from "react";
import styles from "./classDetailContent.module.css";
import MArticle from "./M-class-detail-content-article-web";
import WArticle from "./W-class-detail-content-article-web";

const ClassDetail = () => {
  // 用來管理哪個標籤頁是激活的狀態
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className={styles.articleContainer}>
      <section className={styles.classDetailAndLinks}>
        <div className={styles.classImageContainer}>
          <img
            src="/images/class-intro-image.jfif"
            alt
            className={styles.classImg}
          />
        </div>
        <div className={styles.classInformations}>
          <p className={styles.className}>探索松露的秘密</p>
          <div className={styles.classMobileSelectGroup}>
            <button
              className={
                activeTab === "info"
                  ? styles.classMobileSelectActive
                  : styles.classMobileSelect
              }
              onClick={() => setActiveTab("info")}
            >
              課程資訊
            </button>
            <button
              className={
                activeTab === "goods"
                  ? styles.classMobileSelectActive
                  : styles.classMobileSelect
              }
              onClick={() => setActiveTab("goods")}
            >
              成品介紹
            </button>
          </div>
          {activeTab === "info" && (
            <div
              className={styles.classInformationContainer}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className={styles.classInfor}>
                <div className={styles.inforTitle}>上課時間：</div>
                <div className={styles.inforDetail}>2024/05/26</div>
              </div>
              <div className={styles.classInfor}>
                <div className={styles.inforTitle}>課程價格：</div>
                <div className={styles.inforDetail}>$2500</div>
              </div>
              <div className={styles.classInfor}>
                <div className={styles.inforTitle}>優惠活動：</div>
                <div className={styles.inforDetail}>無</div>
              </div>
              <div className={styles.classInfor}>
                <div className={styles.inforTitle}>優惠券：</div>
                <div className={styles.inforDetail}>無</div>
              </div>
              <div className={styles.classInfor}>
                <div className={styles.inforTitle}>報名人數：</div>
                <div className={styles.inforDetail}>10 / 24</div>
              </div>
            </div>
          )}
          {activeTab === "goods" && (
            <div
              className="class-images-and-contents-mobile"
              style={{ display: "block" }}
            >
              <MArticle />
              <MArticle />
              <MArticle />
              {/* basically, it only need one set */}
            </div>
          )}
          <div className={styles.classLinksContainer}>
            <a className={styles.linkBtn} href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
                />
              </svg>
              <p className={styles.linkText}>立刻報名</p>
            </a>
            <a className={styles.linkBtn} href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
              >
                <path fill="white" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
              </svg>
              <p className={styles.linkText}>加入收藏</p>
            </a>
          </div>
        </div>
      </section>
      <section className={styles.speakerIntroAndLink}>
        <img
          src="/images/class-speaker.png"
          alt
          className={styles.speakerImage}
        />
        <div className={styles.speakerInfor}>
          <div className={styles.speakerNameSet}>
            <p className={styles.speakerName}>Walt White</p>
            <p className={styles.speakerSubName}>化學分子料理師</p>
          </div>
          <div className={styles.speakerBackgroundInfor}>
            瓦爾特·懷特並是一位天才大廚，以其創新的烹飪技術和對食材化學的深刻理解聞名遐邇。這位前高中化學老師，面對生命中的重大轉折，一個無法忽視的健康挑戰，決定追隨自己長期以來的熱情：烹飪。瓦爾特將他對化學的知識轉化為烹飪創新，創造出前所未有的美食，這些美食不僅味覺上令人難以忘懷，更在視覺和嗅覺上提供獨特的體驗。
          </div>
          <div className={styles.speakerLinkContainer}>
            <a href="#" className={styles.speakerDetailLink}>
              <span className={styles.speakerLinkBtn}>了解更多</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                className={styles.speakerLinkIcon}
              >
                <path
                  fill="#50bf8b"
                  fillRule="evenodd"
                  d="M1.25 8A.75.75 0 0 1 2 7.25h10.19L9.47 4.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H2A.75.75 0 0 1 1.25 8"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section className={styles.classImagesAndContents}>
        <WArticle />
        <WArticle />
        <WArticle />
        {/* basically, it only need one set */}
      </section>
    </div>
  );
};

export default ClassDetail;
