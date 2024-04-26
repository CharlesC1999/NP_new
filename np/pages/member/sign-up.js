import React, { useState, useCallback } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import signUp from "@/styles/Login/signUp.module.scss";
import Footer from "@/components/Footer";
// for mui
// import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// dayjs
import dayjs from "dayjs";
// React Icon
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";
// lodash
import _ from "lodash";
// useRouter
import { useRouter } from "next/router";
// 導入路徑配置
import routes from "@/contexts/routes";

const SignUpPage = () => {
  const router = useRouter();

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
    date_of_birth: null,
    password: "",
    confirmPassword: "",
  });

  // 開眼
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);
  // 帳號信箱是否存在
  const [accountExists, setAccountExists] = useState("");
  const [emailExists, setEmailExists] = useState("");
  // 密碼確認錯誤
  const [confirmError, setConfirmError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      date_of_birth: newValue ? dayjs(newValue) : null,
    });
  };

  const openEyes = () => {
    setShowPassword(!showPassword);
  };

  const openEyesC = () => {
    setShowPasswordC(!showPasswordC);
  };

  // 檢查帳號是否重複
  const checkAccountExists = useCallback(
    _.debounce(async (Account) => {
      if (!Account) return;
      try {
        const response = await axios.get(
          `http://localhost:3005/api/checkAccount`,
          {
            params: { Account: Account }, // 使用查询参数
          }
        );
        console.log("帳號回傳結果:", response.data);
        setAccountExists(response.data.exists ? "帳號已存在" : "");
      } catch (error) {
        console.error("Error checking account", error);
        setAccountExists("檢查帳號時發生錯誤");
      }
    }, 500),
    []
  );
  // 檢查信箱是否重複
  const checkEmailExists = useCallback(
    _.debounce(async (Email) => {
      if (!Email) return;
      try {
        const response = await axios.get(
          `http://localhost:3005/api/checkEmail`,
          {
            params: { Email: Email }, // 使用查詢參數
          }
        );
        console.log("信箱回傳結果:", response.data);
        setEmailExists(response.data.exists ? "信箱已存在" : "");
      } catch (error) {
        console.error("Error checking email", error);
        setAccountExists("檢查信箱時發生錯誤");
      }
    }, 300),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // alert("Passwords do not match");
      setConfirmError("密碼不一致");
      return;
    }

    // 確保在表單提交前完成帳號和郵箱的檢查
    await checkAccountExists(formData.account);
    await checkEmailExists(formData.email);

    if (accountExists || emailExists) {
      alert("帳號或信箱已存在");
      return;
    }

    // 確保日期是正確的 dayjs 格式
    const submitData = {
      ...formData,
      date_of_birth: formData.date_of_birth
        ? formData.date_of_birth.toISOString()
        : "",
    };

    try {
      await axios.post("http://localhost:3005/api/signUp", submitData);
      alert("註冊成功");
      router.push(routes.login);
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    }
  };

  const handleAccountChange = (e) => {
    handleChange(e);
    checkAccountExists(e.target.value);
  };

  const handleEmailChange = (e) => {
    handleChange(e);
    checkEmailExists(e.target.value);
  };

  const goLogin = () => router.push(routes.login);

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
                  <div
                    className={`${signUp.inputGroupForError} d-flex flex-column`}
                  >
                    <label htmlFor className={signUp.label}>
                      帳號 (必填)
                    </label>
                    <input
                      type="account"
                      name="account"
                      minlength="8"
                      maxlength="24"
                      value={formData.account}
                      onChange={handleAccountChange}
                      className={`${signUp.input} ps-2`}
                      placeholder="請輸入您的帳號"
                      required
                    />
                    <div className={signUp.errorText}>
                      {accountExists && (
                        <div className="text-danger">{accountExists}</div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`${signUp.inputGroupForError} d-flex flex-column`}
                  >
                    <label htmlFor className={signUp.label}>
                      電子信箱(必填)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleEmailChange}
                      className={`${signUp.input} ps-2`}
                      placeholder="請輸入您的Email"
                      required
                    />
                    <div className={signUp.errorText}>
                      {emailExists && (
                        <div className="text-danger">{emailExists}</div>
                      )}
                    </div>
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="請輸入您的生日"
                        disableFuture //禁用未來日期
                        value={formData.date_of_birth}
                        onChange={handleDateChange}
                        sx={{
                          width: "310px",
                          height: "35px",
                          bgcolor: "#ECECEC",
                          borderRadius: "5px",
                          border: "none",
                          "& .MuiInputBase-input": {
                            paddingBlock: "0px",
                            height: "35px",
                            lineHeight: "35px",

                            border: "none",
                          },
                          "& .MuiFormLabel-root": {
                            left: "-5px",
                            top: "-9px",
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#50bf8b",
                          },

                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "& .MuiOutlinedInput-root": {
                            "&:hover > fieldset": { borderColor: "none" },
                          },
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                  <div className={`${signUp.inputGroup} d-flex flex-column`}>
                    <label htmlFor className={signUp.label}>
                      密碼(必填)
                    </label>
                    <div className={signUp.openYourEyes}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        minlength="8"
                        pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}" //至少要有大小寫及8個字符以上
                        title="密碼必須包含至少8個字符，包含一個小寫字母和一個大寫字母。"
                        value={formData.password}
                        onChange={handleChange}
                        className={`${signUp.input2} ps-2`}
                        placeholder="請輸您的密碼"
                        required
                      />
                      <button
                        className={signUp.yourEyes}
                        onClick={openEyes}
                        type="button"
                      >
                        {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                      </button>
                    </div>
                  </div>
                  <div
                    className={`${signUp.inputGroupForError} d-flex flex-column`}
                  >
                    <label htmlFor className={signUp.label}>
                      密碼確認(必填)
                    </label>
                    <div className={signUp.openYourEyes}>
                      <input
                        type={showPasswordC ? "text" : "password"}
                        name="confirmPassword"
                        minlength="8"
                        pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}" //至少要有大小寫及8個字符以上
                        title="密碼必須包含至少8個字符，包含一個小寫字母和一個大寫字母。"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`${signUp.input2} ps-2`}
                        placeholder="再輸入一次密碼"
                        required
                      />
                      <button
                        className={signUp.yourEyes}
                        onClick={openEyesC}
                        type="button"
                      >
                        {showPasswordC ? <PiEyeBold /> : <PiEyeClosedBold />}
                      </button>
                    </div>
                    <div className={signUp.errorText}>
                      {confirmError && (
                        <div className="text-danger">{confirmError}</div>
                      )}
                    </div>
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
                    onClick={goLogin}
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
