import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./PasswordResetMain.module.css";
// 顯示密碼用的圖案
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";

const PasswordResetMain = () => {
  // 三顆眼睛
  const [eyeOrigin, setEyeOrigin] = useState(false);
  const [eyeNew, setEyeNew] = useState(false);
  const [eyeCfm, setEyeCfm] = useState(false);

  // 顯示密碼用的函式
  const showOrigin = () => {
    setEyeOrigin(!eyeOrigin);
  };
  const showNew = () => {
    setEyeNew(!eyeNew);
  };
  const showCfm = () => {
    setEyeCfm(!eyeCfm);
  };

  // 狀態為物件，屬性對應到表單的欄位名稱
  const [password, setPassword] = useState({
    origin: "",
    new: "",
    confirmPassword: "",
  });

  // 錯誤訊息狀態
  const [errors, setErrors] = useState({
    origin: "",
    new: "",
    confirmPassword: "",
  });

  // 輸入欄位變動時的處理函式
  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  // 表單送出時的處理函式
  const handleSubmit = (e) => {
    e.preventDefault();

    // 檢查欄位是否有空白
    const newErrors = {
      origin: "",
      new: "",
      confirmPassword: "",
    };

    // 檢查欄位是否有空白
    if (!password.origin) {
      newErrors.origin = "請輸入舊密碼";
    }
    if (!password.new) {
      newErrors.new = "請輸入新密碼";
    }
    if (!password.confirmPassword) {
      newErrors.confirmPassword = "請再次輸入新密碼";
    }
    // 檢查兩次密碼是否一致
    if (password.new !== password.confirmPassword) {
      newErrors.confirmPassword = "兩次輸入的密碼不一致";
    }

    // 設定錯誤訊息
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) {
      return console.log("有錯誤");
    }

    updatePassword();
  };

  // 取得localStorage裡的token，用來發起req帶入headers
  const [LStoken, setLStoken] = useState("");
  const getTokenInLS = () => {
    setLStoken(localStorage.getItem("token"));
  };

  const updatePassword = async () => {
    const url = `http://localhost:3005/api/reset-password`;
    const res = await fetch(url, {
      method: "put",
      headers: {
        Authorization: `Bearer ${LStoken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password),
    });
    const data = await res.json();
    alert(data.message);
  };

  // 初次渲染時取得LS裡的token
  useEffect(() => {
    getTokenInLS();
  }, []);

  return (
    <>
      <div className={` ${styles.container1} ${styles.main} `}>
        {/* 下面是側邊攔 */}

        {/* 這邊是主內容那塊 */}
        <div className={styles.mainMid}>
          {/* 主內容的標題 */}
          <div className={styles.title}>
            <div className={styles.titleNow}>修改密碼</div>
            {/* <div className={styles.title2}>我的帳戶</div> */}
          </div>
          {/* 主內容的標題 */}
          {/* 手機板大頭貼 */}

          {/* 資料顯示區 */}
          <div className="mt-5 d-flex ">
            <div className={styles.form1}>
              <div className={`${styles.box} row mb-3 align-items-start`}>
                <label
                  htmlFor="origin"
                  className={`col-form-label text-end col-3 ${styles.lb}`}
                >
                  舊密碼 :
                </label>
                <div className="col d-flex gap-3 align-items-center">
                  <input
                    type={eyeOrigin ? "text" : "password"}
                    className="form-control"
                    id="origin"
                    name="origin"
                    placeholder="請輸入舊密碼"
                    value={password.origin}
                    onChange={handleChange}
                  />
                  {eyeOrigin ? (
                    <PiEyeBold
                      style={{ cursor: "pointer" }}
                      onClick={showOrigin}
                    />
                  ) : (
                    <PiEyeClosedBold
                      style={{ cursor: "pointer" }}
                      onClick={showOrigin}
                    />
                  )}
                </div>
                {/* // 錯誤訊息 */}
                <div className="col-12 d-flex justify-content-center">
                  <span style={{ color: "red" }} className="error">
                    {errors.origin}
                  </span>
                </div>
              </div>
              <div className={`${styles.box} row mb-3 align-items-start`}>
                <label
                  htmlFor="password"
                  className={`col-form-label text-end col-3 ${styles.lb}`}
                >
                  新密碼 :
                </label>
                <div className="col d-flex gap-3 align-items-center">
                  <input
                    type={eyeNew ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="new"
                    placeholder="請輸入新密碼"
                    value={password.new}
                    onChange={handleChange}
                  />
                  {eyeNew ? (
                    <PiEyeBold
                      style={{ cursor: "pointer" }}
                      onClick={showNew}
                    />
                  ) : (
                    <PiEyeClosedBold
                      style={{ cursor: "pointer" }}
                      onClick={showNew}
                    />
                  )}
                </div>
                {/* // 錯誤訊息 */}
                <div className="col-12 d-flex justify-content-center">
                  <span style={{ color: "red" }} className="error">
                    {errors.new}
                  </span>
                </div>
              </div>
              <div className={`${styles.box} row mb-3 align-items-start`}>
                <label
                  htmlFor="cfmedPassword"
                  className={`col-form-label text-end col-3 ${styles.lb}`}
                >
                  確認密碼 :
                </label>
                <div className="col d-flex gap-3 align-items-center">
                  <input
                    type={eyeCfm ? "text" : "password"}
                    className="form-control"
                    id="cfmedPassword"
                    placeholder="請再次輸入新密碼"
                    value={password.confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                  />
                  {eyeCfm ? (
                    <PiEyeBold
                      style={{ cursor: "pointer" }}
                      onClick={showCfm}
                    />
                  ) : (
                    <PiEyeClosedBold
                      style={{ cursor: "pointer" }}
                      onClick={showCfm}
                    />
                  )}
                </div>
                {/* // 錯誤訊息 */}
                <div className="col-12 d-flex justify-content-center">
                  <span style={{ color: "red" }} className="error">
                    {errors.confirmPassword}
                  </span>
                </div>
              </div>

              <div
                className={`${styles.btnCenter} ${styles.box} row mb-3 align-items-start `}
              >
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className={`${styles.btn1} ${styles.btnmargin} btn`}
                >
                  確認修改
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PasswordResetMain;
