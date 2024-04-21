import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import signUp from "@/styles/Login/signUp.module.scss";
import Footer from "@/components/Footer";

const SignUpPage = () => {
  const Checked = {
    color: "#28a745",
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  };

  const [formData, setFormData] = useState({
    user_name: "",
    account: "",
    email: "",
    phone: "",
    gender: "M",
    date_of_birth: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("/api/sign-up", formData);
      alert("Registration successful");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    }
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
            <form
              className={`d-flex flex-column gap-3 align-items-center`}
              onSubmit={handleSubmit}
            >
              <div
                className={`${signUp.member} justify-content-between d-flex flex-sm-row flex-column gap-3`}
              >
                <div
                  className={`d-flex flex-column justify-content-center align-items-center`}
                >
                  <div className={`${signUp.inputGroup} d-flex flex-column`}>
                    <label htmlFor className={signUp.label}>
                      姓名 (必填)
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`${signUp.input} ps-2`}
                      placeholder="請輸入您的姓名"
                      required
                    />
                  </div>
                  <div className={`${signUp.inputGroup} d-flex flex-column`}>
                    <label htmlFor className={signUp.label}>
                      帳號 (必填)
                    </label>
                    <input
                      type="account"
                      name="account"
                      value={formData.account}
                      onChange={handleChange}
                      className={`${signUp.input} ps-2`}
                      placeholder="請輸入您的帳號"
                      required
                    />
                  </div>
                  <div className={`${signUp.inputGroup} d-flex flex-column`}>
                    <label htmlFor className={signUp.label}>
                      電子郵件(必填)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`${signUp.input} ps-2`}
                      placeholder="請輸入您的Email"
                      required
                    />
                  </div>
                  <div className={`${signUp.inputGroup} d-flex flex-column`}>
                    <label htmlFor className={signUp.label}>
                      手機
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`${signUp.input} ps-2`}
                      placeholder="請輸入您的手機"
                    />
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
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      className={`${signUp.input} ps-2`}
                      placeholder="請輸入您的生日"
                    />
                  </div>
                  <div className={`${signUp.inputGroup} d-flex flex-column`}>
                    <label htmlFor className={signUp.label}>
                      密碼(必填)
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`${signUp.input} ps-2`}
                      placeholder="請輸您的密碼"
                      required
                    />
                  </div>
                  <div className={`${signUp.inputGroup} d-flex flex-column`}>
                    <label htmlFor className={signUp.label}>
                      密碼確認(必填)
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`${signUp.input} ps-2`}
                      placeholder="再輸入一次密碼"
                      required
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
                          name="gender"
                          value="M"
                          onChange={handleChange}
                          checked={formData.gender === "M"}
                          id="flexRadioDefault1"
                          required
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
                          name="gender"
                          value="F"
                          onChange={handleChange}
                          checked={formData.gender === "F"}
                          id="flexRadioDefault2"
                          defaultChecked
                          required
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
              </div>
              <button className={`${signUp.signUpButton} mt-3`} type="submit">
                註冊會員
              </button>
            </form>
            <div className={`area3 mt-1 mb-5`}>
              <div
                className={`d-flex flex-column flex-sm-row justify-content-center mt-2`}
              >
                <div className={`text-center`}>我已經有會員帳號了?</div>
                <div className={`justify-content-center d-flex`}>
                  <a
                    href="./login"
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
