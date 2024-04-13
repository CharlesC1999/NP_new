import React, { useState } from "react";
import styles from "./classClassification.module.css";

const cuisines = [
  "台式料理",
  "中式料理",
  "西式料理",
  "異國料理",
  "健康養生 / 素食",
  "烘焙 / 點心",
];

const ClassClassifacion = () => {
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleLeftArrowClick = () => {
    if (visibleStartIndex > 0) {
      setVisibleStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleRightArrowClick = () => {
    if (visibleStartIndex < cuisines.length - 4) {
      setVisibleStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleCuisineClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className={styles.chineseCuisineContainer}>
      <button
        className={styles.cuisineArrowButton}
        onClick={handleLeftArrowClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40px"
          height="40px"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#50bf8b"
            d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0"
          />
        </svg>
      </button>
      <div className={styles.cuisineButtonsContainer}>
        {cuisines.map((cuisine, index) => (
          <button
            key={index}
            className={`${styles.cuisineButton} ${
              index === activeIndex
                ? styles.activeCuisine
                : styles.inactiveCuisine
            }`}
            style={{
              display:
                index >= visibleStartIndex && index < visibleStartIndex + 4
                  ? ""
                  : "none",
            }}
            onClick={() => handleCuisineClick(index)}
          >
            {cuisine}
          </button>
        ))}
      </div>
      <button
        className={styles.cuisineArrowButton}
        onClick={handleRightArrowClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40px"
          height="40px"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#50bf8b"
            d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0"
          />
        </svg>
      </button>
    </section>
  );
};

export default ClassClassifacion;
