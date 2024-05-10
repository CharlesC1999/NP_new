import React, { useState, useEffect } from "react";
import styles from "./ClassCardWeb.module.css";
import toast, { Toaster } from "react-hot-toast";
import Router, { useRouter } from "next/router";
import FavIconClass from "../favor/FavIconClass";

// 設置路由、鉤子
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/use-cart";
// sweetalert2
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function ClassCard({ classesData }) {
  console.log(classesData, "classDW");
  // 初始化每個課程的愛心狀態為 false
  const [heartActive, setHeartActive] = useState(false);

  const notify = (isActive) => {
    if (isActive) {
      toast("成功加入收藏");
    } else {
      toast("成功移除收藏");
    }
  };

  const toggleHeart = () => {
    const newHeartActive = !heartActive;
    setHeartActive(newHeartActive);
    notify(newHeartActive);
  };

  const goClassDetail = (class__i_d) => {
    // 方法一
    // Router.push(`/class-page/class-detail/${class__i_d}`);
    // 方法二
    Router.push({
      pathname: "/class-page/class-detail",
      query: { class__i_d: class__i_d },
    });
  };

  // swlert2
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img
          src={`/images/class-images/${classesData.image__u_r_l}`}
          alt="class-pic-sort-0"
          className={styles.classImg}
        />
      </div>
      <div className={styles.truffledRiceContainer}>
        <header className={styles.truffledRiceHeader}>
          <p className={styles.truffledRiceTitle}>{classesData.class_name}</p>
          {/* <svg
            className={`${styles.heartIcon} ${
              heartActive ? styles.active : ""
            }`}
            onClick={toggleHeart}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="27"
            height="24"
          >
            {
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            }
          </svg> */}
          <FavIconClass id={classesData.class__i_d} />
        </header>
        <div className={styles.truffledRiceDetails}>
          <p className={styles.truffledRiceDescription}>
            {classesData.class_description}
          </p>
          <div className={styles.truffledRicePricing}>
            <p className={styles.truffledRicePrice}>{classesData.c_price}</p>
            {/* 目前沒有折價的價錢 */}
            <p className={styles.truffledRiceOriginalPrice}>
              {classesData.c_price}
            </p>
          </div>
        </div>
        <div className={styles.truffledRiceMeta}>
          <div className={styles.classInfromations}>
            <div className={styles.classSubInformation}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 24 24"
                className={styles.infromationIcons}
              >
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="#747e85"
                    d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1"
                  />
                </g>
              </svg>
              <span className={styles.classSubInformationText}>
                {classesData.class_date}
              </span>
            </div>
            <div className={styles.classSubInformation}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 24 24"
                className={styles.infromationIcons}
              >
                <path
                  fill="#747e85"
                  d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                />
              </svg>
              <span className={styles.classSubInformationText}>
                {classesData.speaker_name}
              </span>
            </div>
          </div>
          <div className={styles.truffledRiceActions}>
            <a
              className={styles.linksButtons}
              onMouseDown={() => goClassDetail(classesData.class__i_d)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                className={styles.linkButtonsIcon}
              >
                <path
                  fill="white"
                  d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
                />
              </svg>
              <span className={styles.linkButtonText}>了解更多</span>
            </a>
            <a className={styles.linksButtons} href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                className={styles.linksButtonsIcon}
              >
                <path
                  fill="white"
                  d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"
                />
              </svg>
              <span className={styles.linkButtonText}>立刻報名</span>
            </a>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
