import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import PasswordResetMain from "@/components/member/PasswordResetMain";
import Sidebar from "@/components/member/Sidebar";
import styles from "@/styles/member-styles/Container1.module.css"
import Header from "@/components/header"
import Footer from "@/components/footer";


export default function PasswordReset() {
    return (
      <>
      <Header/>
      <div className={` ${styles.container1} ${styles.main} ` }>
       <Sidebar/>
       <PasswordResetMain/>
       </div>
       <Footer/>
      </>
    );
  }