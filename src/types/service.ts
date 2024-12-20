export interface Service {
  id: number
  name: string
  description: string
  type: 'TOUR' | 'GUIDE'
  price: number
  city: string
  address: string
  contactInfo: string
  details: string
  imageUrl: string
  status: number
  averageRating: number | null
  commentCount: number
  createdTime: string
  updatedTime: string
}

export interface ServicePageResponse {
  content: Service[]
  pageable: string
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

export interface ServiceResponse {
  code: number
  message: string
  data: Service
}

export interface ServiceListResponse {
  code: number
  message: string
  data: ServicePageResponse
}

export interface ServiceQueryParams {
  page?: number
  size?: number
  sort?: string[]
} 