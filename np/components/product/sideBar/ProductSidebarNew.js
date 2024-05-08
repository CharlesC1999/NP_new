import React from "react";
import Newsidebar from "@/components/product/Newsidebar";
import styles from "@/components/product/sideBar/SideBarCategory.module.css";
import { useRouter } from "next/router";

export default function ProductSidebarNew({ mayLikeProducts }) {
  // const router = useRouter();
  // const handleCategoryClick = (cateId) => {
  //   router.push(`/product/${cateId}`);
  // };

  return (
    <>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5>您可能喜歡</h5>
        </div>
        <div className={`${styles.line}`}></div>
        {mayLikeProducts.map((v) => {
          console.log("Product ID:", v.id);
          return (
            <Newsidebar
              id={v.id}
              name={v.product_name}
              price={v.product_price}
              img={v.image_url}
            />
          );
        })}
      </div>
    </>
  );
}
