import { createContext, useContext, useState } from "react";

const CategoriesContext = createContext(null);

export function CategoriesProvider({ children }) {
  // 新的食譜類別 (有擴充qty的，原本那個不知道為啥一直無法設定qty)
  const [newCategories, setNewCategories] = useState([]);

  return (
    <CategoriesContext.Provider value={{ newCategories, setNewCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export const useCategories = () => useContext(CategoriesContext);
