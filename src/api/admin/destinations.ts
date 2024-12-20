import request from '../request'
import type { 
  Destination, 
  DestinationPageResponse, 
  DestinationQueryParams 
} from '@/types/destination'

export interface AdminDestinationResponse {
  code: number
  message: string
  data: DestinationPageResponse
}

// 获取所有景点
export const getDestinations = async (params?: DestinationQueryParams) => {
  const response = await request.get<AdminDestinationResponse>('/public/destinations', { params })
  return response.data
}

// 删除景点 (待实现)
export const deleteDestination = async (id: number) => {
  // const response = await request.delete(`/admin/destinations/${id}`)
  // return response.data
  throw new Error('功能开发中')
}

// 更新景点状态 (待实现)
export const updateDestinationStatus = async (id: number, status: number) => {
  // const response = await request.put(`/admin/destinations/${id}/status`, { status })
  // return response.data
  throw new Error('功能开发中')
}

// 创建景点 (待实现)
export const createDestination = async (destination: Partial<Destination>) => {
  // const response = await request.post('/admin/destinations', destination)
  // return response.data
  throw new Error('功能开发中')
}

// 更新景点 (待实现)
export const updateDestination = async (id: number, destination: Partial<Destination>) => {
  // const response = await request.put(`/admin/destinations/${id}`, destination)
  // return response.data
  throw new Error('功能开发中')
} 