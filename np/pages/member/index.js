import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberPageMain2 from "@/components/member/MemberPageMain2";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/member/Sidebar";
import styles from "@/styles/member-styles/Container1.module.css";
// !!! 用來取出token發起req時放到headers解密用
import { useAuth } from "@/contexts/AuthContext";

export default function MemberPage2() {
  // 判斷性別
  const [checkGender, setCheckGender] = useState("");
  // 把生日切成陣列用來分別顯示年月份
  const [birthAry, setBirthAry] = useState([]);

  // 取得token後發req時帶入headers並解碼回傳token存的使用者資料
  const { auth } = useAuth();
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
  // !!! 從auth取出token後，帶入headers來解碼，若要用postman測試記得Authorization也要選Bearer Token並放入加密的token
  const getUser = async () => {
    const url = "http://localhost:3005/api/member-profile/check";
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await res.json();
      setUserData(data.data.user);
    } catch (e) {
      console.log(e);
    }
  };

  // 初次渲染時取得登入的使用者資料
  useEffect(() => {
    getUser();
  }, []);

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

  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className={` ${styles.container1} ${styles.main} `}>
        <Sidebar userData={userData} />
        <MemberPageMain2
          checkGender={checkGender}
          birthAry={birthAry}
          userData={userData}
        />
      </div>
      <Footer />
    </>
  );
}
