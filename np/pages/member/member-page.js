import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberPageMain from "@/components/member/MemberPageMain";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/member-styles/Container1.module.css";
import Sidebar from "@/components/member/Sidebar";
import Link from "next/link";
export default function MemberPage() {
  // 取得localStorage裡的token，用來發起req帶入headers
  const [LStoken, setLStoken] = useState("");
  const getTokenInLS = () => {
    setLStoken(localStorage.getItem("token"));
  };

  // *** 防止直接從網址改變頁面，所以要在這裡判斷LStoken是否有值，有值才能顯示會員中心
  let content;
  if (LStoken) {
    content = (
      <div className={` ${styles.container1} ${styles.main} `}>
        <Sidebar />
        <MemberPageMain />
      </div>
    );
  } else {
    content = (
      <div className="d-flex flex-column justify-content-center align-items-center my-5">
        <h2>嗨~你還沒有登入喔！所以看不到你的資料啦~</h2>
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

  // 初次渲染時取得LS裡的token
  useEffect(() => {
    getTokenInLS();
  }, []);

  return (
    <>
      <Header />
      <Breadcrumbs />
      {content}
      <Footer />
    </>
  );
}
