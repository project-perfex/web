'use client'

import { Suspense } from 'react'

import { ProductsClient } from './components/products-client'

const ProductsPage = () => {
  return (
    <div className="flex-col">
      <Suspense>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductsClient />
        </div>
      </Suspense>
    </div>
  )
}

export default ProductsPage
