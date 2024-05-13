import React from "react";
import { useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./MemberCouponMain.module.css"
import Cat from "./Cat"
// import { useAuth } from "@/contexts/AuthContext";





 const MemberCouponMain =() => {
  //新加的
  // const { auth, logout } = useAuth();
  // console.log(auth);


const [coupons, setCoupons] = useState([])
const [activeCategory, setActiveCategory] = useState("全部");
const [searchTerm, setSearchTerm] = useState("");
const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};
// let userid = parseInt(localStorage.getItem('userid'))
// console.log(userid);


// const [userid, setUserid] = useState(null);

// useEffect(() => {
//   const userIdFromLocalStorage = localStorage.getItem("userid");
//   if (userIdFromLocalStorage) {
//     setUserid(parseInt(userIdFromLocalStorage));
//   }
// }, []);
const [useridid, setUseridid] = useState("");
  

useEffect(() => {
  const userIdFromLocalStorage = localStorage.getItem("userData");
  console.log(userIdFromLocalStorage);
  if (userIdFromLocalStorage) {
    setUseridid(JSON.parse(userIdFromLocalStorage));
  }
}, []);
// console.log(userid.id);
const userid= useridid.id
console.log(userid);

console.log(userid);
const getCoupons = async (cat='') => {
  let url = 'http://localhost:3005/api/coupons';

  // 如果指定了分类，则加上分类参数
  if (cat) {
    url += `?category=${cat}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (Array.isArray(data.data.coupons)) {
      let filteredCoupons = data.data.coupons;

      // 如果存在搜索关键字，则进行过滤
      if (searchTerm) {
        filteredCoupons = filteredCoupons.filter((coupon) => {
          const title = coupon.c_name;
          return title.includes(searchTerm);
        });
      }

      setCoupons(filteredCoupons);
    } else {
      console.log('伺服器回傳資料類型錯誤，無法設定到狀態中')
    }
  } catch (e) {
    console.log(e)
  }
}
// 樣式2: didMount階段只執行一次
useEffect(() => {
  // 頁面初次渲染之後伺服器要求資料
  getCoupons(activeCategory==='全部'?'':activeCategory)
}, [activeCategory,searchTerm])


  return(
    <> 
 
  <div className={` ${styles.container1} ${styles.main} ` }>
  {/* 下面是側邊攔 */}
  
  {/* 這邊是主內容那塊 */}
  <div className>
    {/* 主內容的標題 */}
    <div className={styles.title}>
      <div className={styles.titleNow}>優惠券</div>
      <div className={styles.title2}>我的帳戶</div>
    </div>
    {/* 主內容的標題 */}
    <Link  href={`/member/coupons-box`} className={`${styles.gift} btn`}>禮物箱</Link>
    <div>
      {/* 分類欄 */}
  <Cat  setActiveCategory={setActiveCategory} activeCategory={activeCategory}/>
  {/* 分類欄下面的搜尋框 */}
  <div className={styles.searchContainer} >
            <input
                className={styles.searchBar}
                type="text"
                placeholder="Search for coupon's name..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button type="submit" className={styles.searchButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#747E85"
                    strokelinecap="round"
                    strokelinejoin="round"
                    d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                  />
                </svg>
              </button>
            </div>
</div>
<div className={styles.coupmain}>
  {/* 可以用的 */}
  {coupons.filter(v=>v.member__i_d===userid).map((v, i) => {
    console.log(userid);
    const title = v.c_name;
 const discountAmount = parseFloat(v.discount_amount);
 let displayText;
// 检查 discountAmount 是否是有效的数字
if (!isNaN(discountAmount)) {
  // 如果 discountAmount 是有效的数字，根据大小判断是折扣还是固定金额
  if (discountAmount < 1) {
    const discountPercent = discountAmount * 10;
    displayText = `${discountPercent}折`;
  } else {
    displayText = `$${discountAmount}`;
  }
} else {
  // 如果 discountAmount 不是有效的数字，直接使用原始值
  displayText = v.discount_amount;
}
// 确定按钮是否可用
const isButtonDisabled = v.c_status !== '可使用';
if ((activeCategory === "全部" || v.c_status === activeCategory) && (activeCategory !== "全部" || v.c_status !== "已發送") && (activeCategory === "全部" || v.c_status !== "已發送")) {
    return (
  <div className={styles.couponCard} key={v.coupon__i_d}>
    <div className={styles.couponImg} >
    <span className={styles.cspan} >{displayText}</span>
   
  <span className={styles.cspan2}>效期:{v.valid_start_date}</span>
  <span className={styles.cspan2}>~{v.valid_end_date}</span>
    </div>
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消${v.minimum_spend}</div>
        
        <div className={styles.couponDate}>{title}</div>
      </div>
      <div className={styles.couponButton}>

        {/* 使用条件渲染控制按钮及其文本的显示 */}
        {isButtonDisabled ? (
            <button className={`${styles.couponBtn} btn`} disabled></button>
          ) : (
            <Link  href={`/product`} className={`${styles.couponBtn} btn`}>立即使用</Link>
          )}
      </div>
    </div>
  </div>
);
}
}
)}
  {/* 原本的 */}
  {/* <div className={styles.couponCard}>
    <div className={styles.couponImg} >
      
    </div>
    <div className={styles.couponContent }>
      <div className={styles.couponDetails}>
        <div className={styles.lowbuy}>低消$100</div>
        <div className={styles.couponDate}>有效日期:2024/12/31</div>
      </div>
      <div className={styles.couponButton}>
        <button className={`${styles.couponBtn} btn`}>立即使用</button>
      </div>
    </div>
  </div> */}

 
</div>

  </div>
</div>

</>
);

};
export default MemberCouponMain;