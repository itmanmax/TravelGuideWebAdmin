import request from '../request'
import type { User, UserPageResponse, UserQueryParams } from '@/types/user'

export interface AdminUserResponse {
  code: number
  message: string
  data: UserPageResponse
}

// 获取所有用户
export const getAllUsers = async (params?: UserQueryParams) => {
  const response = await request.get<AdminUserResponse>('/admin/users', { params })
  return response.data
}

// 删除用户
export const deleteUser = async (id: number) => {
  const response = await request.delete(`/admin/users/${id}`)
  return response.data
}

// 更新用户状态
export const updateUserStatus = async (id: number, status: number) => {
  const response = await request.put(`/admin/users/${id}/status`, { status })
  return response.data
} 