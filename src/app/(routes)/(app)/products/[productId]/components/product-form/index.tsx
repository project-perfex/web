'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'

import toast from 'react-hot-toast'

import { zodResolver } from '@hookform/resolvers/zod'

import { Edit, PlusCircle, XCircle } from 'lucide-react'

import { AxiosError } from 'axios'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Heading } from '@/components/heading'

import { Products } from '@/modules/products/types/product'
import {
  productFormSchema,
  ProductFormValues
} from '@/modules/products/schemas/product'
import { addProduct, updateProduct } from '@/modules/products/services/product'
import { getCategories } from '@/modules/categories/services/category'
import { Categories } from '@/modules/categories/types/category'

interface ProductFormProps {
  initialData: Products | null
}

export const ProductForm = ({ initialData }: ProductFormProps) => {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Categories[]>([])

  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Editar produto' : 'Novo produto'
  const description = initialData ? 'Editar produto' : 'Adicionar produto'
  const toastMessage = initialData
    ? 'Produto atualizada com sucesso!'
    : 'Produto adicionada com sucesso!'
  const action = initialData ? 'Editar' : 'Salvar'

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      categoryId: ''
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

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        categoryId: initialData.category?.title || ''
      })
    }
  }, [initialData, form])

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await updateProduct(`${params.productId}`, data)
      } else {
        await addProduct(data)
      }
      router.refresh()
      router.push(`/products`)
      toast.success(toastMessage)
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.data
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Houve um erro ao atualizar!')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o título"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o preço"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma categoria" />
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
          </div>
          <div className="md:grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Digite a descrição"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex">
            <Button
              type="submit"
              size="sm"
              disabled={loading}
              className="ml-auto"
            >
              {initialData ? (
                <Edit className="size-4" />
              ) : (
                <PlusCircle className="size-4" />
              )}
              {action}
            </Button>
            <Button
              size="sm"
              type="button"
              variant="destructive"
              disabled={loading}
              className="ml-2"
              onClick={() => router.push(`/products`)}
            >
              <XCircle className="size-4" />
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
    </>
  )
}
