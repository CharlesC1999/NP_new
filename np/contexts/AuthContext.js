import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // 确保已经导入 axios
import { useRouter } from "next/router"; // 导入 useRouter 以便在需要时进行路由跳转
import axiosInstance from "@/services/axios-instance";
import { getFavs } from "@/services/user";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 初始化時從localStorage獲取token來設定登入狀態
  const [auth, setAuth] = useState({
    token: null,
    isLoggedIn: false,
  });

  const [favorRecipe, setFavorRecipe] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const [favorClass, setFavorClass] = useState([]);
  const [classData, setClassData] = useState([]);
  const [favorProduct,setFavorProduct] = useState([])
  const [productData,setProductData] = useState([])
  const fetchFavorites = async () => {
    try {
      const {
        favorRecipe,
        recipeFavorData,
        favorClass,
        classFavorData,
        favorProduct,
        productFavorData,
      } = await getFavs();
      setFavorRecipe(favorRecipe);
      setRecipeData(recipeFavorData);
      setFavorClass(favorClass);
      setClassData(classFavorData);
      setFavorProduct(favorProduct);
      setProductData(productFavorData);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  };
  useEffect(() => {
    if(auth.isLoggedIn){
      fetchFavorites();
    } else {
      setClassData([]);
      setFavorProduct([]);
      setProductData([]);
    }
  }, [auth]);

  const router = useRouter()
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

  // 登入
  const login = (token, userData = {}) => {
    setAuth({ token, isLoggedIn: true, userData });
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log(token, userData);
    // 將token存儲在localStorage中以維持登入狀態
    // 用localStorage存儲會有安全性問題，因為localStorage是存儲在瀏覽器中，
    // 任何人都可以訪問localStorage，所以可以用cookie來存儲token
  };

  // 更新
  const updateUser = (userData) => {
    setAuth((prev) => ({ ...prev, user: userData }));
    // 更新用戶數據
  };

  // 登出
  const logout = async () => {
    if (auth.token) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setAuth({ token: null, isLoggedIn: false, userData: [] });
      try {
        await axios.delete("http://localhost:3005/api/auth/logout", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        // After successfully logging out on the server
        // localStorage.removeItem("token");
        // setAuth({ token: null, isLoggedIn: false });
        router.push("/login"); // Redirect to login page or home
      } catch (error) {
        console.error("Logout failed:", error);
        // Optionally handle errors, e.g., display an error message
      }
    } else {
      console.log("已登出");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        favorRecipe,
        setFavorRecipe,
        recipeData,
        setRecipeData,
        favorClass,
        setFavorClass,
        classData,
        setClassData,
        favorProduct,
        setFavorProduct,
        productData,
        setProductData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
