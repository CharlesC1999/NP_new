import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAa9K5E2-OkHB14hJ3TjZYyeUCUHbaZnvc",
  authDomain: "nutripolls.firebaseapp.com",
  projectId: "nutripolls",
  storageBucket: "nutripolls.appspot.com",
  messagingSenderId: "897520619889",
  appId: "1:897520619889:web:eaa420091ec2aab59d26d0",
  measurementId: "G-M0T5SLGNVZ",
};

let firebaseApp;

// 检查是否有已初始化的 Firebase 应用

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp(); // 获取默认的 Firebase 应用
}

// 获取认证服务实例
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };
