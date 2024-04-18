import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./passwordReset.module.css"


 const PasswordReset =() => {
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
  <div className={styles.mainMid}>
    {/* 主內容的標題 */}
    <div className={styles.title}>
      <div className={styles.titleNow}>修改密碼</div>
      <div className={styles.title2}>我的帳戶</div>
    </div>
    {/* 主內容的標題 */}
    {/* 手機板大頭貼 */}
    
    {/* 資料顯示區 */}
    <div className= "mt-5 d-flex ">
      <div className={styles.form1}>
        
        <div className={`${styles.box} row mb-3 align-items-start`}>
          <label htmlFor="password" className={`col-form-label  col-3 ${styles.lb }`}>密碼 :</label>
          <div className="col">
            <input type="password" className="form-control" id="password" placeholder="請輸入密碼" />
          </div>
        </div>
        <div className={`${styles.box} row mb-3 align-items-start`}>
          <label htmlFor="password" className={`col-form-label  col-3 ${styles.lb }`}>確認密碼 :</label>
          <div className="col">
            <input type="password" className="form-control" id="password" placeholder="請輸入密碼" />
          </div>
        </div>
       
        <div className={`${styles.btnCenter} ${styles.box} row mb-3 align-items-start `}>
          <button type="submit" className={`${styles.btn1 } ${styles.btnmargin} btn`}>確認修改</button>
        </div>
      </div>
      
    </div>
  </div>
</div>
</>
);

};
export default PasswordReset;