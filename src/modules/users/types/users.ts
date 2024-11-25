export interface Users {
  id: number
  email: string
  name: string
  password: string
  phone: string
  role: string
  createdAt?: string | null
  updatedAt?: string | null
}

export interface GetUsersPagination {
  total: number
  page: number
  limit: number
}

export interface GetUsersResponse {
  data: Users[]
  meta: GetUsersPagination
}

export interface GetUsersQuery {
  total?: number
  page?: number
  limit?: number
  name?: string | null
  email?: string | null
}
