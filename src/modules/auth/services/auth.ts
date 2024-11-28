import api from '@/lib/axios'
import { AuthResponse, UserLoginProps } from '../types/auth'

export const userLogin = async ({ email, password }: UserLoginProps) => {
  const response = await api.post<AuthResponse>('/auth/login', {
    email,
    password
  })
  return response.data
}
