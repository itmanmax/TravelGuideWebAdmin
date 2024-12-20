export interface Destination {
  id: number
  name: string
  description: string
  city: string
  address: string
  imageUrl: string
  status: number
  averageRating: number | null
  commentCount: number
  createdAt: string
  updatedAt: string
}

export interface DestinationPageResponse {
  content: Destination[]
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

export interface DestinationResponse {
  code: number
  message: string
  data: Destination
}

export interface DestinationListResponse {
  code: number
  message: string
  data: Destination[]
}

export interface DestinationQueryParams {
  page?: number
  size?: number
  sort?: string[]
} 