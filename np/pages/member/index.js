import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberPageMain2 from "@/components/member/MemberPageMain2";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Sidebar from "@/components/member/Sidebar";
import styles from "@/styles/member-styles/Container1.module.css";

export default function MemberPage2() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className={` ${styles.container1} ${styles.main} `}>
        <Sidebar />
        <MemberPageMain2 />
      </div>
      <Footer />
    </>
  );
}
