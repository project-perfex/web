export interface Products {
  id?: string
  title: string
  description: string
  price: number
  categoryId?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  category?: {
    id: string
    title: string
    createdAt?: Date | null
    updatedAt?: Date | null
  } | null
}

export interface GetProductsPagination {
  total: number
  page: number
  limit: number
}

export interface GetProductsResponse {
  data: Products[]
  meta: GetProductsPagination
}

export interface GetProductsQuery {
  total?: number
  page?: number
  limit?: number
  title?: string | null
  category?: string | null
}
