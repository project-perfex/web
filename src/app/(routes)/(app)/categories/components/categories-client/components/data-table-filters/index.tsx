import { useSearchParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Search, X } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

import {
  categoryFilterSchema,
  CategoryFilterSchema
} from '@/modules/categories/schemas/category'
import { getCategories } from '@/modules/categories/services/category'
import { Categories } from '@/modules/categories/types/category'

interface FiltersProps {
  setData: (data: Categories[]) => void
}

export const Filters = ({ setData }: FiltersProps) => {
  const searchParams = useSearchParams()

  const title = searchParams.get('title')

  const { register, handleSubmit, reset } = useForm<CategoryFilterSchema>({
    resolver: zodResolver(categoryFilterSchema),
    defaultValues: {
      title: title ?? ''
    }
  })

  const handleFilter = async ({ title }: CategoryFilterSchema) => {
    const params = new URLSearchParams(searchParams.toString())

    if (title) {
      params.set('title', title)
    } else {
      params.delete('title')
    }

    params.set('page', '1')

    window.history.replaceState(null, '', `?${params.toString()}`)

    const response = await getCategories({
      page: 1,
      limit: 5,
      title: title ?? undefined
    })
    setData(response.data)
  }

  const handleClearFilter = async () => {
    reset({
      title: ''
    })
    window.history.replaceState(null, '', window.location.pathname)
    const response = await getCategories({
      page: 1,
      limit: 5
    })
    setData(response.data)
  }
  return (
    <>
      <p className="text-sm mb-4">Filtro de pesquisa</p>
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex items-center justify-center gap-4"
      >
        <Input placeholder="Título" {...register('title')} />

        <Button type="submit" className="w-[100px] text-xs">
          <Search className="size-4" /> Buscar
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => handleClearFilter()}
          className="w-[100px] text-xs"
        >
          <X className="size-4" /> Remover
        </Button>
      </form>
    </>
  )
}
