import api from '@/lib/axios'

import {
  GetOpportunitiesQuery,
  GetOpportunitiesResponse,
  Opportunities
} from '../types/opportunities'

export const getOpportunities = async (param: GetOpportunitiesQuery = {}) => {
  const { title, status, customer, page, limit, total } = param

  const {
    data: { data, meta }
  } = await api.get<GetOpportunitiesResponse>('/opportunities', {
    params: {
      title,
      status,
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

export const addOpportunities = async (opportunity: Opportunities) => {
  const response = await api.post('/opportunities', opportunity)
  return response.data
}

export const getOpportunityById = async (id: string) => {
  const response = await api.get(`/opportunities/${id}`)
  return response.data
}

export const updateOpportunity = async (
  id: string,
  opportunity: Opportunities
) => {
  const response = await api.put(`/opportunities/${id}`, opportunity)
  return response.data
}

export const deleteOpportunity = async (id: string) => {
  await api.delete(`/opportunities/${id}`)
}
