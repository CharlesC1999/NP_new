import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseConfig } from "@/hooks/firebase-config";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const handleGoogleLogin = async (callback) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  // 使用彈出視窗進行登入
  try {
    const result = await signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(token);
    console.log(user);

    // 準備要發送的資料
    const userData = {
      token,
      uid: user.uid,
      providerId: user.providerId,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    try {
      const response = await fetch("http://localhost:3005/api/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log(data, "here");
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userData", JSON.stringify(data.data.user));
      console.log(data.data.token);
      console.log(JSON.stringify(data.data.user));
      // 將用戶資料儲存為 JSON 字串
      // 處理後端回應
      // Call the callback function with the user data
      if (callback) {
        callback(data);
      }

      // 登入成功後重定向到首頁
      window.location.href = "/";
    } catch (error) {
      console.error("Error sending user data to backend:", error);
    }
  } catch (error) {
    console.error("Error during signInWithPopup:", error);
  }
};

export const showGoogleLogin = (login, callback) => {
  const auth = getAuth();
  let loginStatus = { success: false, data: null, error: null };

  // Listening for auth state changes.
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in:", user);
      // 更新應用的登入狀態
      loginStatus.success = true;
      loginStatus.data = user;
      if (callback) {
        callback(loginStatus);
      }
    } else {
      console.log("No user is signed in.");
      loginStatus.success = false;
      loginStatus.data = null;
      if (callback) {
        callback(loginStatus);
      }
    }
  });
};
