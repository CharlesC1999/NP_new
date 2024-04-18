import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./memberLevelMain.module.css";


function MemberLevelMain(){
  return (
    <>
<div className={styles.membership}>
  <div className={styles.membershipDetails}>
    <div className={styles.currentLevel}>當前會員等級</div>
    <div className={styles.currentLevelInfo}>當前會員等級:</div>
    <div className={styles.nextLevelInfo}>下個等級:</div>
    <div className={styles.upgradeAmountInfo}>升級所需金額:</div>
    <div className={styles.levelBenefits}>各等級所需條件和福利</div>
    <div className={styles.levelCards}>
      <div className={`${styles.levelCard} ${styles.mNo}`}>
        <div className={styles.levelTitle}>會員等級</div>
        <div className={styles.levelDescription}>條件</div>
        <div className={styles.levelPerks}>福利</div>
      </div>
      <div className={styles.levelCard}>
        <div className={styles.levelIcon }>
          <img loading="lazy" srcSet="..." className={styles.levelImage} />
        </div>
        <div className={styles.levelContent}>
          <div className={styles.levelTitle}>等級1</div>
          <div className={styles.levelDescription}>條件</div>
          <div className={styles.levelPerks}>福利</div>
        </div>
      </div>
      <div className={styles.levelCard}>
        <div className={styles.levelIcon }>
          <img loading="lazy" srcSet="..." className={styles.levelImage} />
        </div>
        <div className={styles.levelContent}>
          <div className={styles.levelTitle}>等級2</div>
          <div className={styles.levelDescription}>新鮮蔬菜</div>
          <div className={styles.levelPerks}>新鮮蔬菜</div>
        </div>
      </div>
      <div className={styles.levelCard}>
        <div className={styles.levelIcon }>
          <img loading="lazy" srcSet="..." className={styles.levelImage} />
        </div>
        <div className={styles.levelContent}>
          <div className={styles.levelTitle}>等級3</div>
          <div className={styles.levelDescription}>新鮮蔬菜</div>
          <div className={styles.levelPerks}>新鮮蔬菜</div>
        </div>
      </div>
      <div className={styles.levelCard}>
        <div className={styles.levelIcon }>
          <img loading="lazy" srcSet="..." className={styles.levelImage} />
        </div>
        <div className={styles.levelContent}>
          <div className={styles.levelTitle}>等級4</div>
          <div className={styles.levelDescription}>新鮮蔬菜</div>
          <div className={styles.levelPerks}>新鮮蔬菜</div>
        </div>
      </div>
      <div className={styles.levelCard}>
        <div className={styles.levelIcon }>
          <img loading="lazy" srcSet="..." className={styles.levelImage} />
        </div>
        <div className={styles.levelContent}>
          <div className={styles.levelTitle}>等級5</div>
          <div className={styles.levelDescription}>新鮮蔬菜</div>
          <div className={styles.levelPerks}>新鮮蔬菜</div>
        </div>
      </div>
    </div>
  </div>
  <div className={styles.upgradeRules}>升級/降級規則</div>
</div>
</>
)
}

export default MemberLevelMain