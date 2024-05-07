import { createContext, useContext, useState } from "react";

const CategoriesContext = createContext(null);

//ProductCateProvider context的值
export function ProductCateProvider({ children }) {
  //--值--//
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleCategoryChange = (category_id) => {
    setSelectedCategories(category_id);
  };
  //--值--//
  return (
    //將創建的context使用.provider ProductCateProvider的所有內容（值）包起來
    <CategoriesContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        handleCategoryChange,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

//在使用useContext 封裝讓消費者使用CategoriesContext
export const useProductCategories = () => useContext(CategoriesContext);
