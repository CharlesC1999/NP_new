import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "@/styles/Product/products.module.scss";

export default function ProductMainPic({ image_urls }) {
  const defaultImage = "/index-images/noResultBG.png";
  const basePath = "/index-images/p-image/"; // 基础路径

  // 填充 images 数组，确保至少有四个元素
  const images = image_urls.map((url) => `${basePath}${url}`); // 为每个 URL 添加路径前缀
  while (images.length < 4) {
    images.push(defaultImage); // 如果不足四张图片，添加默认图片
  }

  // 目前顯示圖片的索引
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // 點擊下一張的函式
  const handleNext = () => {
    const newIndex = (currentImgIndex + 1) % images.length;
    setCurrentImgIndex(newIndex);
  };

  // 點擊上一張的函式
  const handlePrev = () => {
    const newIndex = (currentImgIndex - 1 + images.length) % images.length;
    setCurrentImgIndex(newIndex);
  };

  // 點擊小圖的函式
  const handleSelectImage = (index) => {
    setCurrentImgIndex(index);
  };

  return (
    <>
      <div className={`${style["product-pic"]} d-flex flex-column`}>
        <div className={`${style["p-img"]}`}>
          <img
            src={images[currentImgIndex]}
            className={`${style["object-fit"]}`}
            alt="Product Main"
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
