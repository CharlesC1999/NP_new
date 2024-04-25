import React, { createContext, useContext, useState } from "react";

// 創建一個 Context 對象
const LoaderContext = createContext({
  loading: false,
  setLoading: () => {},
});

// 提供一個 Provider 組件
export const LoaderProvider = ({ children, CustomLoader }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      <CustomLoader show={loading} />
      {children}
    </LoaderContext.Provider>
  );
};

// 自定義 Hook 來使用 LoaderContext
export const useLoader = () => useContext(LoaderContext);
