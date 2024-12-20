import request from './request'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  code: number
  message: string
  data: {
    token: string
    type: string
    id: number
    username: string
    email: string
    roles: string[]
  }
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// API 路径常量
const API_PATHS = {
  LOGIN: '/auth/admin/login',
  LOGOUT: '/auth/admin/logout',
  USER_INFO: '/auth/admin/info'
}

export const login = async (data: LoginParams): Promise<LoginResponse> => {
  const response = await request.post<ApiResponse<LoginResponse['data']>>(API_PATHS.LOGIN, data)
  return response.data
}

export const logout = async () => {
  const response = await request.post<ApiResponse<null>>(API_PATHS.LOGOUT)
  return response.data
}

export const getUserInfo = async () => {
  const response = await request.get<ApiResponse<LoginResponse['data']>>(API_PATHS.USER_INFO)
  return response.data
} 