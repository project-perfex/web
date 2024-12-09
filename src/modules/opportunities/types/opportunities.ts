export interface Opportunities {
  id?: string
  title: string
  description: string
  price: number
  status: string
  customerId: string
  createdAt?: Date | null
  updatedAt?: Date | null
  customer?: {
    id: string
    name: string
    email: string
    phone: string
    address: string
    createdAt?: Date | null
    updatedAt?: Date | null
  } | null
}

export interface GetOpportunitiesPagination {
  total: number
  page: number
  limit: number
}

export interface GetOpportunitiesResponse {
  data: Opportunities[]
  meta: GetOpportunitiesPagination
}

export interface GetOpportunitiesQuery {
  total?: number
  page?: number
  limit?: number
  title?: string | null
  status?: string | null
  customer?: string | null
}
