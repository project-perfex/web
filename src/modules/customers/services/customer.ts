import api from '@/lib/axios'

import {
  Customers,
  GetCustomersQuery,
  GetCustomersResponse
} from '../types/customer'

export const getCustomers = async (param: GetCustomersQuery = {}) => {
  const { name, email, page, limit, total } = param

  const {
    data: { data, meta }
  } = await api.get<GetCustomersResponse>('/customers', {
    params: {
      name,
      email,
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

export const addCustomer = async (customer: Customers) => {
  const response = await api.post('/customers', customer)
  return response.data
}

export const getCustomerById = async (id: string) => {
  const response = await api.get(`/customers/${id}`)
  return response.data
}

export const updateCustomer = async (id: string, customer: Customers) => {
  const response = await api.put(`/customers/${id}`, customer)
  return response.data
}

export const deleteCustomer = async (id: string) => {
  await api.delete(`/customers/${id}`)
}
