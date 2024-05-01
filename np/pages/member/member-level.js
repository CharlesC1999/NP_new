import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberLevelMain from "@/components/member/MemberLevelMain";
import Sidebar from "@/components/member/Sidebar";
import styles from "@/styles/member-styles/Container1.module.css"
import Header from "@/components/header"
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";



export default function MemberLevel() {
    return (
      <>
      <Header/>
      <Breadcrumbs/>
      <div className={` ${styles.container1} ${styles.main} ` }>
       <Sidebar/>
       <MemberLevelMain/>
       </div>
       <Footer/>
      </>
    );
  }