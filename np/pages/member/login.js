import React, { useState, useEffect } from "react";
// axios
import axios from "axios";
// contexts
import { useAuth } from "@/contexts/AuthContext";
// styles
import { useRouter } from "next/router";
// useRouter
import "bootstrap/dist/css/bootstrap.min.css";
import LoginStyle from "@/styles/Login/login.module.scss";
import Footer from "@/components/Footer";

const Login = () => {
  const errorText = {
    height: "24px",
    color: "red",
    marginTop: "4px",
    width: "315px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  };
  // style

  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // 錯誤次數
  const [attempts, setAttempts] = useState(0);
  // 嘗試登入次數
  const [loginBlocked, setLoginBlocked] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginBlocked) {
      setError("錯誤次數過多，請15分鐘後再次嘗試");
      return;
    }

    try {
      const response = await axios.post("/api/login", { username, password });
      if (response.status === 200) {
        login(response.data.token);
        // 使用Context的login方法
        console.log("登入成功!");
        router.push("/");
        // 用useRouter跳轉
        // 登入成功後，可能需要重定向或其他操作
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("登入失敗", error.response.data.message);
        setAttempts((prevAttempts) => prevAttempts + 1);
        if (attempts >= 5) {
          setLoginBlocked(true);
          setError("錯誤次數過多，請15分鐘後再次嘗試");
          setTimeout(() => setLoginBlocked(false), 15 * 60 * 1000);
          setTimeout(() => setAttempts(0), 15 * 60 * 1000);
        } else {
        }
        setError("帳號或密碼錯誤，請重新嘗試");
      } else {
        setError("登入時發生錯誤，請稍後再試");
      }
      // 處理錯誤情況（例如顯示錯誤消息）
    }
  };

  const openEyes = () => {
    setShowPassword(!showPassword);
  };

  // 連結用router導
  const goSignUp = () => {
    // 導到註冊
    router.push("/member/sign-up");
  };

  return (
    <main className={LoginStyle.bodyStyle}>
      <div
        className={`${LoginStyle.mainStyle} d-flex align-items-center justify-content-center`}
      >
        <div className={`${LoginStyle.main} d-flex`}>
          <div classclassName={LoginStyle.imgMember}>
            <img src="/images/login-Image/login-main.png" />
          </div>
          <div
            className={`${LoginStyle.MainText} d-flex flex-column justify-content-cetner align-items-center`}
          >
            <div className={`${LoginStyle.h3} text-align-center`}>會員登入</div>
            <form onSubmit={handleLogin}>
              <div
                className={`${LoginStyle.inputGroup} ${LoginStyle.inputGroupFirst} d-flex flex-column`}
              >
                <label htmlFor="username">帳號：</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={`${LoginStyle.inputGroup} d-flex flex-column`}>
                <label htmlFor="password">密碼：</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* 如果有错误，显示错误消息 */}
              <div style={errorText}>{error ? <div>{error}</div> : null}</div>
              <div
                className={`${LoginStyle.buttonContainer} d-flex text-align-center justify-content-center`}
              >
                <button
                  onClick={handleLogin}
                  className={`${LoginStyle.buttonStyle} ${LoginStyle.startShopping} btn btn-success`}
                >
                  開始購物吧！
                </button>
              </div>
            </form>
            <div classclassName={LoginStyle.social}>
              <p
                href
                className={`${LoginStyle.social} d-inline-block text-center text-decoration-none`}
              >
                或使用社群登入
              </p>
            </div>
            <div
              className={`${LoginStyle.iconGroup} mt-2 d-flex justify-content-center`}
            >
              <svg
                // Facebook
                xmlns="http://www.w3.org/2000/svg"
                width="21px"
                height="21px"
                viewBox="0 0 24 24"
                className={LoginStyle.socialMediaIcon}
              >
                <path
                  fill="#50bf8b"
                  d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                />
              </svg>
              <svg
                // Line
                xmlns="http://www.w3.org/2000/svg"
                width="21px"
                height="21px"
                viewBox="-2 -2.5 24 24"
                className={LoginStyle.socialMediaIcon}
              >
                <path
                  fill="#50bf8b"
                  d="M19.914 9.003a6.741 6.741 0 0 1-.764 2.2c-.179.324-1.056 1.558-1.325 1.884c-1.478 1.788-3.953 3.851-8.092 5.857a.545.545 0 0 1-.78-.552l.21-1.885a.545.545 0 0 0-.483-.604C3.781 15.388 0 12.04 0 7.986C0 3.576 4.476 0 9.997 0c5.366 0 9.744 3.377 9.987 7.615c.007.123.026.516.01.78c-.011.16-.034.365-.08.608m-15.414.6V6.24a.512.512 0 1 0-1.023 0v3.877c0 .284.23.514.512.514h2.045a.512.512 0 0 0 0-1.027H4.5zm3.154 1.028a.4.4 0 0 0 .4-.401V6.128a.4.4 0 0 0-.4-.402h-.223a.4.4 0 0 0-.4.402v4.102a.4.4 0 0 0 .4.4zm4.133-4.391v2.369s-2.042-2.676-2.074-2.71a.508.508 0 0 0-.4-.172a.527.527 0 0 0-.492.534v3.856a.512.512 0 1 0 1.023 0V7.763s2.073 2.698 2.104 2.727c.09.086.211.14.346.14c.284.003.516-.249.516-.534V6.24a.512.512 0 1 0-1.023 0m4.858 0a.512.512 0 0 0-.512-.514h-2.045a.512.512 0 0 0-.511.514v3.877c0 .284.229.514.511.514h2.045a.512.512 0 0 0 0-1.027H14.6v-.912h1.534a.512.512 0 0 0 0-1.027H14.6v-.912h1.534c.283 0 .512-.23.512-.513z"
                />
              </svg>
            </div>
            <div
              className={`${LoginStyle.member} d-flex justify-content-start`}
            >
              <a
                href
                className={`${LoginStyle.notMember} d-inline-block text-center text-decoration-none`}
              >
                還不是會員？
              </a>
            </div>
            <div
              className={`${LoginStyle.buttonContainer} d-flex text-align-center justify-content-center`}
            >
              <button
                className={`${LoginStyle.buttonStyle} btn btn-success mt-2 text-align-center`}
                onClick={goSignUp}
              >
                註冊會員
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Login;
