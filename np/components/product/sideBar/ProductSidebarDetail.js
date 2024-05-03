import React from "react";
import styles from "@/components/product/sideBar/ProductSidebarDetail.module.scss";

export default function ProductSidebarDetail({
  productCate,
  selectedCategory,
  handleCategorySelect,
  filteredSubcategories,
}) {
  // const filteredSubcategories = productCate.filter(
  //   (cate) => cate.parentId === selectedCategory
  // );
  console.log(productCate);
  return (
    <div>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5>篩選</h5>
        </div>
        <div className={`${styles.line}`}></div>
        <br />
        <h6>商品類別</h6>

        {productCate
          .filter((cate) => cate.parentId === null)
          .map((category) => (
            <div
              key={category.cateId}
              className="input-group d-flex flex-row mb-1"
              onClick={() => handleCategorySelect(category.cateId)}
            >
              <input
                type="checkbox"
                id={`category-${category.cateId}`}
                name={`category-${category.cateId}`}
                className="me-2 checkbox"
              />
              <label
                htmlFor={`category-${category.cateId}`}
                className="label-checkbox d-flex flex-row"
              >
                {category.cateName}
                <span>(amount)</span>
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
              className="me-2 checkbox"
            />
            <label
              htmlFor={`sub-category-${subCategory.cateId}`}
              className="label-checkbox"
              style={{ color: "#747E85" }}
            >
              {subCategory.cateName}
              <span>(amount)</span>
            </label>
          </div>
        ))}

        <h6 className="mt-4 mb-3">價格</h6>
        <div className="input-grounp d-flex flex-row">
          <input
            type="number"
            name=""
            id=""
            className="form-control me-3"
            style={{ width: "70px", height: "25px" }}
          />
          <span className="me-3" style={{ color: "#747E85" }}>
            ~
          </span>
          <input
            type="number"
            name=""
            id=""
            className="form-control"
            style={{ width: "70px", height: "25px" }}
          />
        </div>
        <h6 className="mt-4 mb-3">評分</h6>
        <div
          className="input-grounp d-flex flex-row mb-1"
          style={{ color: "#FFD783" }}
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </label>
        </div>
        <div
          className="input-grounp d-flex flex-row mb-1"
          style={{ color: "#FFD783" }}
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            &#9733;&#9733;&#9733;&#9733;
          </label>
        </div>
        <div
          className="input-grounp d-flex flex-row mb-1"
          style={{ color: "#FFD783" }}
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            &#9733;&#9733;&#9733;
          </label>
        </div>
        <div
          className="input-grounp d-flex flex-row mb-1"
          style={{ color: "#FFD783" }}
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            &#9733;&#9733;
          </label>
        </div>
        <div
          className="input-grounp d-flex flex-row mb-1"
          style={{ color: "#FFD783" }}
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            &#9733;
          </label>
        </div>
      </div>
    </div>
  );
}
