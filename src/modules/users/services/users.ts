import api from '@/lib/axios'

import { GetUsersQuery, GetUsersResponse } from '@/modules/users/types/users'

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

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`)
  return response.data
}
