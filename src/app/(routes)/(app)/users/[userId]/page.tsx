'use client'

import { useEffect, useState } from 'react'

import { getUserById } from '@/modules/users/services/users'

import { UserForm } from './components/user-form'

import { Users } from '@/modules/users/types/users'

interface UserIdPageProps {
  params: {
    userId: string
  }
}

const UserIdPage = ({ params }: UserIdPageProps) => {
  const [user, setUser] = useState<Users | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(params.userId)
      setUser(data)
    }

    fetchUser()
  }, [params.userId])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserForm initialData={user} />
      </div>
    </div>
  )
}

export default UserIdPage
