import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./top-bar-grid.module.scss";

export default function TopBar() {
  return (
    <>
      <div
        className={`${styles["top-bar"]} row d-flex d-xxl-none justify-content-between`}
      >
        <div
          className={`col-4 ${styles["btn-sort"]} d-flex align-items-center`}
        >
          <p className={`${styles["sort"]} text-center`}>排序</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M2.25 13.5H6.75V12H2.25V13.5ZM2.25 4.5V6H15.75V4.5H2.25ZM2.25 9.75H11.25V8.25H2.25V9.75Z"
                fill="#8B96A5"
              />
            </svg>
          </div>
        </div>
        <div
          className={`col-5 ${styles["btn-filter"]} d-flex align-items-center`}
        >
          <p className={`${styles["category"]} text-center`}>分類(12)</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M5.25392 4.5H12.7539L8.99642 9.225L5.25392 4.5ZM3.19142 4.2075C4.70642 6.15 7.50392 9.75 7.50392 9.75V14.25C7.50392 14.6625 7.84142 15 8.25392 15H9.75392C10.1664 15 10.5039 14.6625 10.5039 14.25V9.75C10.5039 9.75 13.2939 6.15 14.8089 4.2075C15.1914 3.7125 14.8389 3 14.2164 3H3.78392C3.16142 3 2.80892 3.7125 3.19142 4.2075Z"
              fill="#8B96A5"
            />
          </svg>
        </div>
        <div className={`col-auto ${styles["switch-card-qty"]} d-flex`}>
          <div className={styles["switch-grid"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M9.16667 2.5H2.5V9.16667H9.16667V2.5Z" fill="#50BF8B" />
              <path
                d="M9.16667 10.8333H2.5V17.5H9.16667V10.8333Z"
                fill="#50BF8B"
              />
              <path d="M17.5 2.5H10.8333V9.16667H17.5V2.5Z" fill="#50BF8B" />
              <path
                d="M17.5 10.8333H10.8333V17.5H17.5V10.8333Z"
                fill="#50BF8B"
              />
            </svg>
          </div>
          <div className={styles["switch-row"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M17.5 6.66666H2.5V3.33333H17.5V6.66666ZM17.5 8.33333H2.5V11.6667H17.5V8.33333ZM17.5 13.3333H2.5V16.6667H17.5V13.3333Z"
                fill="#50BF8B"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
