import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberPageMain2 from "@/components/member/MemberPageMain2";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/member/Sidebar";
import styles from "@/styles/member-styles/Container1.module.css";
import Link from "next/link";

export default function MemberPage2() {
  // 判斷性別
  const [checkGender, setCheckGender] = useState("");
  // 把生日切成陣列用來分別顯示年月份
  const [birthAry, setBirthAry] = useState([]);

  // 取得localStorage裡的token，用來發起req帶入headers
  const [LStoken, setLStoken] = useState("");
  const getTokenInLS = () => {
    setLStoken(localStorage.getItem("token"));
  };

  const [userData, setUserData] = useState({
    id: 0,
    User_name: "",
    Account: "",
    Email: "",
    Phone: "",
    Address: "",
    Gender: "",
    date_of_birth: "",
    User_image: null,
  });

  // 串接上後端並把token傳進headers用來解碼
  // !!! 從localStorage取出token後，帶入headers來解碼，若要用postman測試記得Authorization也要選Bearer Token並放入加密的token
  const getUser = async () => {
    const url = "http://localhost:3005/api/member-profile/check";
    const tokenforheaders = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${LStoken}`,
      },
    };
    try {
      const res = await fetch(url, tokenforheaders);
      const data = await res.json();
      setUserData(data.data.user);
    } catch (e) {
      console.log(e);
    }
  };

  // 初次渲染時取得LS裡的token
  useEffect(() => {
    getTokenInLS();
  }, []);

  // 得到token後執行getUser()去後端解碼token並根據得到的user資料查詢資料庫並將資料設定給userData
  useEffect(() => {
    getUser();
  }, [LStoken]);

  // 解碼token完設定給userData後判斷性別以用來顯示在頁面上，因為資料庫是存value，(M跟F)，不直觀
  useEffect(() => {
    // 判斷性別
    if (userData.Gender === "M") {
      setCheckGender("男");
    } else if (userData.Gender === "F") {
      setCheckGender("女");
    } else {
      setCheckGender("其他");
    }

    // 設定生日
    setBirthAry(userData.date_of_birth.split("-"));
  }, [userData]);

  // *** 防止直接從網址改變頁面，所以要在這裡判斷LStoken是否有值，有值才能顯示會員中心
  let content;
  if (LStoken) {
    content = (
      <div className={` ${styles.container1} ${styles.main} `}>
        <Sidebar />
        <MemberPageMain2
          checkGender={checkGender}
          birthAry={birthAry}
          userData={userData}
        />
      </div>
    );
  } else {
    content = (
      <div className="d-flex flex-column justify-content-center align-items-center my-5">
        <h2>嗨~你還沒有登入喔！</h2>
        <Link
          className="text-decoration-none"
          style={{ color: "var(--green02)", fontSize: "20px" }}
          href={"/member/login"}
        >
          點我登入
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Breadcrumbs />
      {/* // !!! 如果有localStorage有token(代表有登入)才顯示會員中心 */}
      {content}
      <Footer />
    </>
  );
}
