import React from "react";
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

  const dF = {
    display: "flex",
    justifyContent: "center",
    gap: "91px",
    marginTop: "30px",
    marginBottom: "50px",
  };

  const dFC = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={containerStyle}>
      <Header />
      <img src="/images/bread.png" />
      <div style={dF}>
        <div style={dFC}>
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
