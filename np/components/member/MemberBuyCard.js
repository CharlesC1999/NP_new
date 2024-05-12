import exp from "constants";
import React from "react";
import styles from "@/components/member/MemberBuyCard.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa";
import Swal from "sweetalert2";

export default function MemberBuyCard({ activeCategory, searchTerm }) {
  const [userid, setUserid] = useState(null);

  const [productId, setProductId] = useState(0);
  //葉子評分
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const handleStartRating = (rating) => {
    setRating(rating);
  };
  const handleStartHoverRating = (hover) => {
    setHoverRating(hover);
  };
  const handleResetRating = () => {
    setRating(0);
  };

  const [orders, setOrders] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [activeProductId, setActiveProductId] = useState(0);
  const handleShowReview = (productId) => {
    setActiveProductId(productId);
    setShowReview(true);
  };

  const handleCloseReview = () => {
    console.log("Clearing active product ID"); // 输出清除操作
    setActiveProductId(0);
    setShowReview(false);
  };

  const date = new Date().toISOString(); // '2024-05-10T08:21:03.530Z'
  const formattedDate = date.replace("T", " ").replace("Z", "").slice(0, 19); // '2024-05-10 08:21:03'

  console.log(activeProductId);

  //評價按鈕送出，將評論資料傳後後端處理
  const handleSubmitReview = async (v) => {
    const comment = document.querySelector("textarea").value;

    const response = await fetch(
      "http://localhost:3005/api/orders/add-review",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid,
          activeProductId,
          comment,
          rating,
          created_at: formattedDate, // 或讓後端生成時間戳
        }),
      }
    );

    const result = await response.json();
    console.log(result);
    if (response.ok) {
      setShowReview(false); // 隱藏評論表單

      console.log("Review submitted:", result);
      // 可以在這裡更新UI顯示新提交的評論

      Swal.fire({
        title: "評論成功",
        text: "",
        icon: "success",
      });
      handleCloseReview();
    } else {
      setShowReview(false); // 隱藏評論表單

      console.error("Failed to submit review:", result);
      Swal.fire({
        title: "已評論",
        text: "",
        icon: "error",
      });
    }
  };

  console.log(orders);

  // useEffect(() => {
  //   setShowReview(false);
  // }, [handleSubmitReview]);
  // let userid = parseInt(localStorage.getItem('userid'))
  // console.log(userid);

  // let userid = 1

  useEffect(() => {
    const userIdFromLocalStorage = localStorage.getItem("userid");
    if (userIdFromLocalStorage) {
      setUserid(parseInt(userIdFromLocalStorage));
    }
  }, []);

  // 資料表1商品訂單
  const getOrders = async (cat = "") => {
    const url = "http://localhost:3005/api/orders/" + cat;

    // 如果用了async-await，實務上要習慣使用try...catch來處理錯誤
    try {
      // fetch預設是使用GET，不需要加method設定
      const res = await fetch(url);
      // 解析json格式資料成js的資料
      const data = await res.json();
      console.log(data);

      // 為了要確保資料是陣列，所以檢查後再設定
      if (Array.isArray(data.data.orders)) {
        // 設定到狀態中
        // setOrders(data.data.orders);
        let filteredOrders = data.data.orders;
        console.log(filteredOrders);
        // 如果存在搜索关键字，则进行过滤
        if (searchTerm) {
          filteredOrders = filteredOrders.filter((order) => {
            const title = order.product_name || order.class_name;
            return title.includes(searchTerm);
          });
        }
        setOrders(filteredOrders);
        console.log(searchTerm);
      } else {
        console.log("伺服器回傳資料類型錯誤，無法設定到狀態中");
      }
      setOrders(filteredOrders);
    } catch (e) {
      console.log(e);
    }
  };

  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getOrders(activeCategory === "全部" ? "" : activeCategory);
  }, [activeCategory, searchTerm]);

  return (
    <>
      {orders
        .filter((v) => v.user_id === userid)
        .map((v, i) => {
          const title = v.product_name || v.class_name;
          //到時候把57改成當前會員ID(很像不能這樣寫QQ)
          //if(v.member_id===57)
          console.log(
            "Is showing review form:",
            activeProductId,
            v.id,
            activeProductId === v.id
          );

          return (
            <div className={`${styles.buyCard} my-0 my-sm-4`} key={v.order_id}>
              <div
                className={`${styles.buyCardContent} d-flex flex-row justify-content-between align-items-center`}
              >
                <div className={`${styles.bccolumn}`}>
                  <div className={styles.objectFit}>
                    {/* {v.image_url &&<img className="object-fit-cover"

                    src={`/images/products/${v.image_url}`}
                    alt=""
                  />} */}
                    {v.product_name ? (
                      <img
                        className="object-fit-cover"
                        src={`/images/products/${v.image_url}`}
                        alt=""
                      />
                    ) : (
                      <img
                        className="object-fit-cover"
                        src={`/images/member/classs.jpg`}
                        alt=""
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.buyItem} d-flex flex-row justify-content-between`}
                >
                  <div className={styles.buyItemMain}>
                    <div className={styles.biContent}>{title}...</div>
                    <div className={styles.biNumber}>{v.order_date} </div>
                    <div className={styles.biState}>
                      狀態 : {v.order_status}
                    </div>
                  </div>
                  <div
                    className={`${styles.biMb} d-flex flex-column justify-content-between`}
                  >
                    <div
                      className={`${styles.biMoney} d-flex justify-content-end`}
                    >
                      訂單金額: {v.order_total_price}
                    </div>
                    <div className={`d-flex flex-row justify-content-end`}>
                      <Link
                        href={`/member/history-order-detail?order_id=${v.order_id}`}
                        className={`${styles.buyCardBtn}  btn  btn d-flex justify-content-center`}
                      >
                        <span className={`d-none d-sm-flex`}>查看詳情</span>
                        <span className={`d-flex d-sm-none`}>查看</span>
                      </Link>
                      {v.has_reviewed === 1 ? (
                        <button
                          className={`${styles.buyCardBtn} btn d-flex justify-content-center ms-3 disabled`}
                        >
                          已評價
                        </button>
                      ) : (
                        <button
                          className={`${styles.buyCardBtn} btn d-flex justify-content-center ms-3 `}
                          onClick={() => handleShowReview(v.id)}
                        >
                          評價
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {v.has_reviewed === 0 && activeProductId === v.id && (
                <div className={`${styles.reviewContainer} mt-3`}>
                  <div className={`review-header`}>
                    <span className={`${styles.biContent}`}>評價心得</span>
                  </div>
                  <div
                    className={`${styles.biNumber} mt-2 review-rating d-flex flex-row`}
                  >
                    {/* 根據需要生成相應數量的星星評分： */}
                    {Array(5)
                      .fill(1)
                      .map((v, i) => {
                        // 每個按鈕的分數，相當於索引+1
                        const score = i + 1;

                        return (
                          <div
                            key={score}
                            className="d-flex flex-row me-3"
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
                  <div className={`${styles.reviewComment} mt-3 `}>
                    <textarea
                      className={`mt-3  ${styles.reviewInput}`}
                      placeholder="請輸入..."
                    ></textarea>
                  </div>
                  <div
                    className={`mt-3 review-actions d-flex flex-row justify-content-end`}
                  >
                    <button
                      className={`${styles.buyCardBtn} btn-submit btn d-flex justify-content-center me-3`}
                      onClick={handleCloseReview}
                    >
                      取消
                    </button>
                    <button
                      className={`${styles.buyCardBtn} btn-submit btn d-flex justify-content-center`}
                      onClick={() => handleSubmitReview(v.id)}
                    >
                      提交
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}
