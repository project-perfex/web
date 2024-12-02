'use client'

import { useRouter } from 'next/navigation'

import Cookies from 'js-cookie'

import { LogOut } from 'lucide-react'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

import { useAuth } from '@/hooks/useAuth'

export const Header = () => {
  const router = useRouter()
  const { userData } = useAuth()

  const handleLogout = () => {
    const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_SECRET as string)

    if (token) {
      Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_SECRET as string)
      router.push('/')
    }
  }

  return (
    <div className="flex items-center justify-end w-full gap-4 bg-white p-4">
      <div className="flex items-center gap-1 uppercase text-xs font-bold">
        Olá,{' '}
        {userData ? (
          <span className="text-violet-500 font-extrabold">
            {userData.name}
          </span>
        ) : (
          <Skeleton className="w-20 h-4" />
        )}{' '}
        bem vindo! <span className="text-lg">👋</span>
      </div>
      <div>
        <Button size="icon" onClick={handleLogout}>
          <LogOut className="size-4" />
        </Button>
      </div>
    </div>
  )
}
