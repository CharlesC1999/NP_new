import { useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard02";
//styles
import style from "@/styles/Product/products.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
export default function ProductMayLike() {
  return (
    <>
      <div className={`${style["mlike"]} d-flex flex-column my-4`}>
        <h5 className={`${style["h5"]} py-sm-4 mt-5 mt-sm-none`}>你可能喜歡</h5>
        <div className={`${style["line"]} d-sm-flex d-none`} />
        <ul
          className={`${style["product-list"]} d-flex flex-sm-row flex-wrap justify-content-between p-0`}
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard className={`${style["product-list"]}`} />
        </ul>
      </div>
    </>
  );
}
