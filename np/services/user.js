import axiosInstance, { fetcher } from "./axios-instance";
// 使用 axiosInstance 來發送 HTTP 請求
//獲得會員有加在我的最愛的商品id，回傳為id陣列
export const getFavs = async () => {
  try {
    // 使用 axiosInstance 發送 GET 請求
    const responseRecipe = await axiosInstance.get("/favor-recipe");
    const responseClass = await axiosInstance.get("/favor-class");
    // 從回應中解構出需要的 data 部分，並重新命名
    const { data: dataRecipe } = responseRecipe;
    const { data: dataClass } = responseClass;
    // 確認 API 回應的 status 為 "success"
    if (dataRecipe.status !== "success") {
      throw new Error("API returned an error: " + dataRecipe.message);
    }
    if (dataClass.status !== "success") {
      throw new Error("API returned an error: " + dataClass.message);
    }
    return {
      favorRecipe: dataRecipe.data.favorRecipe,
      recipeFavorData: dataRecipe.data.recipeFavorData,
      favorClass: dataClass.data.favorClass,
      classFavorData: dataClass.data.classFavorData,
    };
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error; // 可以選擇拋出錯誤或處理錯誤
  }
};
//新增食譜id在該會員的我的最愛清單中
export const addRecipeFav = async (rid) => {
  return await axiosInstance.put(`/favor-recipe/${rid}`);
};
//移除食譜id在該會員的我的最愛清單中
export const removeRecipeFav = async (rid) => {
  return await axiosInstance.delete(`/favor-recipe/${rid}`);
};

//新增課程id在該會員的我的最愛清單中
export const addClassFav = async (cid) => {
  return await axiosInstance.put(`/favor-class/${cid}`);
};
//移除課程id在該會員的我的最愛清單中
export const removeClassFav = async (cid) => {
  return await axiosInstance.delete(`/favor-class/${cid}`);
};
