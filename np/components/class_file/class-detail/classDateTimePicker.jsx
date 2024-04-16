import React, { useState } from "react";
import DatePicker from "react-datepicker";

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
        />
      );
      break;
    case "month":
      datePickerComponent = (
        <DatePicker
          showMonthYearPicker
          dateFormat="MM/yyyy"
          onChange={handleMonthChange}
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
    <div>
      <div>
        <button onClick={() => setPickerView("year")}>選擇年份</button>
        <button onClick={() => setPickerView("month")}>選擇月份</button>
        <button onClick={() => setPickerView("range")}>選擇日期區間</button>
      </div>
      {datePickerComponent}
    </div>
  );
}

export default CustomDatePicker;
