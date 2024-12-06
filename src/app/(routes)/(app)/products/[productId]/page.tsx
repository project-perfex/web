'use client'

import { useEffect, useState } from 'react'

import { Products } from '@/modules/products/types/product'
import { getProductById } from '@/modules/products/services/product'

import { ProductForm } from './components/product-form'

interface ProductIdPageProps {
  params: {
    productId: string
  }
}

const ProductIdPage = ({ params }: ProductIdPageProps) => {
  const [product, setProduct] = useState<Products | null>(null)

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getProductById(params.productId)
      setProduct(data)
    }

    fetchCategory()
  }, [params.productId])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm initialData={product} />
      </div>
    </div>
  )
}

export default ProductIdPage
