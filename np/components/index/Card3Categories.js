import React from "react";
import styles from "./Card3Categories.module.css";

function Card3Categories() {
  return(
    <>  
        <div className={`${styles['card3box']}`}>
            <div className={`${styles['card3boxImg']}`}>
                <a href=""><img src="/index-images/category-1.png" alt=""/></a>
                <a href="">
                    <h6 className={`pt-4`}>乳製品</h6>
                </a>
            </div>
        </div>
    </>
  )
}

export default Card3Categories