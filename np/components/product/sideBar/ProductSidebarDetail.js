import React from "react";
import styles from "@/components/product/sideBar/ProductSidebarDetail.module.scss";
import { FaLeaf } from "react-icons/fa";
export default function ProductSidebarDetail({
  productCate,
  handleCategorySelect,
  filteredSubcategories,
  handleKeyDown,
  priceRange,
  rating,
  hoverRating,
  handlePriceChange,
  handleStartRating,
  handleStartHoverRating,
  handleCategoryCheckboxChange,
  resetFilters,
  newCategories,
  categoryCounts,
}) {
  return (
    <div>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5>篩選</h5>
        </div>
        <div className={`${styles.line}`}></div>
        <br />
        <h6 className="mb-3">商品類別</h6>
        {productCate
          .filter((cate) => cate.parentId === null)
          .map((category) => (
            <div
              key={category.cateId}
              className="input-group d-flex flex-row mb-1"
            >
              <input
                type="checkbox"
                id={`category-${category.cateId}`}
                name={`category-${category.cateId}`}
                className="my-2 me-2 checkbox"
                checked={newCategories.includes(category.cateId)}
                onChange={() => {
                  handleCategoryCheckboxChange(category.cateId);
                  handleCategorySelect(category.cateId);
                }}
              />
              <label
                htmlFor={`category-${category.cateId}`}
                className="label-checkbox d-flex flex-row"
              >
                {category.cateName}
                <span>
                  <span className="ms-1">
                    {" "}
                    ({categoryCounts[category.cateName] || 0}){" "}
                  </span>
                </span>
              </label>
            </div>
          ))}

        <h6 className="mt-4">子類別</h6>
        {filteredSubcategories.map((subCategory) => (
          <div
            key={subCategory.cateId}
            className="input-group d-flex flex-row mb-1"
          >
            <input
              type="checkbox"
              id={`sub-category-${subCategory.cateId}`}
              name={`sub-category-${subCategory.cateId}`}
              className="my-2 me-2 checkbox"
              checked={newCategories.includes(subCategory.cateId)}
              onChange={() => {
                handleCategoryCheckboxChange(subCategory.cateId);
                handleCategorySelect(subCategory.cateId);
              }}
            />
            <label
              htmlFor={`sub-category-${subCategory.cateId}`}
              className="label-checkbox"
              style={{ color: "#747E85" }}
            >
              {subCategory.cateName}
              <span></span>
            </label>
          </div>
        ))}

        <h6 className="mt-4 mb-3">價格</h6>
        <div className="input-grounp d-flex flex-row">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => handlePriceChange(e.target.value, "min")}
            className="form-control me-3"
            style={{ width: "80px", height: "25px" }}
          />
          <span className="me-3" style={{ color: "#747E85" }}>
            ~
          </span>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => handlePriceChange(e.target.value, "max")}
            onKeyDown={(e) => handleKeyDown(e, "max")}
            className="form-control"
            style={{ width: "80px", height: "25px" }}
          />
        </div>
        <h6 className="mt-4 mb-3">評分</h6>
        <div className="d-flex flex-row mb-4">
          {Array(5)
            .fill(1)
            .map((v, i) => {
              // 每個按鈕的分數，相當於索引+1
              const score = i + 1;

              return (
                <div
                  key={score}
                  className="d-flex flex-row me-4"
                  onClick={() => handleStartRating(score)}
                  onMouseEnter={() => handleStartHoverRating(score)}
                  onMouseLeave={() => handleStartHoverRating(0)}
                >
                  <FaLeaf
                    className={
                      score <= rating || score <= hoverRating
                        ? styles.faLeafOn
                        : styles.faLeafOff
                    }
                  />
                </div>
              );
            })}
        </div>
        <button
          className={`${styles.clearFilter} btn my-3`}
          onClick={resetFilters}
        >
          清空條件
        </button>
      </div>
    </div>
  );
}
