import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ButtonStyles from "./DateTimePickerButtonStyles.module.css";

function CustomDatePicker({ getStartDate, getEndDate }) {
  const [date, setDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [pickerView, setPickerView] = useState("range"); // "year", "month", "range"

  const handleYearChange = (year) => {
    setDate(year);
    setPickerView("month"); // 切換到月份選擇器
  };

  const handleMonthChange = (month) => {
    setDate(month);
    setPickerView("range"); // 切換到日期區間選擇器
  };

  const handleDateRangeChange = (update) => {
    setDateRange(update);
    if (update[0]) getStartDate(update[0]);
    if (update[1]) getEndDate(update[1]);
  };

  // console.log(dateRange);
  const dateValues = Object.values(dateRange);
  console.log(dateValues[0]);
  console.log(dateValues[1]);
  // getStartDate = dateValues[0];
  // getEndDate = dateValues[1];
  // console.log(getStartDate);
  // console.log(getEndDate);
  // console.log(getDateRange);

  let datePickerComponent;
  switch (pickerView) {
    case "year":
      datePickerComponent = (
        <DatePicker
          showYearPicker
          dateFormat="yyyy"
          onChange={handleYearChange}
          inline
        />
      );
      break;
    case "month":
      datePickerComponent = (
        <DatePicker
          showMonthYearPicker
          dateFormat="MM"
          onChange={handleMonthChange}
          inline
        />
      );
      break;
    case "range":
      datePickerComponent = (
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateRangeChange}
          inline
        />
      );
      break;
    default:
      datePickerComponent = null;
  }

  return (
    <div className={ButtonStyles.DisplayStyleRelative}>
      <div className={ButtonStyles.DisplayStyle}>
        <div className={ButtonStyles.buttonSet}>
          <button
            onClick={() => setPickerView("year")}
            className={ButtonStyles.buttonStyle}
          >
            <span className={ButtonStyles.buttonTextStyle}>Year</span>
          </button>
          <button
            onClick={() => setPickerView("month")}
            className={ButtonStyles.buttonStyle}
          >
            <span className={ButtonStyles.buttonTextStyle}>Month</span>
          </button>
        </div>
      </div>

      {datePickerComponent}
    </div>
  );
}

export default CustomDatePicker;
