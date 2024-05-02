import { createContext, useContext, useState } from "react";

const CategoryForSQLContext = createContext(null);

export function CategoryForSQLProvider({ children }) {
  // 食譜分類，用在食譜列表頁跟細節頁的sideBar，點擊時設定state並當成params傳給後端做SQL查詢
  const [recipeCategory, setRecipeCategory] = useState("");

  return (
    <CategoryForSQLContext.Provider
      value={{ recipeCategory, setRecipeCategory }}
    >
      {children}
    </CategoryForSQLContext.Provider>
  );
}

export const useCategoryForSQL = () => useContext(CategoryForSQLContext);
