// TotalContext.js
import React, { createContext, useState, useContext } from 'react';

const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
  const [total, setTotal] = useState(0);

  return (
    <TotalContext.Provider value={{ total, setTotal }}>
      {children}
    </TotalContext.Provider>
  );
};

export const useTotal = () => useContext(TotalContext);