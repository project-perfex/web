import api from '@/lib/axios'

import { GetUsersQuery, GetUsersResponse } from '@/modules/users/types/users'

export const getUsers = async (param: GetUsersQuery = {}) => {
  const { name, email, role } = param

  const { data } = await api.get<GetUsersResponse>('/users', {
    params: {
      name,
      email,
      role
    }
  })

  return data
}

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}
