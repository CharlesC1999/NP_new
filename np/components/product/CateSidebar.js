import React from "react";
import styles from "@/components/product/sideBar/CateSidebar.module.css";
import Link from "next/link";
Link;
import { useRouter } from "next/router";
import { useProductCategories } from "@/hooks/use-product-cate";

function CateSidebar({ cateName, catePng, cateId, categoryCounts }) {
  const router = useRouter();
  const { newCategories, setNewCategories } = useProductCategories();
  const handleNewCategoryChange = (cateId) => {
    setNewCategories([cateId]); // 假设这是添加分类的逻辑
    router.push("/product");
  };
  console.log(newCategories);

  return (
    <>
      <div
        key={cateId}
        onClick={() => handleNewCategoryChange(cateId)}
        className={`d-flex justify-content-start align-items-center mt-3 ${styles.sideBox}`}
      >
        <div className={`d-flex justify-content-center align-items-center`}>
          <div className={styles.sideImg}>
            <div className="mx-1 mt-1">
              <img src={`/index-images/${catePng}`} alt />
            </div>
          </div>
          <div className={styles.sideText}>
            <div>
              <h6 className={styles.left}>{cateName}</h6>
            </div>
            {/* <h6 className={styles.right}> {categoryCounts[cateName] || 0}</h6> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default CateSidebar;
