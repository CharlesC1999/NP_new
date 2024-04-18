import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./memberLevel.module.css"
  
  
  
  
 const MemberLevel =() => {
  return(
    <>
   <div className={` ${styles.container1} ${styles.main} ` }>
  {/* 下面是側邊攔 */}
  <div className={styles.menu}>
    <div className={styles.menuTop}>
      <div className={styles.userimage} />
      <div className={styles.menuTitle}>
        <div className={styles.accountleft}><a href>帳號</a></div>
        <div className={styles.nameleft}><a href>會員名稱</a></div>
      </div>
    </div>
    <div className={styles.menu1}>
      <div className={styles.menu2}>
        <div className={styles.myAccount}> <a href>我的帳戶</a></div>
        <div className={styles.lefta}><a href>購買清單</a></div>
        <div className={styles.lefta}><a href>優惠券</a></div>
        <div className={styles.lefta}><a href>會員等級</a></div>
        <div className={styles.lefta}><a href>願望清單</a></div>
      </div>
    </div>
  </div>
  {/* 這邊是主內容那塊 */}
  <div className>
    {/* 主內容的標題 */}
    <div className={styles.title}>
      <div className={styles.titleNow}>我的帳戶</div>
      <div className={styles.title2}>我的帳戶</div>
    </div>
    {/* 主內容的標題 */}
    {/* 手機板大頭貼 */}
   
    {/* 資料顯示區 */}
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
  </div>
</div>
  </>
);

};
export default MemberLevel;