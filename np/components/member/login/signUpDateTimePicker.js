import React, { useState } from "react";
import DatePicker from "react-datepicker";
import ButtonStyles from "./DateTimePickerButtonStyles.module.css";

function CustomDatePicker() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [pickerView, setPickerView] = useState("range"); // "year", "month", "range"
  const [date, setDate] = useState(new Date()); // 默认显示当前日期，防止输入框为空
  const [isOpen, setIsOpen] = useState(false); // 控制DatePicker的显示

  const handleYearChange = (year) => {
    setDate(year);
    setPickerView("month"); // 切換到月份選擇器
  };

  const handleMonthChange = (month) => {
    setDate(month);
    setPickerView("range"); // 切換到日期區間選擇器
  };

  const handleDateChange = (newDate) => {
    setDate(newDate); // 更新日期
    setIsOpen(false); // 选完日期后自动关闭DatePicker
  };

  let datePickerComponent;
  switch (pickerView) {
    case "year":
      datePickerComponent = (
        <DatePicker
          showYearPicker
          dateFormat="yyyy"
          onChange={handleYearChange}
        />
      );
      break;
    case "month":
      datePickerComponent = (
        <DatePicker
          showMonthYearPicker
          dateFormat="MM"
          onChange={handleMonthChange}
        />
      );
      break;
    case "range":
      datePickerComponent = (
        <DatePicker DatePicker onChange={handleDateChange} />
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
