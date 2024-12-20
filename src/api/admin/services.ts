import request from '../request'
import type { Service, ServicePageResponse, ServiceQueryParams } from '@/types/service'

export interface AdminServiceResponse {
  code: number
  message: string
  data: ServicePageResponse
}

// 获取所有服务
export const getAllServices = async (params?: ServiceQueryParams) => {
  const response = await request.get<AdminServiceResponse>('/admin/services', { params })
  return response.data
}

// 审核服务
export const auditService = async (id: number, status: string) => {
  const response = await request.put(`/admin/services/${id}/audit`, { status })
  return response.data
} 