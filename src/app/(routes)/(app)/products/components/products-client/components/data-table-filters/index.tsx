import { useSearchParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Search, X } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

import { Products } from '@/modules/products/types/product'
import {
  productFilterSchema,
  ProductFilterSchema
} from '@/modules/products/schemas/product'
import { getProducts } from '@/modules/products/services/product'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { Categories } from '@/modules/categories/types/category'
import { getCategories } from '@/modules/categories/services/category'

interface FiltersProps {
  setData: (data: Products[]) => void
}

export const Filters = ({ setData }: FiltersProps) => {
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<Categories[]>([])

  const title = searchParams.get('title')
  const category = searchParams.get('category')

  const form = useForm<ProductFilterSchema>({
    resolver: zodResolver(productFilterSchema),
    defaultValues: {
      title: title ?? '',
      category: category ?? ''
    }
  })

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories({
        limit: 100
      })
      setCategories(response.data)
    }

    fetchCategories()
  }, [])

  const handleFilter = async ({ title, category }: ProductFilterSchema) => {
    const params = new URLSearchParams(searchParams.toString())

    if (title) {
      params.set('title', title)
    } else {
      params.delete('title')
    }

    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }

    params.set('page', '1')

    window.history.replaceState(null, '', `?${params.toString()}`)

    const response = await getProducts({
      page: 1,
      limit: 10,
      title: title ?? undefined,
      category: category ?? undefined
    })
    setData(response.data)
  }

  const handleClearFilter = async () => {
    form.reset({
      title: '',
      category: ''
    })
    window.history.replaceState(null, '', window.location.pathname)
    const response = await getProducts({
      page: 1,
      limit: 10
    })
    setData(response.data)
  }
  return (
    <>
      <p className="text-sm mb-4">Filtro de pesquisa</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFilter)} className="space-y-8">
          <div className="flex items-center w-full gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          new Set(categories.map((category) => category))
                        ).map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>
        </form>
      </Form>
    </>
  )
}
