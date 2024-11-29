'use client'

import { UsersClient } from './components/user-client'

import useAuthToken from '@/hooks/useAuthToken'

const UsersPage = () => {
  useAuthToken()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient />
      </div>
    </div>
  )
}

export default UsersPage
