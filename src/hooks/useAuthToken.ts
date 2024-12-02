import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const useAuthToken = () => {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_SECRET as string)
    if (!token) {
      router.push('/')
    } else {
      try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_SECRET as string)
          router.push('/')
        }
      } catch (error) {
        console.error('Invalid token:', error)
        Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_SECRET as string)
        router.push('/')
      }
    }
  }, [router])
}

export default useAuthToken
