import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberPageMain from "@/components/member/MemberPageMain";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import styles from "@/styles/member-styles/Container1.module.css";
import Sidebar from "@/components/member/Sidebar";
export default function MemberPage() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <div className={` ${styles.container1} ${styles.main} `}>
        <Sidebar />
        <MemberPageMain />
      </div>
      <Footer />
    </>
  );
}
