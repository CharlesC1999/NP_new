import React from "react";

export default function SavedHeart() {
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
          d="M17.1554 2.07993C15.1219 0.394509 12.0976 0.697668 10.2311 2.57076L9.50008 3.30339L8.76906 2.57076C6.90624 0.697668 3.87823 0.394509 1.84472 2.07993C-0.485659 4.01437 -0.608115 7.48626 1.47735 9.58311L8.65773 16.794C9.12158 17.2595 9.87487 17.2595 10.3387 16.794L17.5191 9.58311C19.6083 7.48626 19.4858 4.01437 17.1554 2.07993Z"
          fill="#B33022"
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
