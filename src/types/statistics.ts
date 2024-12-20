export interface ApiStatistic {
  path: string
  count: number
}

export interface ApiStatisticsResponse {
  code: number
  message: string
  data: ApiStatistic[]
} 