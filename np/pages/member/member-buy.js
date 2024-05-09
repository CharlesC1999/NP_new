import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberBuyMain from "@/components/member/MemberBuyMain";
import Sidebar from "@/components/member/Sidebar";
import styles from "@/styles/member-styles/Container1.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
//抓取登入狀態
import { useAuth } from "@/contexts/AuthContext";
export default function MemberBuy() {
 //抓取登入狀態
 const { auth, logout } = useAuth();
 //確認一下有沒有抓到
 console.log(auth);

  return (
    <>
      <Header />
      <Breadcrumbs/>
      {auth.isLoggedIn ? (
      <div className={` ${styles.container1} ${styles.main} `}>
        <Sidebar />
        <MemberBuyMain />
      </div>
      //  要抓登入狀態才能看到的區塊
    ): (<a href="http://localhost:3000/member/login"><h1>請登入</h1></a>)} 
      <Footer />
    </>
  );
}
