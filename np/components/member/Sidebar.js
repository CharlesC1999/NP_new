import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Sidebar.module.css";
import Link from "next/link";

const Sidebar = ({ userData = { User_image: null } }) => {
  return (
    <>
      <div className={styles.menu}>
        <div className={styles.menuTop}>
          <div className={styles.userimage}>
            <img src={`/images/member/${userData.User_image}`} alt="" />
          </div>
          <div className={styles.menuTitle}>
            <div className={styles.accountleft}>帳號</div>
            <div className={styles.nameleft}>{userData.Account}</div>
          </div>
        </div>
        <div className={styles.menu1}>
          <div className={styles.menu2}>
            <div className={styles.myAccount}>
              {" "}
              <Link href="/member" alt="">
                我的帳戶
              </Link>
            </div>
            <div className={styles.lefta}>
              <Link href="/member/member-buy" alt="">
                購買清單
              </Link>
            </div>
            <div className={styles.lefta}>
              <Link href="/member/member-coupon" alt="">
                優惠券
              </Link>
            </div>
            <div className={styles.lefta}>
              <Link href="/member/member-level" alt="">
                會員等級
              </Link>
            </div>
            <div className={styles.lefta}>
              <Link href="/member/favor" alt="">
                願望清單
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
