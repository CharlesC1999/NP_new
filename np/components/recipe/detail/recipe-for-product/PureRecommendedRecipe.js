import React from "react";
import RecipeCard from "./RecipeCard";

export default function SmallRecommendedRecipe() {
  return (
    <>
      <div className={`row justify-content-between`}>
        <RecipeCard />
      </div>
    </>
  );
}
