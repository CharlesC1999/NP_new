import axios from "axios";
import axiosInstanceFav, { fetcher } from "./axios-instanceFav";
import axiosInstance from "./axios-instance";
// 使用 axiosInstanceFav 來發送 HTTP 請求
// ----------------------收藏用-------------------------------
export const getFavs = async () => {
  try {
    // 使用 axiosInstanceFav 發送 GET 請求
    const responseRecipe = await axiosInstanceFav.get("/favor-recipe");
    const responseClass = await axiosInstanceFav.get("/favor-class");
    const responseProduct = await axiosInstanceFav.get("/favor-product");
    // 使用 axiosInstanceFav 發送 購物車GET 請求
    // 從回應中解構出需要的 data 部分，並重新命名
    const { data: dataRecipe } = responseRecipe;
    const { data: dataClass } = responseClass;
    const { data: dataProduct } = responseProduct;
    // 確認 API 回應的 status 為 "success"
    if (dataRecipe.status !== "success") {
      throw new Error("Recipe API returned an error: " + dataRecipe.message);
    }
    if (dataClass.status !== "success") {
      throw new Error("Class API returned an error: " + dataClass.message);
    }
    if (dataProduct.status !== "success") {
      throw new Error("Product API returned an error: " + dataRecipe.message);
    }
    return {
      favorRecipe: dataRecipe.data.favorRecipe,
      recipeFavorData: dataRecipe.data.recipeFavorData,
      favorClass: dataClass.data.favorClass,
      classFavorData: dataClass.data.classFavorData,
      favorProduct: dataProduct.data.favorProduct,
      productFavorData: dataProduct.data.productFavorData,
    };
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error; // 可以選擇拋出錯誤或處理錯誤
  }
};
//新增食譜id在該會員的我的最愛清單中
export const addRecipeFav = async (rid) => {
  return await axiosInstanceFav.put(`/favor-recipe/${rid}`);
};
//移除食譜id在該會員的我的最愛清單中
export const removeRecipeFav = async (rid) => {
  return await axiosInstanceFav.delete(`/favor-recipe/${rid}`);
};

//新增課程id在該會員的我的最愛清單中
export const addClassFav = async (cid) => {
  return await axiosInstanceFav.put(`/favor-class/${cid}`);
};
//移除課程id在該會員的我的最愛清單中
export const removeClassFav = async (cid) => {
  return await axiosInstanceFav.delete(`/favor-class/${cid}`);
};

//新增商品id在該會員的我的最愛清單中
export const addProductFav = async (pid) => {
  return await axiosInstanceFav.put(`/favor-product/${pid}`);
};
//移除商品id在該會員的我的最愛清單中
export const removeProductFav = async (pid) => {
  return await axiosInstanceFav.delete(`/favor-product/${pid}`);
};

// ---------------------------------首頁用 ---------------------------
export const getHomePageInfo = async () => {
  try {
    // 使用 axiosInstanceFav 發送 GET 請求
    const res = await axiosInstance.get("/homepage");

    // 從回應中解構出需要的 data 部分，並重新命名
    const { data: dataHomePage } = res;
    // 確認 API 回應的 status 為 "success"
    if (dataHomePage.status !== "success") {
      throw new Error("Recipe API returned an error: " + dataHomePage.message);
    }
    return {
      hotProduct: dataHomePage.data.hotProduct,
      hotClass: dataHomePage.data.hotClass,
      recommendedRecipe: dataHomePage.data.recommendedRecipe,
      productCate: dataHomePage.data.productCate,
    };
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error; // 可以選擇拋出錯誤或處理錯誤
  }
};
