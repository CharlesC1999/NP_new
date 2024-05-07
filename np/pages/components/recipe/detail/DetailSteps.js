import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./DetailSteps.module.scss";

export default function DetailSteps() {
  return (
    <>
      <div
        className={`row ${styles["steps-section"]} d-flex flex-column align-items-center`}
      >
        <div
          className={`col-12 ${styles["figma-h4"]} ${styles["step-title-m"]} text-center text-xxl-start`}
        >
          步驟
        </div>
        <ol
          className={`${styles["steps"]} col-11 col-xxl-10 d-flex flex-column`}
        >
          <li>
            準備一湯鍋加水約八分滿大火燒開放入排骨、米酒、味淋以及薑、蒜末，持續大火熬煮並撈除浮沫，再加入淘洗好的米，撒入胡椒粉。
          </li>
          <li>
            持續煮15-20分見米粒煮透後加入芹菜珠並以鹽巴調味後關火蓋上鍋蓋悶5-10分鐘即可上桌。
          </li>
          <li>
            蒸煮熟透的馬鈴薯壓成泥跟豆腐泥混在一起，打入一顆雞蛋用攪拌機一邊攪拌分多次加入麵粉，攪拌到出筋不黏手
          </li>
          <li>將麵團搓成條狀，每次捏下一小團約湯圓大小搓成球狀麵疙瘩</li>
          <li>煮一鍋水，水滾後將麵疙瘩倒進去，麵疙瘩浮起即可撈出</li>
          <li>
            洋蔥丁炒軟後倒入水煮蕃茄罐，Tabasco
            辣醬、黑胡椒等辛香料調好味，再將煮好的麵疙瘩放進來，悶煮2-5分鐘後即可裝盤上桌享用
          </li>
        </ol>
      </div>
    </>
  );
}
