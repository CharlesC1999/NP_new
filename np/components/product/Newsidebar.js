import React from "react";
import styles from "@/styles/Product/Newsidebar.module.css";
import { useRouter } from "next/router";

function Newsidebar({ id, name, price, img }) {
  const router = useRouter();
  const handleCategoryClick = (cateId) => () => {
    router.push(`/product/productId?id=${cateId}`);
  };
  return (
    <>
      <div
        className={`d-flex ${styles.hotBox}`}
        onClick={handleCategoryClick(id)} // 注意这里传递的是返回的函数
      >
        <div className={styles.hotImg}>
          <img src={`/index-images/p-image/${img}`} alt={name} />
        </div>
        <div className={styles.hotText}>
          <a href="">
            <h6 className={styles.hotTitle}>{name}</h6>
          </a>
          <h6 className={styles.hotPrice}>${price}</h6>
        </div>
      </div>
    </>
  );
}

export default Newsidebar;
