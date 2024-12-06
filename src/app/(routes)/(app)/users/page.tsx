'use client'

import { Suspense } from 'react'
import { UsersClient } from './components/user-client'

const UsersPage = () => {
  return (
    <div className="flex-col">
      <Suspense>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <UsersClient />
        </div>
      </Suspense>
    </div>
  )
}

export default UsersPage
