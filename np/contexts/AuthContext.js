import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 初始化時從localStorage獲取token來設定登入狀態
  const [auth, setAuth] = useState({
    token: null,
    // 預設token為空值，login讀取時會將空值讀取成false
    isLoggedIn: false,
    // 判定是否為登入狀態，判定否
  });

  useEffect(() => {
    // 組件掛載後，從localStorage中讀取token並更新狀態
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({
        token: token,
        // login讀取將token讀進來
        isLoggedIn: true,
        // 判定為登入狀態，頁面轉換時不會丟失token
      });
    }
  }, []);

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
