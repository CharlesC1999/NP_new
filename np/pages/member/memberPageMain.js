import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Memberpage from "@/components/member/memberPageMain";
import Header from "@/components/header"


export default function Member() {
    return (
      <>
      <Header/>
       <Memberpage/>
      </>
    );
  }