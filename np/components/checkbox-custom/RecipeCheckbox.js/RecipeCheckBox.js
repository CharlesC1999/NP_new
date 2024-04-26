import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./RecipeCheckBox.module.scss";

export default function Test() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className={styles["checkbox-wrapper"]}>
        <FaCheck
          style={{ "font-size": "16px" }}
          className={`${styles["fa-check"]} ${checked ? "d-block" : "d-none"}`}
        />
        <input
          onChange={() => {
            setChecked(!checked);
          }}
          checked={checked}
          type="checkbox"
          className={`${styles["test"]} ${checked ? styles.checked : ""}`}
        />
      </div>
    </>
  );
}
