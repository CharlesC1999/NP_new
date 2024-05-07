import React from "react";
import styles from "./Card6Recipe.module.css";
import Link from "next/link";
function Card6Recipe({id,title,image,content}) {
  return (
    <>
      <Link href={`/recipe/${id}`} className={`text-decoration-none ${styles.Card6RecipeLink}`}>
        <div className={`d-flex ${styles["card6"]}`}>
          <div className={`${styles["card6Img"]}`}>
            <img src={`/images/recipe/list/${image}`} alt="" />
          </div>
          <div className={`${styles["card6Text"]}`}>
            <h5>{title}</h5>
            <p>
           {content}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card6Recipe;
