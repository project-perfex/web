import api from '@/lib/axios'

import {
  GetProductsQuery,
  GetProductsResponse,
  Products
} from '../types/product'

export const getProducts = async (param: GetProductsQuery = {}) => {
  const { title, category, page, limit, total } = param

  const {
    data: { data, meta }
  } = await api.get<GetProductsResponse>('/products', {
    params: {
      title,
      category,
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

export const addProduct = async (product: Products) => {
  const response = await api.post('/products', product)
  return response.data
}

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export const updateProduct = async (id: string, product: Products) => {
  const response = await api.put(`/products/${id}`, product)
  return response.data
}

export const deleteProduct = async (id: string) => {
  await api.delete(`/products/${id}`)
}
