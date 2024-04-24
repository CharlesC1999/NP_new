import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./Sidebar.module.css"
import Link from "next/link";

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
        <div className={styles.myAccount}> <Link href="/member">我的帳戶</Link></div>
        <div className={styles.lefta}><Link href="/member/member-buy">購買清單</Link></div>
        <div className={styles.lefta}><Link href="/member/member-coupon">優惠券</Link></div>
        <div className={styles.lefta}><Link href="/member/member-level">會員等級</Link></div>
        <div className={styles.lefta}><Link href="">願望清單</Link></div>
      </div>
    </div>
  </div>
  </>
  )
}
export default Sidebar;