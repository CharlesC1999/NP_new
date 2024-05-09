import { useState, useEffect } from "react";
import styles from "./HeroSlider.module.css";

const HeroSlider = () => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(null);

  const sliders = ["1.png", "2.png","3.png","4.png","6.png"];
  const slideCount = sliders.length;

  useEffect(() => {
    const slideWidth = document.getElementById("Hero").offsetWidth;
    const slideImage = document.getElementById("slideImage");
    const pages = document.getElementById("pages");

    slideImage.style.width = `${slideCount * slideWidth}px`;

    const handleSlideGo = () => {
      const slideMove = `-${slideWidth * slideIndex}px`;
      slideImage.style.left = slideMove;
      Array.from(pages.children).forEach((page, index) => {
        if (index === slideIndex) {
          page.classList.add("current");
        } else {
          page.classList.remove("current");
        }
      });
    };

    const handleGoNextSlide = () => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slideCount);
    };

    // const handleSliderHover = () => {
    //   if (autoSlide) {
    //     clearInterval(autoSlide);
    //   }
    // };

    // const handleSliderLeave = () => {
    //   setAutoSlide(setInterval(handleGoNextSlide, 3000));
    // };

    handleSlideGo();

    setAutoSlide(setInterval(handleGoNextSlide, 8000));

    window.addEventListener("resize", handleSlideGo);
    return () => {
      clearInterval(autoSlide);
      window.removeEventListener("resize", handleSlideGo);
    };
  }, [slideIndex]);

  return (
<div className={styles.Hero} id="Hero">
      <div className={`${styles.slider} position-relative`} id="slider">
        <ul className={`list-unstyled position-absolute ${styles.slideImage} d-flex`} id="slideImage">
          {sliders.map((slider, index) => (
            <li key={index}>
              <img src={`/index-images/${slider}`} alt="" />
            </li>
          ))}
        </ul>
        <ul className={`list-unstyled ${styles.pages} position-absolute d-flex justify-content-center w-100`} id="pages">
          {Array.from({ length: slideCount }, (_, index) => (
            <li key={index} onClick={() => setSlideIndex(index)} className={slideIndex === index ? `${styles.current}` : ""}></li>
          ))}
        </ul>
        <a className={`${styles.slideBtnLeft} ${styles.slideBtn} position-absolute slide-prev`} role="button"  id="slidePrev" onClick={() => setSlideIndex((prevIndex) => (prevIndex === 0 ? slideCount - 1 : prevIndex - 1))}>
          <i className="fa-solid fa-chevron-left"></i>
        </a>
        <a className={`${styles.slideBtnRight} ${styles.slideBtn} position-absolute slide-next`} role="button"  id="slideNext" onClick={() => setSlideIndex((prevIndex) => (prevIndex + 1) % slideCount)}>
          <i className="fa-solid fa-chevron-right"></i>
        </a>
      </div>
    </div>
  );
};

export default HeroSlider;
