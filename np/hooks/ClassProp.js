import { createContext, useContext, useState } from "react";

// 創建 Context
const CategoryContext = createContext();

// 這是一個封裝好的provider組件，用來提供context
export function CategoryProvider({ children }) {
  const [categoryId, setCategoryId] = useState(null);
  const [finalStartDate, setFinalStartDate] = useState(null);
  const [finalEndDate, setFinalEndDate] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 9999 });

  return (
    <CategoryContext.Provider
      value={{
        categoryId,
        setCategoryId,
        finalStartDate,
        setFinalStartDate,
        finalEndDate,
        setFinalEndDate,
        priceRange,
        setPriceRange,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

// 自定義hook，用於方便的在組件中使用這個context
export function useCategory() {
  return useContext(CategoryContext);
}
