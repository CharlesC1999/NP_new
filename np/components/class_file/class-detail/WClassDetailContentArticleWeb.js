import React from "react";
import styles from "./WclassDetailContentArticleWeb.module.css";

const ArticleSetWeb = () => {
  return (
    <div className={styles.imageTextSet}>
      <div className={styles.classIntroImageContainer}>
        <img
          src="/images/class-intro-image.jfif"
          alt
          className={styles.classIntroImage}
        />
      </div>
      <div className={styles.classIntroText}>
        「探索松露的秘密」課程是一場關於這個珍貴食材的深度之旅。首先，我們會帶您深入了解松露的世界，包括不同種類、產地和風味特點。從白松露到黑松露，每種松露都有其獨特的味道和用途，我們將帶您探索它們的起源、生長環境以及如何挑選最佳的松露。透過視頻示範、教材閱讀和專家分享，您將對松露有更深入的認識。
      </div>
    </div>
  );
};

export default ArticleSetWeb;
