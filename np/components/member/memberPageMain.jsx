import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import styles from "./MemberPageMain.module.css"


 const MemberPageMain =() => {
  return(
    <> 
  <div className={` ${styles.container1} ${styles.main} ` }>
  {/* 下面是側邊攔 */}

  {/* 這邊是主內容那塊 */}
  <div className>
    {/* 主內容的標題 */}
    <div className={styles.title}>
      <div className={styles.titleNow}>我的帳戶</div>
      <div className={styles.title2}>我的帳戶</div>
    </div>
    {/* 主內容的標題 */}
    {/* 手機板大頭貼 */}
    <div className={styles.mUserimage}>
      <div className={styles.mUImage}>
        <img src alt />
        <div className={styles.camera}>
          <label htmlFor="fileUpload" className={styles.uploadBtn}> <svg xmlns="http://www.w3.org/2000/svg" width={29} height={21} viewBox="0 0 29 21" fill="none">
              <path d="M8.81608 1.97624L8.26313 3.39811H4.29145C2.41461 3.39811 0.888672 4.70606 0.888672 6.31478V17.9814C0.888672 19.5902 2.41461 20.8981 4.29145 20.8981H24.7081C26.585 20.8981 28.1109 19.5902 28.1109 17.9814V6.31478C28.1109 4.70606 26.585 3.39811 24.7081 3.39811H20.7364L20.1835 1.97624C19.8379 1.08301 18.8649 0.481445 17.7643 0.481445H11.2352C10.1347 0.481445 9.16168 1.08301 8.81608 1.97624ZM14.4998 7.77311C15.8535 7.77311 17.1518 8.23405 18.109 9.05452C19.0662 9.87499 19.6039 10.9878 19.6039 12.1481C19.6039 13.3084 19.0662 14.4212 18.109 15.2417C17.1518 16.0622 15.8535 16.5231 14.4998 16.5231C13.1461 16.5231 11.8478 16.0622 10.8906 15.2417C9.93338 14.4212 9.39562 13.3084 9.39562 12.1481C9.39562 10.9878 9.93338 9.87499 10.8906 9.05452C11.8478 8.23405 13.1461 7.77311 14.4998 7.77311Z" fill="#2ECC71" />
            </svg></label>
          {/* 隐藏的文件上传输入框 */}
          <input id="fileUpload" type="file" className={styles.inputfile} />
        </div>
      </div>
    </div>
    {/* 資料顯示區 */}
    <div className= "mt-5 d-flex ">
      <div className={styles.form1}>
        <div className={`${styles.box} row mb-3 align-items-start`}>
          <label htmlFor="name" className={`col-form-label  col-3 ${styles.lb }`}>姓名 :</label>
          <div className="col">
            <input type="text" className="form-control" id="name" placeholder="請輸入姓名" />
          </div>
        </div>
        <div className={`${styles.box} row mb-3 align-items-start`}>
          <label htmlFor="email" className={`col-form-label  col-3 ${styles.lb }`}>Email :</label>
          <div className="col">
            <input type="email" className="form-control" id="email" placeholder="請輸入Email" />
          </div>
        </div>
        <div className={`${styles.box} row mb-3 align-items-start`}>
          <label htmlFor="phone" className={`col-form-label  col-3 ${styles.lb }`}>手機號碼 :</label>
          <div className="col">
            <input type="tel" className="form-control" id="phone" placeholder="請輸入手機號碼" />
          </div>
        </div>
        <div className={`${styles.box} row mb-3 align-items-start`}>
          <label htmlFor="address" className={`col-form-label  col-3 ${styles.lb }`}>地址 :</label>
          <div className="col">
            <input type="text" className="form-control" id="address" placeholder="請輸入地址" />
          </div>
        </div>
        <div className={`${styles.box} row mb-3 align-items-start`}>
          <label className={`col-form-label  col-3 ${styles.lb }`}>性别 :</label>
          <div className={`${styles.checkAlignment} col`}>
            <div className={`${styles.formCheck} form-check form-check-inline `}>
              <input className={`${styles.formCheckInput} form-check-input`} type="checkbox" id="female" defaultValue="女" />
              <label className={`${styles.formCheckLabel} form-check-label`}  htmlFor="female">女</label>
            </div>
            <div className={`${styles.formCheck} form-check form-check-inline `}>
              <input className={`${styles.formCheckInput} form-check-input`} type="checkbox" id="male" defaultValue="男" />
              <label className={`${styles.formCheckLabel} form-check-label`} htmlFor="male">男</label>
            </div>
            <div className={`${styles.formCheck} form-check form-check-inline `}>
              <input className={`${styles.formCheckInput} form-check-input`} type="checkbox" id="other" defaultValue="其他" />
              <label className={`${styles.formCheckLabel} form-check-label`} htmlFor="other">其他</label>
            </div>
          </div>
        </div>
        <div className={`${styles.box} row mb-3 align-items-start`}>
          <label htmlFor="birthday" className={`col-form-label  col-3 ${styles.lb }`}>生日 :</label>
          <div className="col">
            <select className="form-select" id="year">
              <option selected>年份</option>
              {/* 这里可以根据需求填充选项 */}
            </select>
          </div>
          <div className="col">
            <select className="form-select" id="month">
              <option selected>月份</option>
              {/* 这里可以根据需求填充选项 */}
            </select>
          </div>
          <div className="col">
            <select className="form-select" id="day">
              <option selected>日期</option>
              {/* 这里可以根据需求填充选项 */}
            </select>
          </div>
        </div>
        <div className={`${styles.box} row mb-3 align-items-start`}>
          <label htmlFor="password" className={`col-form-label  col-3 ${styles.lb }`}>密碼 :</label>
          <div className="col">
            <input type="password" className="form-control" id="password" placeholder="請輸入密碼" />
          </div>
        </div>
        <a href className={`${styles.reset}   container-fluid text-end `}>[重設密碼]</a>
        <div className={`${styles.btnCenter} ${styles.box} row mb-3 align-items-start `}>
          <button type="submit" className={`${styles.btn1 } ${styles.btnmargin} btn`}>確認修改</button>
        </div>
      </div>
      <div className={styles.mainRight}>
        <div className={styles.userImageBig}>
        {/* <img src="" alt="" /> */}
        </div>
        <div className={`${styles.btnCenter} row mb-3 align-items-start`} >
          <label htmlFor="fileUpload" className={`btn ${styles.btn2} `} >選擇圖片</label>
          <input id="fileUpload" type="file" className={styles.inputfile} />
        </div>
      </div>
    </div>
  </div>
</div>
</>
);

};
export default MemberPageMain;