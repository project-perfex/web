import api from '@/lib/axios'

import { GetOrdersQuery, GetOrdersResponse, Orders } from '../types/orders'

export const getOrders = async (param: GetOrdersQuery = {}) => {
  const { status, user, customer, page, limit, total } = param

  const {
    data: { data, meta }
  } = await api.get<GetOrdersResponse>('/orders', {
    params: {
      status,
      user,
      customer,
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

export const addOrder = async (order: Orders) => {
  const response = await api.post('/orders', order)
  return response.data
}

export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`)
  return response.data
}

export const updateOrder = async (id: string, order: Orders) => {
  const response = await api.put(`/orders/${id}`, order)
  return response.data
}

export const deleteOrder = async (id: string) => {
  await api.delete(`/orders/${id}`)
}
