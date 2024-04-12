import React from "react";
import Header from "@/components/header";
import ClassFilter from "@/components/class_file/class-filter";
import ClassCard from "@/components/class_file/class-card-web";
import Footer from "@/components/footer";

const ForTest = () => {
  return (
    <>
      <Header />
      <ClassFilter />
      <ClassCard />
      <Footer />;
    </>
  );
};

export default ForTest;
