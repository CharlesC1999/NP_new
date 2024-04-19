import React from "react";
import styles from "./favor.module.scss";
import Breadcrumbs from "@/components/Breadcrumbs";
import HeaderComponent from "@/components/Header";
import Footer from "@/components/Footer";
import FavorTabs from "@/components/favor/FavorTabs";
import ClassCard from "@/components/class_file/ClassCardCeb";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Favor() {
  return (
    <>
      <HeaderComponent />
      <Breadcrumbs />
      <div className={`global-container container ${styles.container}`}>
        {/* 會員側邊欄 */}
        <div className="navRight">
          <FavorTabs />
          <div className="cards">
            {/* card-recipe 偉鈞 */}
            {/* card-lecture 宥毓 */}
            <ClassCard />
            <ClassCard />
            {/* card-product 姵云 */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
