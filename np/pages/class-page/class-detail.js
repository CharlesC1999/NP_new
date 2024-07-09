import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // 路由
import DetailStyles from "@/styles/class_styles/classDetail.module.css";
import HeaderSetting from "@/styles/headerSetting.module.scss";
import Header from "@/components/header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClassSidebar from "@/components/class_file/ClassSidebarDetailVersion";
import ClassDetail from "@/components/class_file/class-detail/ClassDetailContent";
import Footer from "@/components/footer";
import { useParams } from "react-router-dom";

const ClassDetailPage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  };

  // 課程資料庫data
  const router = useRouter();
  const class__i_d = router.query.class__i_d;
  // const { class__i_d } = useParams();
  const [classDetail, setClassDetail] = useState({});
  const [relatedData, setRelatedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Router ready:", router.isReady);

    // const searchParams = new URLSearchParams(params);
    // const url = `http://localhost:3005/api/classes/?${searchParams.toString()}`;
    if (router.isReady) {
      const { class__i_d } = router.query;
      console.log("Class ID:", class__i_d);
      if (class__i_d) {
        console.log(class__i_d);
        fetch(`http://localhost:3005/api/classes/full/${class__i_d}`)
          .then((response) => {
            console.log("Fetch response:", response);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Fetched data:", data, "row data here");
            if (data && data.status === "success1" && data.data) {
              setClassDetail(data.data.classAllDetail[0]);
              console.log(data.data.classAllDetail, classDetail, "classD");
            } else {
              console.error("Data format incorrect or missing data:", data);
              throw new Error("Data format incorrect or missing data");
            }
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Failed to fetch class details:", err);
            setError(err.message);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  }, [router.isReady, router.query.class__i_d]);

  console.log(classDetail, "here");
  return (
    <div style={containerStyle} className={HeaderSetting.mobileAdjust}>
      <div className={HeaderSetting.headerSetting}>
        <Header />
      </div>
      <Breadcrumbs />
      <div className={DetailStyles.dF}>
        <div className={DetailStyles.dFC}>
          <ClassSidebar />
        </div>
        <ClassDetail
          classData={{
            classDetail,
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ClassDetailPage;
