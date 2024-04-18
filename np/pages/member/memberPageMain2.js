import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MemberPageMain2 from "@/components/member/memberPageMain2";
import Header from "@/components/header"
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";



export default function Member() {
    return (
      <>
      <Header/>
      <Breadcrumbs/>
       <MemberPageMain2/>
       <Footer/>
      </>
    );
  }