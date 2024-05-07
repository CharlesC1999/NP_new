import axios from 'axios'
const apiBaseUrl = 'http://localhost:3005/api'
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 8000,
  withCredentials: true,
})

// fetcher for swr
export const fetcher = (url) => axiosInstance.get(url).then((res) => res.data)
export const fetchWithToken = (url, token) => {
  axiosInstance.get(`${url}&${token}`).then((res) => res.data)
}

export const fetcherWithObject = ({ url, args }) => {
  const extraParams = new URLSearchParams(args)
  const andSymbol = extraParams.toString() ? '&' : ''

  const combinedUrl = url + andSymbol + extraParams.toString()

  console.log(combinedUrl)

  axiosInstance.get(combinedUrl).then((res) => res.data)
}

export default axiosInstance