export interface User {
  id: number
  username: string
  password: string | null
  email: string
  nickname: string
  avatar: string
  phone: string | null
  role: 'ADMIN' | 'USER'
  status: number
  createdTime: string
  updatedTime: string
}

export interface UserPageResponse {
  content: User[]
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

export interface UserResponse {
  code: number
  message: string
  data: User
}

export interface UserListResponse {
  code: number
  message: string
  data: User[]
}

export interface UserQueryParams {
  page?: number
  size?: number
  sort?: string[]
} 