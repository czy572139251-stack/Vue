import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios"
import { ElMessage } from "element-plus"

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api"

const request: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code && res.code !== 200) {
      ElMessage.error(res.message || "请求失败")
      return Promise.reject(new Error(res.message || "请求失败"))
    }
    return res
  },
  (error: AxiosError) => {
    const status = error.response?.status
    const messages: Record<number, string> = {
      400: "请求参数错误",
      401: "登录已过期，请重新登录",
      403: "无权限访问",
      404: "请求资源不存在",
      500: "服务器错误",
    }
    ElMessage.error(messages[status as number] || "网络错误")
    if (status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default request
