import { createContext, useContext, useState,useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getFavs } from "@/services/user";
const FavorDataContext = createContext(null);

export function FavorDataProvider({ children }) {
    const { auth } = useAuth();
    const [favorRecipe, setFavorRecipe] = useState([]);
    const [recipeData, setRecipeData] = useState([]);
    const [favorClass, setFavorClass] = useState([]);
    const [classData, setClassData] = useState([]);
    const [favorProduct, setFavorProduct] = useState([]);
    const [productData, setProductData] = useState([]);
     // 用來抓取愛心按鈕的狀態
  const [action, setAction] = useState(null);
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
    if (auth.isLoggedIn) {
      fetchFavorites();
    } else {
      setProductData([]);
      setClassData([]);
      setRecipeData([]);
      setFavorRecipe([]);
      setFavorClass([]);
      setFavorProduct([]);
    }
  }, [auth, action]);
    return (
        <FavorDataContext.Provider value={{
            favorRecipe,
            recipeData,
            favorClass,
            classData,
            favorProduct,
            productData,
            action,
            setAction}}>
            {children}
            </FavorDataContext.Provider>
    )
}

export const useFavor = () => useContext(FavorDataContext);