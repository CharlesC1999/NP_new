import React, { useState } from "react";
import DatePicker from "react-datepicker";
import ButtonStyles from "@/styles/class_styles/DateTimePickerButtonStyles.module.css";

function CustomDatePicker() {
  const [date, setDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [pickerView, setPickerView] = useState("year"); // "year", "month", "range"

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
  };

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
            <sapn className={ButtonStyles.buttonTextStyle}>Year</sapn>
          </button>
          <button
            onClick={() => setPickerView("month")}
            className={ButtonStyles.buttonStyle}
          >
            <sapn className={ButtonStyles.buttonTextStyle}>Month</sapn>
          </button>
        </div>
      </div>

      {datePickerComponent}
    </div>
  );
}

export default CustomDatePicker;
