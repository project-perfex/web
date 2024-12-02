'use client'

import { useEffect, useState } from 'react'

import { Categories } from '@/modules/categories/types/category'
import { getCategoryById } from '@/modules/categories/services/category'

import { CategoryForm } from './components/category-form'

interface CategoryIdPageProps {
  params: {
    categoryId: string
  }
}

const CategoryIdPage = ({ params }: CategoryIdPageProps) => {
  const [category, setCategory] = useState<Categories | null>(null)

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoryById(params.categoryId)
      setCategory(data)
    }

    fetchCategory()
  }, [params.categoryId])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  )
}

export default CategoryIdPage
