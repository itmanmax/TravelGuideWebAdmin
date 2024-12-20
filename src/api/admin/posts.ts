import request from '../request'
import type { Post, PostPageResponse } from '@/types/post'

export interface AdminPostResponse {
  code: number
  message: string
  data: PostPageResponse
}

// 获取所有文章
export const getAllPosts = async (params?: { page?: number; size?: number; sort?: string[] }) => {
  const response = await request.get<AdminPostResponse>('/admin/posts', { params })
  return response.data
}

// 删除文章
export const deletePost = async (id: number) => {
  const response = await request.delete(`/admin/posts/${id}`)
  return response.data
}

// 审核文章
export const auditPost = async (id: number, status: string) => {
  const response = await request.put(`/admin/posts/${id}/status`, { status })
  return response.data
} 