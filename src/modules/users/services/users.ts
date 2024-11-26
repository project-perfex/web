import api from '@/lib/axios'

import {
  GetUsersQuery,
  GetUsersResponse,
  Users
} from '@/modules/users/types/users'

export const getUsers = async (param: GetUsersQuery = {}) => {
  const { name, email, page, limit, total } = param

  const {
    data: { data, meta }
  } = await api.get<GetUsersResponse>('/users', {
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

export const addUser = async (user: Users) => {
  const response = await api.post('/users', user)
  return response.data
}

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export const updateUser = async (id: string, user: Users) => {
  const response = await api.put(`/users/${id}`, user)
  return response.data
}

export const deleteUser = async (id: string) => {
  await api.delete(`/users/${id}`)
}
