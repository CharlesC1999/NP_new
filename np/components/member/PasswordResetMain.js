import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./PasswordResetMain.module.css"


 const PasswordResetMain =() => {
  return(
    <> 
  <div className={` ${styles.container1} ${styles.main} ` }>
  {/* 下面是側邊攔 */}
  
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
export default PasswordResetMain;