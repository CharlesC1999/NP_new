import React from "react";
import styles from "@/components/product/sideBar/ProductSidebarDetail.module.scss";

export default function ProductSidebarDetail() {
  return (
    <div>
      <div className={`${styles.sideBarBox}`}>
        <div className={`${styles.sideTitle}`}>
          <h5>篩選</h5>
        </div>
        <div className={`${styles.line}`}></div>
        <br />
        <h6>商品類別</h6>
        <div
          style={{ color: "#747E85" }}
          className="input-grounp d-flex flex-row mb-1"
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" className={`label-checkbox d-flex flex-row`}>
            新鮮蔬菜<span>(amount)</span>
          </label>
        </div>
        <div
          style={{ color: "#747E85" }}
          className="input-grounp d-flex flex-row mb-1"
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            海鮮類<span>(amount)</span>
          </label>
        </div>
        <div
          style={{ color: "#747E85" }}
          className="input-grounp d-flex flex-row mb-1"
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            調味料<span>(amount)</span>
          </label>
        </div>
        <div
          style={{ color: "#747E85" }}
          className="input-grounp d-flex flex-row mb-1"
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label htmlfor="veggies" class="label-checkbox">
            乳製品<span>(amount)</span>
          </label>
        </div>
        <div
          style={{ color: "#747E85" }}
          className="input-grounp d-flex flex-row mb-1"
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            肉類<span>(amount)</span>
          </label>
        </div>
        <div
          style={{ color: "#747E85" }}
          className="input-grounp d-flex flex-row mb-1"
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            水果<span>(amount)</span>
          </label>
        </div>
        <h6 className="mt-4">子類別</h6>
        <div
          className="input-grounp d-flex flex-row mb-1"
          style={{ color: "#747E85" }}
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label
            for="veggies"
            class="label-checkbox"
            style={{ color: "#747E85" }}
          >
            肌肉<span>(amount)</span>
          </label>
        </div>
        <div
          className="input-grounp d-flex flex-row mb-1"
          style={{ color: "#747E85" }}
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            豬肉<span>(amount)</span>
          </label>
        </div>
        <div
          style={{ color: "#747E85" }}
          className="input-grounp d-flex flex-row mb-1"
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            牛肉<span>(amount)</span>
          </label>
        </div>
        <div
          style={{ color: "#747E85" }}
          className="input-grounp d-flex flex-row mb-1"
        >
          <label htmlFor="veggies" className={`label-checkbox d-flex flex-row`}>
            <input
              type="checkbox"
              id="veggies"
              name="veggies"
              className={`me-2 checkbox`}
            />
            魚肉<span>(amount)</span>
          </label>
        </div>
        <div
          style={{ color: "#747E85" }}
          className="input-grounp d-flex flex-row mb-1"
        >
          <input
            type="checkbox"
            id="veggies"
            name="veggies"
            className={`me-2 checkbox`}
          />
          <label for="veggies" class="label-checkbox">
            羊肉<span>(amount)</span>
          </label>
        </div>
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
