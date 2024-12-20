import request from '../request'

export interface ApiStatistic {
  path: string
  count: number
}

export interface ApiStatisticsResponse {
  code: number
  message: string
  data: ApiStatistic[]
}

export const getApiStatistics = async () => {
  const response = await request.get<ApiStatisticsResponse>('/admin/statistics')
  return response.data
} 