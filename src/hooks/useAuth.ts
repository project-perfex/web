import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'

import { userLogin } from '@/modules/auth/services/auth'
import { AuthFormValues } from '@/modules/auth/schemas/auth'
import { UserData } from '@/modules/auth/types/auth'

export const useAuth = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_SECRET as string)
    if (token) {
      const decodedToken: UserData = jwtDecode(token)
      setUserData(decodedToken)
      if (pathname === '/') {
        router.push('/dashboard')
      }
    }
  }, [router, pathname])

  const login = async (data: AuthFormValues) => {
    try {
      setLoading(true)
      const response = await userLogin(data)
      Cookies.set(
        process.env.NEXT_PUBLIC_COOKIE_SECRET as string,
        response.data.token
      )
      const decodedToken: UserData = jwtDecode(response.data.token)
      setUserData(decodedToken)
      router.push('/users')
    } catch (error) {
      toast.error('Usuário ou senha inválidos')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { userData, loading, login }
}
