import React from "react";
import Header from "@/components/header";
import ClassFilter from "@/components/class_file/class-filter";
import ClassCard from "@/components/class_file/class-card-web";
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
      <ClassFilter />
      <ClassCard />
      <Footer />;
    </div>
  );
};

export default ForTest;
