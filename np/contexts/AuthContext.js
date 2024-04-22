import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isLoggedIn: false });

  const login = (token) => {
    setAuth({ token, isLoggedIn: true });
    localStorage.setItem("token", token); // 将token存储在localStorage中以持久化登录状态
  };

  const logout = () => {
    setAuth({ token: null, isLoggedIn: false });
    localStorage.removeItem("token"); // 清除localStorage中的token
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
