import api from '@/lib/axios'

import {
  GetOrderProductsQuery,
  GetOrderProductsResponse,
  OrderProducts
} from '../types/order-product'

export const getOrderProducts = async (param: GetOrderProductsQuery = {}) => {
  const { order, product, page, limit, total } = param

  const {
    data: { data, meta }
  } = await api.get<GetOrderProductsResponse>('/order-product', {
    params: {
      order,
      product,
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

export const addOrderProduct = async (orderProduct: OrderProducts) => {
  const response = await api.post('/order-product', orderProduct)
  return response.data
}

export const getOrderProductById = async (id: string) => {
  const response = await api.get(`/order-product/${id}`)
  return response.data
}

export const updateOrderProduct = async (
  id: string,
  orderProduct: OrderProducts
) => {
  const response = await api.put(`/order-product/${id}`, orderProduct)
  return response.data
}

export const deleteOrderProduct = async (id: string) => {
  await api.delete(`/order-product/${id}`)
}
