export interface UserLoginProps {
  email: string
  password: string
}

export interface AuthResponse {
  data: {
    name: string
    role: string
    token: string
  }
}
