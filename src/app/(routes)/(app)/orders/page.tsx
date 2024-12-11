'use client'

import { Suspense } from 'react'
import { OrdersClient } from './components/orders-client'

const Orders = () => {
  return (
    <div className="flex-col">
      <Suspense>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <OrdersClient />
        </div>
      </Suspense>
    </div>
  )
}

export default Orders
