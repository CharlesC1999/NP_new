import React from "react";
import ContentSetting from "./ContentSetting.module.css";
import Header from "@/components/header";
import ClassClassifacion from "@/components/class_file/class-classification";
import ClassFilter from "@/components/class_file/class-filter";
import ClassCard from "@/components/class_file/class-card-web";
import ClassCardMobileGrid from "@/components/class_file/class-card-mobile-grid";
import ClassCardMobileList from "@/components/class_file/class-card-mobile-list";
import CardStyle from "./CardStyle.module.css";
import Footer from "@/components/footer";

const ClassList = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  };

  const subContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <Header />
      <img src="/images/bread.png" className={ContentSetting.MobileNone} />
      <div style={subContainerStyle}>
        <ClassClassifacion />
        <div className={ContentSetting.DisplaySetting}>
          <img
            src="/images/class-page-sidebar.png"
            style={{ height: "100%" }}
            className={ContentSetting.MobileNone}
          />
          <div className={CardStyle.SearchResultContainer}>
            <ClassFilter />
            <div className={CardStyle.WebCardContainer}>
              <ClassCard />
              <ClassCard />
              <ClassCard />
              <ClassCard />
              <ClassCard />
              <ClassCard />
            </div>
            <div className={CardStyle.MobileCardContainer}>
              <ClassCardMobileList />
              <ClassCardMobileList />
              <ClassCardMobileList />
              <ClassCardMobileList />
              <ClassCardMobileList />
              <ClassCardMobileList />
            </div>
            <div className={CardStyle.MobileCardContainer}>
              <div className={CardStyle.GridCardSet}>
                <ClassCardMobileGrid />
                <ClassCardMobileGrid />
              </div>
              <div className={CardStyle.GridCardSet}>
                <ClassCardMobileGrid />
                <ClassCardMobileGrid />
              </div>
              <div className={CardStyle.GridCardSet}>
                <ClassCardMobileGrid />
                <ClassCardMobileGrid />
              </div>
            </div>
            <img
              src="/images/paginationList.png"
              className={CardStyle.paginationListMargin}
            />
            <img
              src="/images/pages-m.png"
              className={CardStyle.paginationListMarginMobile}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClassList;
