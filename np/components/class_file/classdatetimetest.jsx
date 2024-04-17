import React from "react";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

class CustomDatePicker extends DatePicker {
  renderCustomHeader(props) {
    return (
      <div>
        {/* 你可以在这里添加额外的按钮或元素 */}
        <button onClick={props.decreaseMonth}>{"<"}</button>
        <button onClick={props.increaseMonth}>{">"}</button>
        <button>{props.date.toString()}</button> {/* 示例按钮 */}
        {/* 确保调用原有的 renderCustomHeader 如果存在 */}
        {super.renderCustomHeader && super.renderCustomHeader(props)}
      </div>
    );
  }
}

export default CustomDatePicker;
