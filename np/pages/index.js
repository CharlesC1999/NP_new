import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import styles from "@/styles/index.module.css";
import HeaderComponent from "@/components/Header";
import HeroSlider from "@/components/index/HeroSlider";
import Card2 from "@/components/index/card2";
import Card3 from "@/components/index/Card3Categories";
import Card4Hot from "@/components/index/Card4Hot";
import Card5class from "@/components/index/Card5class";
import Card6Recipe from "@/components/index/Card6Recipe";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <>
      <HeaderComponent />
      <HeroSlider />
      <div className={` ${styles.wrapper} ${styles.nutripollP}`}>
        <div className={`${styles.titleP}`}>
          <h1 className={`${styles.titleNutripoll}`}>營養大選 Nutripolls</h1>
          <h6>精挑細選 賣自己想吃的好食物</h6>
          <br />
        </div>
        <div className={styles.textNutripoll}>
          <h5>
            「營養」不只是一個名稱，它象徵著我們對健康的深切關注與堅定不移的承諾。我們精選每一樣食材，希望您在品嚐美味的同時，也能感受到那份對身心健康的細心照料。
            <br />
            「大選」意味著您在我們這裡擁有豐富的選擇。每一項食材背後，都是我們基於質量、新鮮度和營養價值的嚴格篩選
            選擇一種對生活的熱愛、對健康的追求，以及對飲食質量的不懈探索。讓我們攜手前行，將每一餐轉化為對身心的深刻滋養，共同經歷這場由內而外的健康與美好之旅。
          </h5>
        </div>
        <div className={styles.buttonNutripoll}>
          <a type="button" className={styles.btn1} href>
            了解Nutripolls
          </a>
        </div>
      </div>

      <div
        className={` ${styles.wrapper} ${styles.NutripollCard1}`}
      >
        <div className={`d-flex ${styles.card1Rwd}`}>
          <div className={styles.card1Img}>
            <img src="/index-images/Herosection02.png" alt />
          </div>
          <div className={styles.card1Text}>
            <h3>從餐桌開始，做出更好的選擇</h3>
            <h6>
              在您日常享用的每一口食物中，您是否真正放心？當食品添加物與過度加工成為常態，農藥殘留悄悄侵入我們的餐盤，健康食物的美味被誤解，進口食材的碳足跡無形中加重，而包裝浪費更是環境的隱憂
            </h6>
            <br />
            <h6>
              我們可以，也應該為自己、為環境作出更好的選擇！讓我們一同回歸飲食的本質
              —「減法」的智慧。不是減少食物的選擇，而是減少對健康和環境的負擔
            </h6>
            <br />
            <h6>這場由內而外的轉變，就從您的餐桌開始</h6>
          </div>
        </div>
      </div>

      <div className={` ${styles.wrapper}`}>
        <div className={styles.Nutripollcard2}>
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
        </div>
      </div>

      <div className={` ${styles.wrapper} ${styles.CategoryRwd}`}>
        <div className={`d-flex justify-content-between pb-5`}>
          <h4 className={`${styles.MeAuto}`}>商品分類</h4>
          <div className={`d-flex`}>
            <button className={`btn btn-secondary ${styles.arrow}`}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className={`btn btn-secondary ${styles.arrow}`}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className={`${styles.Nutripollcard3}`}>
          <Card3 />
          <Card3 />
          <Card3 />
          <Card3 />
          <Card3 />
          <Card3 />
          <Card3 />
          <Card3 />
        </div>
      </div>

      <div className={` ${styles.wrapper}`}>
        <div className={`d-flex justify-content-between ps-3 pe-3`}>
          <h4 className={`${styles.MeAuto}`}>熱銷商品</h4>
          <a className={`${styles.TitleRwd}`} href="">
            <h5 className={`${styles.MeAuto}`}>
              更多<i className="fa-solid fa-chevron-right"></i>
            </h5>
          </a>
        </div>
        <div className={`${styles.Nutripollcard4}`}>
          <Card4Hot />
          <Card4Hot />
          <Card4Hot />
          <Card4Hot />
          <Card4Hot />
          <Card4Hot />
          <Card4Hot />
          <Card4Hot />
          <Card4Hot />
          <Card4Hot />
          <Card4Hot />
          <Card4Hot />
        </div>
      </div>

      <div className={` ${styles.wrapper} ${styles.FlexRow}`}>
        <div className={`${styles.card5Main}`}>
          <div
            className={`${styles.card5Title} d-flex justify-content-between`}
          >
            <h4 className={`${styles.MeAuto}`}>熱門課程</h4>
            <a className={`${styles.TitleRwd}`} href="">
              <h5 className={`${styles.MeAuto}`}>
                更多<i className="fa-solid fa-chevron-right"></i>
              </h5>
            </a>
          </div>
          <div className={`${styles.Nutripollcard5}`}>
            <Card5class />
            <Card5class />
          </div>
        </div>
        <div className={`card6Main`}>
          <div className={`d-flex justify-content-between ${styles.card6Title}`}>
            <h4 className={`${styles.MeAuto}`}>精選食譜</h4>
            <a className={`${styles.TitleRwd}`} href="">
              <h5 className={`${styles.MeAuto}`}>
                更多<i className="fa-solid fa-chevron-right"></i>
              </h5>
            </a>
          </div>
          <div className={`d-flex ${styles.Nutripollcard6}`}>
            <Card6Recipe />
            <Card6Recipe />
            <Card6Recipe />
            <Card6Recipe />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
