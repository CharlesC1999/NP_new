import React from "react";
// import DisplayNoneInMobile from "@/pages/forThoseDisplayNoneInMobile.module.css";
import DetailStyles from "@/pages/classDetail.module.css";
import Header from "@/components/header";
import ClassDetail from "@/components/class_file/class-detail/class-detail-content";
import Footer from "@/components/footer";

const ForTest2 = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <Header />
      <img src="/images/bread.png" className={DetailStyles.webNone} />
      <div className={DetailStyles.dF}>
        <div className={DetailStyles.dFC}>
          <img src="/images/sidebar1.PNG" />
          <img src="/images/sidebar2.PNG" />
        </div>
        <ClassDetail />
      </div>
      <Footer />
    </div>
  );
};

export default ForTest2;