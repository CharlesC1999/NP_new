import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckBoxStyle from "@/components/checkbox-custom/CheckBoxCustom.module.scss";

export default function Test() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className={CheckBoxStyle["checkbox-wrapper"]}>
        <FaCheck
          style={{ "font-size": "16px" }}
          className={`${CheckBoxStyle["fa-check"]} ${checked ? "d-block" : "d-none"}`}
        />
        <input
          onChange={() => {
            setChecked(!checked);
          }}
          checked={checked}
          type="checkbox"
          className={`${CheckBoxStyle["test"]} ${checked ? CheckBoxStyle.checked : ""}`}
        />
      </div>
    </>
  );
}
