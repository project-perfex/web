'use client'

import { Suspense } from 'react'
import { OpportunitiesClient } from './components/opportunities-client'

const OpportunitiesPage = () => {
  return (
    <div className="flex-col">
      <Suspense>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <OpportunitiesClient />
        </div>
      </Suspense>
    </div>
  )
}

export default OpportunitiesPage
