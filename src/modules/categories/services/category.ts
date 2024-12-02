import api from '@/lib/axios'

import {
  Categories,
  GetCategoriesQuery,
  GetCategoriesResponse
} from '../types/category'

export const getCategories = async (param: GetCategoriesQuery = {}) => {
  const { title, page, limit, total } = param

  const {
    data: { data, meta }
  } = await api.get<GetCategoriesResponse>('/categories', {
    params: {
      title,
      page,
      limit,
      total
    }
  })

  return {
    data,
    meta
  }
}

export const addCategory = async (category: Categories) => {
  const response = await api.post('/categories', category)
  return response.data
}

export const getCategoryById = async (id: string) => {
  const response = await api.get(`/categories/${id}`)
  return response.data
}

export const updateCategory = async (id: string, category: Categories) => {
  const response = await api.put(`/categories/${id}`, category)
  return response.data
}

export const deleteCategory = async (id: string) => {
  await api.delete(`/categories/${id}`)
}
