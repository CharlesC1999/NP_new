import axios from 'axios'
import { useAuth } from '@/contexts/AuthContext.js'
const apiBaseUrl = 'http://localhost:3005/api'

const axiosInstanceFav = axios.create({
  baseURL: apiBaseUrl,
  timeout: 8000,
  withCredentials: true,
})
// 添加請求攔截器
axiosInstanceFav.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  // 對請求錯誤做點什麼
  return Promise.reject(error);
});

// fetcher for swr
export const fetcher = (url) => axiosInstanceFav.get(url).then((res) => res.data)
export const fetchWithToken = (url, token) => {
  axiosInstanceFav.get(`${url}&${token}`).then((res) => res.data)
}

export const fetcherWithObject = ({ url, args }) => {
  const extraParams = new URLSearchParams(args)
  const andSymbol = extraParams.toString() ? '&' : ''

  const combinedUrl = url + andSymbol + extraParams.toString()

  console.log(combinedUrl)

  axiosInstanceFav.get(combinedUrl).then((res) => res.data)
}

export default axiosInstanceFav