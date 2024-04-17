import React from "react";
import DetailStyles from "@/styles/class_styles/classDetail.module.css";
import Header from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClassDetail from "@/components/class_file/class-detail/class-detail-content";
import Footer from "@/components/footer";

const ClassDetailPage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Breadcrumbs />
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

export default ClassDetailPage;
