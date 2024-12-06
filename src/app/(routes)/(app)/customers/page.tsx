'use client'

import { Suspense } from 'react'
import { CustomersClient } from './components/customer-client'

const UsersPage = () => {
  return (
    <div className="flex-col">
      <Suspense>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CustomersClient />
        </div>
      </Suspense>
    </div>
  )
}

export default UsersPage
