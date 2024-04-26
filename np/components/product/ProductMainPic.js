import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "@/styles/Product/products.module.scss";

export default function ProductMainPic() {
  const images = [
    "/images/products/Rectangle48.png",
    "/images/products/Rectangle49.png",
    "/images/products/Rectangle48.png",
    "/images/products/Rectangle51.png",
  ];

  // 状态：当前显示的图片索引
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // 处理点击“下一张”的函数
  const handleNext = () => {
    const newIndex = (currentImgIndex + 1) % images.length;
    setCurrentImgIndex(newIndex);
  };

  // 处理点击“上一张”的函数
  const handlePrev = () => {
    const newIndex = (currentImgIndex - 1 + images.length) % images.length;
    setCurrentImgIndex(newIndex);
  };

  // 处理点击缩略图的函数
  const handleSelectImage = (index) => {
    setCurrentImgIndex(index);
  };

  return (
    <>
      <div className={`${style["product-pic"]} d-flex flex-column`}>
        <div className={`${style["p-img"]}`}>
          <img
            className={`${style["object-fit"]}`}
            src={images[currentImgIndex]} // 当前图片来源于 images 数组
          />
        </div>
        <ul
          className={`${style["sliders"]} position-relative d-flex flex-row align-items-center justify-content-between my-3`}
        >
          <li
            className={`${style["prov-pic"]} position-absolute d-flex align-items-center justify-content-center`}
            onClick={handlePrev}
          >
            <svg
              className={`w-6 h-6 text-gray-800 dark:text-white`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m15 19-7-7 7-7"
              />
            </svg>
          </li>
          {images.map((img, index) => (
            <li
              className={`${style["pic-item"]}`}
              key={index}
              onClick={() => handleSelectImage(index)}
            >
              <img
                className={`${style["object-fit"]}`}
                src={img}
                alt={`Thumbnail ${index}`}
              />
            </li>
          ))}
          <li
            className={`${style["next-pic"]} position-absolute d-flex align-items-center justify-content-center`}
            onClick={handleNext}
          >
            <svg
              className={`w-6 h-6 text-gray-800 dark:text-white`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m9 5 7 7-7 7"
              />
            </svg>
          </li>
        </ul>
      </div>
    </>
  );
}
