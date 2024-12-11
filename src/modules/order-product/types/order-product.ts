export interface OrderProducts {
  id?: string
  orderId: string
  productId: string
  quantity: number
  total: number
  order: {
    id: string
    title: string
    notes: string
    payment: string
    status: string
    address: string
    userId: string
    customerId: string
    createdAt?: Date | null
    updatedAt?: Date | null
  } | null
  product: {
    id: string
    title: string
    description: string
    price: number
    categoryId: string
    createdAt?: Date | null
    updatedAt?: Date | null
  } | null
}

export interface GetOrderProductsPagination {
  total: number
  page: number
  limit: number
}

export interface GetOrderProductsResponse {
  data: OrderProducts[]
  meta: GetOrderProductsPagination
}

export interface GetOrderProductsQuery {
  total?: number
  page?: number
  limit?: number
  order?: string | null
  product?: string | null
}
