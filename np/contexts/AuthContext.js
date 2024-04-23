import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isLoggedIn: false });

  const login = (token) => {
    setAuth({ token, isLoggedIn: true });
    localStorage.setItem("token", token);
    // 將token存儲在localStorage中以維持登入狀態
    // 用localStorage存儲會有安全性問題，因為localStorage是存儲在瀏覽器中，
    // 任何人都可以訪問localStorage，所以可以用cookie來存儲token
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
