import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./MemberPageMain2.module.css";
import { useRouter } from "next/router";

const MemberPageMain2 = ({
  checkGender = "",
  birthAry = [],
  userData = {
    id: 0,
    User_name: "",
    Account: "",
    Email: "",
    Phone: "",
    Address: "",
    Gender: "",
    date_of_birth: "",
    User_image: null,
  },
}) => {
  // 跳轉頁面至修改基本資料
  const router = useRouter();

  return (
    <>
      <div className={` ${styles.container1} ${styles.main} `}>
        {/* 下面是側邊攔 */}

        {/* 這邊是主內容那塊 */}
        <div className>
          {/* 主內容的標題 */}
          <div className={styles.title}>
            <div className={styles.titleNow}>個人檔案</div>
            {/* <div className={styles.title2}>我的帳戶</div> */}
          </div>
          {/* 主內容的標題 */}
          {/* 手機板大頭貼 */}
          <div className={styles.mUserimage}>
            <div className={`rounded-circle  ${styles.mUImage}`}>
              <img
                src={`http://localhost:3005/avatar/${userData.User_image}`}
                alt=""
                className="w-100 h-100 object-fit-cover rounded-circle"
              />
            </div>
          </div>
          {/* 資料顯示區 */}
          <div className="mt-5 d-flex ">
            <div className={styles.form1}>
              <div className={`${styles.box} row mb-3 align-items-start`}>
                <label
                  htmlFor="name"
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  姓名 :
                </label>
                <div className="col">
                  <span className={styles.userContent}>
                    {userData.User_name}
                  </span>
                </div>
              </div>
              <div className={`${styles.box} row mb-3 align-items-start`}>
                <label
                  htmlFor="email"
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  Email :
                </label>
                <div className="col">
                  <span className={styles.userContent}>{userData.Email}</span>
                </div>
              </div>
              <div className={`${styles.box} row mb-3 align-items-start`}>
                <label
                  htmlFor="phone"
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  手機號碼 :
                </label>
                <div className="col">
                  <span className={styles.userContent}>{userData.Phone}</span>
                </div>
              </div>
              <div className={`${styles.box} row mb-3 align-items-start`}>
                <label
                  htmlFor="address"
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  地址 :
                </label>
                <div className="col">
                  <span className={styles.userContent}>
                    {userData.Address === "null" || userData.Address === ""
                      ? "尚未填寫"
                      : userData.Address}
                  </span>
                </div>
              </div>
              <div className={`${styles.box} row mb-3 align-items-start`}>
                <label
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  性别 :
                </label>
                <div className={`${styles.checkAlignment} col`}>
                  <span className={styles.userContent}>{checkGender}</span>
                </div>
              </div>
              <div className={`${styles.box} row mb-3 align-items-start`}>
                <label
                  htmlFor="birthday"
                  className={`col-form-label text-end  col-3 ${styles.lb}`}
                >
                  生日 :
                </label>
                <div className="col">
                  <span className={styles.userContent}>{birthAry[0]} 年</span>
                  <span className={styles.userContent}>{birthAry[1]} 月</span>
                  <span className={styles.userContent}>{birthAry[2]} 日</span>
                </div>
              </div>
              {/* // !密碼不該顯示在會員資料中 */}
              {/* <div className={`${styles.box} row mb-3 align-items-start`}>
          <label htmlFor="password" className={`col-form-label  col-3 ${styles.lb }`}>密碼 :</label>
          <div className="col">
            <span className={styles.userContent}>12345</span>
          </div>
        </div>
        <a href className={`${styles.reset}   container-fluid text-end `}>[重設密碼]</a> */}
              <div
                className={`${styles.btnCenter} ${styles.box} row mb-3 align-items-start `}
              >
                <button
                  onClick={() => {
                    router.push("/member/member-page");
                  }}
                  type="submit"
                  className={`${styles.btn1} ${styles.btnmargin} btn`}
                >
                  修改資料
                </button>
              </div>
            </div>
            <div className={styles.mainRight}>
              {/* // ! 會員基本資料無須選擇圖片，修改資料才需要 */}
              <div className={styles.userImageBig}>
                <img
                  src={`http://localhost:3005/avatar/${userData.User_image}`}
                  alt=""
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              {/* <div className={`${styles.btnCenter} row mb-3 align-items-start`}>
                <label htmlFor="fileUpload" className={`btn ${styles.btn2} `}>
                  選擇圖片
                </label>
                <input
                  id="fileUpload"
                  type="file"
                  className={styles.inputfile}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MemberPageMain2;
