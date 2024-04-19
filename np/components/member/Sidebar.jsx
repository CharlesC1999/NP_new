import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./sidebar.module.css"

const Sidebar =() => {
  return(
    <>
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
  </>
  )
}
export default Sidebar;