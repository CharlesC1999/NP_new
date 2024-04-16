import React from "react";
import Header from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClassClassifacion from "@/components/class_file/class-classification";
import ClassDateTimePicker from "@/components/class_file/class-detail/classDateTimePicker";
import ClassFilter from "@/components/class_file/class-filter";
import ClassCard from "@/components/class_file/class-card-web";
import ClassCardMobileList from "@/components/class_file/class-card-mobile-list";
import ClassCardMobileGrid from "@/components/class_file/class-card-mobile-grid";
import Footer from "@/components/footer";

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
      <ClassDateTimePicker />
      <ClassFilter />
      <ClassCard />
      <ClassCardMobileList />
      <ClassCardMobileGrid />
      <Footer />;
    </div>
  );
};

export default ForTest;
