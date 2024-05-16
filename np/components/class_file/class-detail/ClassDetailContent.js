import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./classDetailContent.module.css";
import MArticle from "./MClassDetailContentArticleWeb";
import WArticle from "./WClassDetailContentArticleWeb";
import toast, { Toaster } from "react-hot-toast";
import FavIconClass from "@/components/favor/FavIconClass";

// 加入購物車的鉤子
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/contexts/AuthContext";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const ClassDetail = ({ classData }) => {
  // 用來管理哪個標籤頁是激活的狀態
  const [activeTab, setActiveTab] = useState("info");
  const [classImageTable, setClassImageTable] = useState([]);
  const router = useRouter();

  console.log(classData.classDetail, "there");
  classData = classData.classDetail;

  // 加入購物車
  const { addItem } = useCart();
  const { auth } = useAuth();
  const MySwal = withReactContent(Swal);

  const notify2 = (productName) => {
    MySwal.fire({
      title: "成功加入",
      text: productName + "已成功加入購物車!",
      icon: "success",
    });
  };
  //

  // 加入購物車中使用的變數
  const id = classData.class__i_d;
  const className = classData.class_name;
  const classDate = classData.class_date;
  const price = classData.c_price;
  const image = classData.image__u_r_l;
  console.log("Class Name:", className);
  console.log("Class Date:", classDate);
  console.log("class img", image);

  // console.log(classData.speaker_id, "gos");
  const goSpeakerD = () => {
    router.push(`/speaker/speaker-detail?sid=${classData.speaker_id}`);
  };

  useEffect(() => {
    const fetchClassImagesData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/class-image-contents/full/${classData.class__i_d}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json(); // 解析JSON數據
        console.log("Class Images:", data.data);
        setClassImageTable(data.data); // 更新狀態以存儲數據
      } catch (error) {
        console.error("Failed to fetch class images:", error);
      }
    };

    fetchClassImagesData();
  }, [classData.class__i_d]); // 依賴於 class__i_d，以確保在 class__i_d 變化時重新執行

  console.log(classImageTable);

  const notify = (isActive) => {
    if (isActive) {
      toast("成功加入收藏");
    } else {
      toast("成功移除收藏");
    }
  };

  return (
    <div className={styles.articleContainer}>
      <section className={styles.classDetailAndLinks}>
        <div className={styles.classImageContainer}>
          <img
            src={`/images/class-images/${classData.image__u_r_l}`}
            alt
            className={styles.classImg}
          />
        </div>
        <div className={styles.classInformations}>
          <p className={styles.className}>{classData.class_name}</p>
          <div className={styles.classMobileSelectGroup}>
            <button
              className={
                activeTab === "info"
                  ? styles.classMobileSelectActive
                  : styles.classMobileSelect
              }
              onClick={() => setActiveTab("info")}
            >
              課程資訊
            </button>
            <button
              className={
                activeTab === "goods"
                  ? styles.classMobileSelectActive
                  : styles.classMobileSelect
              }
              onClick={() => setActiveTab("goods")}
            >
              成品介紹
            </button>
          </div>
          {activeTab === "info" && (
            <div
              className={styles.classInformationContainer}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className={styles.classInfor}>
                <div className={styles.inforTitle}>上課時間：</div>
                <div className={styles.inforDetail}>{classData.class_date}</div>
              </div>
              <div className={styles.classInfor}>
                <div className={styles.inforTitle}>課程價格：</div>
                <div className={styles.inforDetail}>${classData.c_price}</div>
              </div>
              <div className={styles.classInfor}>
                <div className={styles.inforTitle}>優惠活動：</div>
                <div className={styles.inforDetail}>無</div>
              </div>
              <div className={styles.classInfor}>
                <div className={styles.inforTitle}>優惠券：</div>
                <div className={styles.inforDetail}>無</div>
              </div>
              <div className={styles.classInfor}>
                <div className={styles.inforTitle}>報名人數：</div>
                <div className={styles.inforDetail}>
                  {classData.current_person} / {classData.class_person_limit}
                </div>
              </div>
            </div>
          )}
          {activeTab === "goods" && (
            <div
              className="class-images-and-contents-mobile"
              style={{ display: "block" }}
            >
              {classImageTable.map((image, index) => (
                <MArticle key={index} image={image} />
              ))}

              {/* basically, it only need one set */}
            </div>
          )}
          <div className={styles.classLinksContainer}>
            <a
              className={styles.linkBtn}
              href="#"
              onClick={() => {
                if (!auth.isLoggedIn) {
                  return toast.error("請先登入再使用!");
                }
                notify2(className);

                console.log("Adding product:", {
                  id,
                  className,
                  classDate,
                  price,
                  image,
                });

                addItem({ id, className, classDate, price, image });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"
                />
              </svg>
              <p className={styles.linkText}>立刻報名</p>
            </a>
            <FavIconClass id={classData.class__i_d} />
          </div>
        </div>
      </section>
      <section className={styles.speakerIntroAndLink}>
        <img
          src={`/speaker-image/${classData.speaker_image}`}
          alt
          className={styles.speakerImage}
        />
        <div className={styles.speakerInfor}>
          <div className={styles.speakerNameSet}>
            <p className={styles.speakerName}>{classData.speaker_name}</p>
            <p className={styles.speakerSubName}>{classData.speaker_title}</p>
          </div>
          <div className={styles.speakerBackgroundInfor}>
            {classData.speaker_description}
          </div>
          <div className={styles.speakerLinkContainer}>
            <a onClick={goSpeakerD} className={styles.speakerDetailLink}>
              <span className={styles.speakerLinkBtn}>了解更多</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                className={styles.speakerLinkIcon}
              >
                <path
                  fill="#50bf8b"
                  fillRule="evenodd"
                  d="M1.25 8A.75.75 0 0 1 2 7.25h10.19L9.47 4.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H2A.75.75 0 0 1 1.25 8"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section className={styles.classImagesAndContents}>
        {classImageTable.map((image, index) => (
          <WArticle key={index} image={image} />
        ))}

        {/* basically, it only need one set */}
      </section>
    </div>
  );
};

export default ClassDetail;
