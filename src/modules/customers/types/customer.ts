export interface Customers {
  id?: number | null
  email: string
  name: string
  phone: string
  address: string
  createdAt?: string | null
  updatedAt?: string | null
}

export interface GetCustomersPagination {
  total: number
  page: number
  limit: number
}

export interface GetCustomersResponse {
  data: Customers[]
  meta: GetCustomersPagination
}

export interface GetCustomersQuery {
  total?: number
  page?: number
  limit?: number
  name?: string | null
  email?: string | null
}
