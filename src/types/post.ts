export interface User {
  id: number
  username: string | null
  password: string | null
  email: string | null
  nickname: string
  avatar: string
  phone: string | null
  role: string | null
  status: number
  createdTime: string | null
  updatedTime: string | null
}

export interface Post {
  id: number
  title: string
  content: string
  coverImage: string
  city: string
  category: string
  userId: number
  status: number
  viewCount: number
  createdTime: string
  updatedTime: string
  comments: any[] | null
  user: User
}

export interface PostPageResponse {
  content: Post[]
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

export interface PostQueryParams {
  page?: number
  size?: number
  sort?: string[]
}

export interface PostResponse {
  code: number
  message: string
  data: Post
}

export interface PostListResponse {
  code: number
  message: string
  data: Post[]
} 