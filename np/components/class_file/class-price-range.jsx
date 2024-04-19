import React, { useState } from "react";
import PriceRangeStyle from "@/styles/class_styles/priceRangeStyle.module.css";

const RangeSlider = ({ min, max, onRangeChange }) => {
  const rangeBoxSet = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "spaceBetween",
  };

  const rangeSetContainer = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "minValue") {
      if (value >= min && value <= maxValue) {
        setMinValue(Number(value));
        onRangeChange({ min: Number(value), max: maxValue });
      }
    } else if (name === "maxValue") {
      if (value <= max && value >= minValue) {
        setMaxValue(Number(value));
        onRangeChange({ min: minValue, max: Number(value) });
      }
    }
  };

  //   const handleSliderChange = (e) => {
  //     const [min, max] = e.target.value.split(",").map(Number);
  //     setMinValue(min);
  //     setMaxValue(max);
  //     onRangeChange({ min, max });
  //   };

  return (
    <div style={rangeSetContainer}>
      <div style={rangeBoxSet}>
        <input
          className={PriceRangeStyle.priceBox}
          type="number"
          name="minValue"
          value={minValue}
          min={min}
          max={maxValue}
          onChange={handleInputChange}
        />
        <div className={PriceRangeStyle.to}>-</div>
        <input
          className={PriceRangeStyle.priceBox}
          type="number"
          name="maxValue"
          value={maxValue}
          min={minValue}
          max={max}
          onChange={handleInputChange}
        />
      </div>
      <button className={PriceRangeStyle.summitButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23px"
          height="23px"
          viewBox="0 0 512 512"
          className={PriceRangeStyle.settingBotton}
        >
          <path
            fill="#78CEA6"
            d="m505.04 442.66l-99.71-99.69c-4.5-4.5-10.6-7-17-7h-16.3c27.6-35.3 44-79.69 44-127.99C416.03 93.09 322.92 0 208.02 0S0 93.09 0 207.98s93.11 207.98 208.02 207.98c48.3 0 92.71-16.4 128.01-44v16.3c0 6.4 2.5 12.5 7 17l99.71 99.69c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.59.1-33.99m-297.02-90.7c-79.54 0-144-64.34-144-143.98c0-79.53 64.35-143.98 144-143.98c79.54 0 144 64.34 144 143.98c0 79.53-64.35 143.98-144 143.98m27.11-152.54l-45.01-13.5c-5.16-1.55-8.77-6.78-8.77-12.73c0-7.27 5.3-13.19 11.8-13.19h28.11c4.56 0 8.96 1.29 12.82 3.72c3.24 2.03 7.36 1.91 10.13-.73l11.75-11.21c3.53-3.37 3.33-9.21-.57-12.14c-9.1-6.83-20.08-10.77-31.37-11.35V112c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v16.12c-23.63.63-42.68 20.55-42.68 45.07c0 19.97 12.99 37.81 31.58 43.39l45.01 13.5c5.16 1.55 8.77 6.78 8.77 12.73c0 7.27-5.3 13.19-11.8 13.19h-28.1c-4.56 0-8.96-1.29-12.82-3.72c-3.24-2.03-7.36-1.91-10.13.73l-11.75 11.21c-3.53 3.37-3.33 9.21.57 12.14c9.1 6.83 20.08 10.77 31.37 11.35V304c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-16.12c23.63-.63 42.68-20.54 42.68-45.07c0-19.97-12.99-37.81-31.59-43.39"
          />
        </svg>
      </button>
      {/* <input
        type="range"
        min={min}
        max={max}
        value={`${minValue},${maxValue}`}
        onChange={handleSliderChange}
        multiple
      /> */}
    </div>
  );
};

export default function PriceRangeSelector() {
  const handleRangeChange = (range) => {
    console.log(range);
  };

  return <RangeSlider min={0} max={9999} onRangeChange={handleRangeChange} />;
}