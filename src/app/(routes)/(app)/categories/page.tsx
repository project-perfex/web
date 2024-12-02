'use client'

import { Suspense } from 'react'

import useAuthToken from '@/hooks/useAuthToken'
import { CategoriesClient } from './components/categories-client'

const CategoriesPage = () => {
  useAuthToken()

  return (
    <div className="flex-col">
      <Suspense>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoriesClient />
        </div>
      </Suspense>
    </div>
  )
}

export default CategoriesPage
