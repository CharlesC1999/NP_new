import React from "react";

export default function Unsaved() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
        className="h-100 pointer"
      >
        <path
          d="M17.1554 2.07986C15.1219 0.394444 12.0976 0.697603 10.2311 2.57069L9.50008 3.30333L8.76906 2.57069C6.90624 0.697603 3.87823 0.394444 1.84472 2.07986C-0.485659 4.01431 -0.608115 7.4862 1.47735 9.58305L8.65773 16.7939C9.12158 17.2595 9.87487 17.2595 10.3387 16.7939L17.5191 9.58305C19.6083 7.4862 19.4858 4.01431 17.1554 2.07986Z"
          fill="#D9D9D9"
        />
      </svg>
      <style jsx>
        {`
          .pointer {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
