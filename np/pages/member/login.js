import React, { useState, useEffect } from "react";
// axios
import axios from "axios";
// contexts
import { useAuth } from "@/contexts/AuthContext";
// styles
import { useRouter } from "next/router";
// useRouter
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
// React Icon
import "bootstrap/dist/css/bootstrap.min.css";
import LoginStyle from "@/styles/Login/login.module.scss";
import Footer from "@/components/Footer";
// 導入路徑配置
import routes from "@/contexts/routes";
// Google登入
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { firebaseConfig } from "@/hooks/firebase-config";
// 讀取畫面
import { useLoader } from "@/hooks/use-loader";
// sweetAlert
import Swal from "sweetalert2";
import { result } from "lodash";

const Login = () => {
  // 導入讀取鉤子
  const { setLoading } = useLoader();

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
  // 開眼
  const [showPassword, setShowPassword] = useState(false);
  // google login
  // if (!getApps().length) {
  //   initializeApp(firebaseConfig);
  // }
  useEffect(() => {
    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }
  }, []);
  // const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginBlocked) {
      setError("錯誤次數過多，請15分鐘後再次嘗試");
      return;
    }
    setLoading(true); // 開始加載畫面
    try {
      const response = await axios.post("http://localhost:3005/api/login", {
        username,
        password,
      });
      if (response.status === 200) {
        login(response.data.token);
        // 使用Context的login方法
        console.log("登入成功!");
        Swal.fire({
          title: "登入成功",
          // text: "That thing is still around?",
          icon: "success",
          // 按鈕綠色
          confirmButtonColor: "#50bf8b",
        });
        setLoading(false);
        router.push("/");
        // 用useRouter跳轉
        // 登入成功後，可能需要重定向或其他操作
      } else {
        throw new Error("登入失敗");
      }
    } catch (error) {
      setLoading(false);
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
  // 開眼
  const openEyes = () => {
    setShowPassword(!showPassword);
  };

  // Google登入
  const handleGoogleLogin = () => {
    try {
      const auth = getAuth();

      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      // signInWithRedirect(auth, provider);
      signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;
        console.log(user);
      });
    } catch (error) {
      console.error("登入失敗:", error);
    }
  };

  useEffect(() => {
    // 检查重定向结果
    const checkGoogleLogin = async () => {
      // const auth = getAuth();

      // const result = await getRedirectResult(auth);

      // console.log(result);

      return;
      try {
        const auth = getAuth();

        const result = await getRedirectResult(auth);

        if (result) {
          if (result.credential && result.credential.accessToken) {
            const gToken = result.credential.accessToken; // Google 令牌
            const userData = {
              name: result.user.displayName,
              email: result.user.email,
              photoURL: result.user.photoURL,
            };
            await axios.post("/api/google-login", { gToken });
            console.log("登入成功", result.user);
            login(gToken, userData);
          } else {
            console.log("未获得有效的访问令牌");
          }
        } else {
          console.log("未检测到重定向结果");
        }
      } catch (error) {
        console.error("重定向结果失败:", error);
      }
    };

    checkGoogleLogin();
  }, []);

  // 連結用router導
  const goSignUp = () => {
    // 導到註冊
    router.push("/member/sign-up");
  };
  const goIndex = () => router.push(routes.home);

  return (
    <main className={LoginStyle.bodyStyle}>
      <FaArrowLeft
        className={LoginStyle.goBack}
        size={40}
        color="#50bf8b"
        onClick={goIndex}
      />
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
                <div className={LoginStyle.openYourEyes}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    style={{ width: "285px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className={LoginStyle.yourEyes}
                    onClick={openEyes}
                    type="button"
                  >
                    {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                  </button>
                </div>
              </div>
              {/* if error, show error */}
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
              <button
                onClick={handleGoogleLogin}
                className={LoginStyle.socialMediaButton}
              >
                <svg
                  // google
                  xmlns="http://www.w3.org/2000/svg"
                  width="21px"
                  height="21px"
                  viewBox="0 0 24 24"
                  className={LoginStyle.socialMediaIcon}
                >
                  <path
                    fill="#50bf8b"
                    fill-rule="evenodd"
                    d="M12.037 21.998a10.3 10.3 0 0 1-7.168-3.049a9.9 9.9 0 0 1-2.868-7.118a9.95 9.95 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.94 9.94 0 0 1 6.614 2.564L16.457 6.88a6.2 6.2 0 0 0-4.131-1.566a6.9 6.9 0 0 0-4.794 1.913a6.62 6.62 0 0 0-2.045 4.657a6.6 6.6 0 0 0 1.882 4.723a6.9 6.9 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678q.113.927.1 1.859c-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button className={LoginStyle.socialMediaButton}>
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
              </button>
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
