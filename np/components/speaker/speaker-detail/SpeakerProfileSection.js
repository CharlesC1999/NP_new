import React from "react";
import styles from "./SpeakerProfileSection.module.scss";

function SpeakerProfileSection({ description, experience, license }) {
  return (
    <div className={styles.profileSection}>
      <h4>關於我</h4>
      <p>{description}</p>
      <h4>經歷</h4>
      <p>{experience}</p>
      <h4>證照</h4>
      <p>{license}</p>
    </div>
  );
}

export default SpeakerProfileSection;
