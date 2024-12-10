export interface Orders {
  id?: string
  title: string
  notes: string
  payment: string
  status: string
  address: string
  userId: string
  customerId: string
  createdAt?: Date | null
  updatedAt?: Date | null
  user?: {
    id: string
    name: string
    email: string
  }
  customer?: {
    id: string
    name: string
    email: string
    phone: string
    address: string
    createdAt?: Date | null
    updatedAt?: Date | null
  }
}

export interface GetOrdersPagination {
  total: number
  page: number
  limit: number
}

export interface GetOrdersResponse {
  data: Orders[]
  meta: GetOrdersPagination
}

export interface GetOrdersQuery {
  total?: number
  page?: number
  limit?: number
  status?: string | null
  user?: string | null
  customer?: string | null
}
