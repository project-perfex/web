export interface Categories {
  id?: number | null
  title: string
  createdAt?: string | null
  updatedAt?: string | null
}

export interface GetCategoriesPagination {
  total: number
  page: number
  limit: number
}

export interface GetCategoriesResponse {
  data: Categories[]
  meta: GetCategoriesPagination
}

export interface GetCategoriesQuery {
  total?: number
  page?: number
  limit?: number
  title?: string | null
}
