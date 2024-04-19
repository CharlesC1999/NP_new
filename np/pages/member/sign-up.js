import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import signUp from "@/styles/Login/signUp.module.scss";
import Footer from "@/components/Footer";

const SignUpPage = () => {
  const Checked = {
    color: "#28a745",
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  };

  return (
    <>
      <div className={signUp.bodyStyles}>
        <div
          className={`${signUp.mainStyle} d-flex align-items-center justify-content-center py-5`}
        >
          <div
            className={`${signUp.main} d-flex p-4 flex-column justify-content-center align-items-center`}
          >
            <div className={`${signUp.h3} my-5 text-align-center text-center`}>
              會員註冊
            </div>
            <div
              className={`${signUp.member} justify-content-evenly d-flex flex-sm-row flex-column`}
            >
              <div
                className={`d-flex flex-column justify-content-center align-items-center`}
              >
                <div className={`${signUp.inputGroup} d-flex flex-column`}>
                  <label htmlFor className={signUp.label}>
                    姓名 (必填)
                  </label>
                  <input
                    type="account"
                    className={`${signUp.input} ps-2`}
                    placeholder="請輸入您的姓名"
                  />
                </div>
                <div className={`${signUp.inputGroup} d-flex flex-column`}>
                  <label htmlFor className={signUp.label}>
                    電子郵件(必填)
                  </label>
                  <input
                    type="account"
                    className={`${signUp.input} ps-2`}
                    placeholder="請輸入您的Email"
                  />
                </div>
                <div className={`${signUp.inputGroup} d-flex flex-column`}>
                  <label htmlFor className={signUp.label}>
                    手機
                  </label>
                  <input
                    type="password"
                    className={`${signUp.input} ps-2`}
                    placeholder="請輸入您的手機"
                  />
                </div>
                <div className={signUp.sex}>
                  <label htmlFor="flexRadioDefault1" className={signUp.label}>
                    性別(必填)
                  </label>
                  <div className={`d-flex flex-row`}>
                    <div className={signUp.formCheck}>
                      <input
                        className={`form-check-input ${signUp.formCheckInput}`}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className={`${signUp.genderLabel} form-check-label px-3`}
                        htmlFor="flexRadioDefault1"
                      >
                        男
                      </label>
                    </div>
                    <div className={`${signUp.formCheck} mx-4`}>
                      <input
                        className={`form-check-input ${signUp.formCheckInput}`}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        defaultChecked
                      />
                      <label
                        className={`${signUp.genderLabel} form-check-label  px-3`}
                        htmlFor="flexRadioDefault2"
                      >
                        女
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={` d-flex flex-column justify-content-cetner align-items-center`}
              >
                <div className={`${signUp.inputGroup} d-flex flex-column`}>
                  <label htmlFor className={signUp.label}>
                    生日
                  </label>
                  <input
                    type="account"
                    className={`${signUp.input} ps-2`}
                    placeholder="請輸入您的生日"
                  />
                </div>
                <div className={`${signUp.inputGroup} d-flex flex-column`}>
                  <label htmlFor className={signUp.label}>
                    密碼(必填)
                  </label>
                  <input
                    type="account"
                    className={`${signUp.input} ps-2`}
                    placeholder="請書您的密碼"
                  />
                </div>
                <div className={`${signUp.inputGroup} d-flex flex-column`}>
                  <label htmlFor className={signUp.label}>
                    密碼確認(必填)
                  </label>
                  <input
                    type="password"
                    className={`${signUp.input} ps-2`}
                    placeholder="在輸入一次密碼"
                  />
                </div>
              </div>
            </div>
            <div className={`area3 my-5 `}>
              <button className={signUp.signUpButton}>註冊會員</button>
              <div
                className={`d-flex flex-column flex-sm-row justify-content-center mt-2`}
              >
                <div className={`text-center`}>我已經有會員帳號了?</div>
                <div className={`justify-content-center d-flex`}>
                  <a
                    href
                    className={`${signUp.backhome} ms-2 text-decoration-none`}
                  >
                    回登入頁面
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
