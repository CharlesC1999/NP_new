import { useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./MemberLevelMain.module.css"
 
  
  
  
 const MemberLevelMain =() => {
  const [memberLevel, setMemberLevel] = useState([])
  

//計算等級
const calculateLevel = (total) => {
  if (total >= 1 && total <= 4999) {
    return "LV.1";
  } else if (total >= 5000 && total <= 7999) {
    return "LV.2";
  } else if (total >= 8000 && total <= 9999) {
    return "LV.3";
  } else if (total >= 10000 && total <= 14999) {
    return "LV.4";
  } else if (total >= 15000) {
    return "LV.5";
  } else {
    return "Unknown";
  }
};
  const getCoupons = async () => {
    const url = 'http://localhost:3005/api/member-level';
  
    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url)
      // 解析json格式資料成js的資料
      const data = await res.json()
      console.log(data)
  
      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.level)) {
        // 設定到狀態中
        setMemberLevel(data.data.level)
        console.log('abc');
      } else {
        console.log('伺服器回傳資料類型錯誤，無法設定到狀態中')
      }
    } catch (e) {
      console.log(e)
    }
  }


console.log(memberLevel);
// const userIdExists = memberLevel.some(item => item.User_ID === 8);
// console.log(userIdExists);
let nowlevel;
let total;
//判斷user是誰
let userid = parseInt(localStorage.getItem('userid'))
console.log(userid);
const userIdExists = memberLevel.some(item => item.User_ID === userid);
if (userIdExists) {
  const user = memberLevel.find(item => item.User_ID === userid);
   total = user.total;
  console.log(total);
  nowlevel=parseInt(calculateLevel(total).split(".")[1])
} else {
  nowlevel = 1
  total=0
  console.log(nowlevel);
}
const nextLevel = nowlevel + 1;
 console.log(nextLevel);
 let next;
 if (nextLevel===6 ){
  next="已達最大等級";
 }else{
  next="LV." + nextLevel
 }

 let needmoney;
 if(total >= 15000){
  needmoney = "已達最大等級"
  }else if(nextLevel === 2){
  needmoney=5000-total
 }else if(nextLevel === 3){
needmoney=8000-total
 }else if(nextLevel ===4){
  needmoney=10000-total
 }else if(nextLevel===5){
needmoney=15000-total
 }
console.log(needmoney);
  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getCoupons()
  }, [])





  return(
    <>
   <div className={` ${styles.container1} ${styles.main} ` }>
  {/* 下面是側邊攔 */}
  
  {/* 這邊是主內容那塊 */}
  <div className>
    {/* 主內容的標題 */}
    <div className={styles.title}>
      <div className={styles.titleNow}>會員等級</div>
      <div className={styles.title2}>我的帳戶</div>
    </div>
    {/* 主內容的標題 */}
    {/* 手機板大頭貼 */}
   
    {/* 資料顯示區 */}
    <div className={styles.membership}>
        <div className={styles.membershipDetails}>
        
       {/* 原本迴圈的地方起始點 */}
          <div >
          <div className={styles.currentLevel}>當前會員等級</div>
          <div className={styles.currentLevelInfo}>當前會員等級:
           <br/>  <h1>LV.{nowlevel}</h1>
          </div>
          <div className={styles.nextLevelInfo}>下個等級:
          
            <h1>{next}</h1>
          </div>
          <div className={styles.upgradeAmountInfo}>升級所需金額:
           <h3>{needmoney}</h3>
          </div>
          </div>
   
          <div className={styles.levelBenefits}>各等級所需條件和福利</div>
          <div className={styles.levelCards}>
            <div className={`${styles.levelCard} ${styles.mNo}`}>
              <div className={styles.levelTitle}>會員等級</div>
              <div className={styles.levelDescription}>條件</div>
              <div className={styles.levelPerks}>福利</div>
            </div>
            <div className={styles.levelCard}>
              <div className={styles.levelIcon }>
                <img src="/images/level/lv1.png" alt="" className={styles.levelImage} />
              </div>
              <div className={styles.levelContent}>
                <div className={styles.levelTitle}>等級1</div>
                <div className={styles.levelDescription}>註冊會員</div>
                <div className={styles.levelPerks}>1張優惠券/1月</div>
              </div>
            </div>
            <div className={styles.levelCard}>
              <div className={styles.levelIcon }>
                <img src="/images/level/lv2.png" alt="" className={styles.levelImage} />
              </div>
              <div className={styles.levelContent}>
                <div className={styles.levelTitle}>等級2</div>
                <div className={styles.levelDescription}>消費滿5000元</div>
                <div className={styles.levelPerks}>2張優惠券/1月</div>
              </div>
            </div>
            <div className={styles.levelCard}>
              <div className={styles.levelIcon }>
                <img src="/images/level/lv3.png" alt="" className={styles.levelImage} />
              </div>
              <div className={styles.levelContent}>
                <div className={styles.levelTitle}>等級3</div>
                <div className={styles.levelDescription}>消費滿8000元</div>
                <div className={styles.levelPerks}>3張優惠券/1月</div>
              </div>
            </div>
            <div className={styles.levelCard}>
              <div className={styles.levelIcon }>
                <img src="/images/level/lv4.png" alt="" className={styles.levelImage} />
              </div>
              <div className={styles.levelContent}>
                <div className={styles.levelTitle}>等級4</div>
                <div className={styles.levelDescription}>消費滿10000元</div>
                <div className={styles.levelPerks}>4張優惠券/1月</div>
              </div>
            </div>
            <div className={styles.levelCard}>
              <div className={styles.levelIcon }>
                <img src="/images/level/lv5.png" alt="" className={styles.levelImage} />
              </div>
              <div className={styles.levelContent}>
                <div className={styles.levelTitle}>等級5</div>
                <div className={styles.levelDescription}>消費滿15000元</div>
                <div className={styles.levelPerks}>5張優惠券/1月</div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles.upgradeRules}>升級/降級規則</div> */}
        
      </div>
  </div>
</div>
  </>
);

};
export default MemberLevelMain;