import React from "react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClassClassifacion from "@/components/class_file/ClassClassification";
import ClassSidebar from "@/components/class_file/ClassSidebar";
// import ClassDateTimePicker from "@/components/class_file/classDateTimePicker";
import ClassFilter from "@/components/class_file/ClassFilter";
import ClassCard from "@/components/class_file/ClassCardCeb";
import ClassCardMobileList from "@/components/class_file/ClassCardMobileList";
import ClassCardMobileGrid from "@/components/class_file/ClassCardMobileGrid";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";

const ForTest = () => {
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
      <ClassClassifacion />
      <ClassSidebar />
      <ClassFilter />
      <ClassCard />
      <ClassCardMobileList />
      <ClassCardMobileGrid />
      <Pagination />
      <Footer />;
    </div>
  );
};

export default ForTest;
