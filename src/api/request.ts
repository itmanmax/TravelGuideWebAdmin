import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { ApiResponse } from './auth'

// 根据环境变量选择 API 地址
const getBaseURL = (): string => {
  const mode = import.meta.env.VITE_API_MODE
  const baseUrl = mode === '0' 
    ? import.meta.env.VITE_LOCAL_API_URL 
    : import.meta.env.VITE_REMOTE_API_URL
  
  // 在生产环境中直接使用相对路径
  return import.meta.env.PROD ? '' : baseUrl
}

const instance: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 添加请求日志
    console.log('Request:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      headers: config.headers
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return {
      ...response,
      data: response.data as ApiResponse<any>
    }
  },
  (error) => {
    // 只有在真正的 401 未授权时才清除登录状态
    if (error.response?.status === 401) {
      console.error('Unauthorized:', error.response.data)
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
    } 
    // 对于 403 禁止访问，只显示错误信息
    else if (error.response?.status === 403) {
      console.error('Forbidden:', error.response.data)
    }
    // 对 500 服务器错误
    else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data)
    }
    return Promise.reject(error)
  }
)

export default instance 