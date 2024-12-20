import request from './request'
import type { ApiStatisticsResponse } from '@/types/statistics'

// 获取API访问统计数据
export const getApiStatistics = async () => {
  const response = await request.get<ApiStatisticsResponse>('/admin/statistics')
  return response.data
} 