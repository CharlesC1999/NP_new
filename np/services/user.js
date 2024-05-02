import axiosInstance, { fetcher } from './axios-instance'
// 使用 axiosInstance 來發送 HTTP 請求
//獲得會員有加在我的最愛的商品id，回傳為id陣列
export const getFavs = async () => {
    try {
      // 使用 axiosInstance 發送 GET 請求
      const response = await axiosInstance.get('/favor-recipe');
      // 從回應中解構出需要的 data 部分
      const { data } = response;
  
      // 確認 API 回應的 status 為 "success"
      if (data.status === 'success') {
        // 解構出 favorRecipe 和 recipeFavorData
        const { favorRecipe, recipeFavorData } = data.data;
        // 返回解構出的資料
        return { favorRecipe, recipeFavorData };
      } else {
        throw new Error('API returned an error: ' + data.message);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;  // 可以選擇拋出錯誤或處理錯誤
    }
  }
//新增商品id在該會員的我的最愛清單中的
export const addFav = async (rid) => {
 return await axiosInstance.put(`/favor-recipe/${rid}`)
}
//移除商品id在該會員的我的最愛清單中的
export const removeFav = async (rid) => {
 return await axiosInstance.delete(`/favor-recipe/${rid}`)
}

