import React from "react";
import styles from "./Card3Categories.module.css";

function Card3Categories() {
  return(
    <>  
      <a href="" className={styles.card3boxLink }>
        <div className={`${styles['card3box']}`}>
            <div className={`${styles['card3CategoryContent']}`}>
                <img src="/index-images/category-1.png" alt=""/>
                <h6 className={`pt-4`}>乳製品</h6>
            </div>
            
      </div>
      </a>
    </>
  )
}

export default Card3Categories