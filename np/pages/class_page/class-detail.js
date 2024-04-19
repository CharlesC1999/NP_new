import React from "react";
import DetailStyles from "@/styles/class_styles/classDetail.module.css";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClassSidebar from "@/components/class_file/ClassSidebarDetailVersion";
import ClassDetail from "@/components/class_file/class-detail/ClassDetailContent";
import Footer from "@/components/Footer";

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
          <ClassSidebar />
        </div>
        <ClassDetail />
      </div>
      <Footer />
    </div>
  );
};

export default ClassDetailPage;
