//FontAwsome
import "@fortawesome/fontawesome-free/css/all.css";

//styles
import "bootstrap/dist/css/bootstrap.min.css";
import style from "@/components/product/productSection02.module.scss";

export default function ProductSection02({ review_comments }) {
  return (
    <>
      <div className={`${style["p-comment"]} flex-column `}>
        <div className={`d-flex flex-column`}>
          <h5 className={`${style["h5"]}`}>評論</h5>
          {review_comments.map((review, index) => {
            const starsCount = review.rating;
            const emptyStarsCount = Math.max(0, 5 - starsCount);
            return (
              <div key={index}>
                <div className={`d-flex flex-row align-items-center mt-3`}>
                  <div className={`${style["img"]} me-2 mb-2`}>
                    {/* <img src="/path/to/default-avatar.png" alt="User avatar" /> */}
                  </div>
                  <div className={`${style["user-name"]}`}>
                    User{review.reviewerId}
                  </div>
                </div>
                <div className={`${style["star"]} my-2 mb-4`}>
                  <span className={`${style["date"]} pe-2`}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  {"★".repeat(starsCount)}
                  {"☆".repeat(emptyStarsCount)}
                </div>
                <p className={`${style["p"]} mb-3`}>{review.comment}</p>
                <div className={`${style["detail-text"]} mb-5`}>
                  <i class="fa-regular fa-thumbs-up"></i>
                  <span className={`px-2`}>5</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
