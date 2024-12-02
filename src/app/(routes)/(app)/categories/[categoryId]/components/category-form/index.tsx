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
import { Heading } from '@/components/heading'

import { Categories } from '@/modules/categories/types/category'
import {
  categoryFormSchema,
  CategoryFormValues
} from '@/modules/categories/schemas/category'
import {
  addCategory,
  updateCategory
} from '@/modules/categories/services/category'

interface CategoryFormProps {
  initialData: Categories | null
}

export const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Editar categoria' : 'Nova categoria'
  const description = initialData ? 'Editar categoria' : 'Adicionar categoria'
  const toastMessage = initialData
    ? 'Categoria atualizada com sucesso!'
    : 'Categoria adicionada com sucesso!'
  const action = initialData ? 'Editar' : 'Salvar'

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: ''
    }
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    }
  }, [initialData, form])

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await updateCategory(`${params.categoryId}`, data)
      } else {
        await addCategory(data)
      }
      router.refresh()
      router.push(`/categories`)
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
          <div className="w-full">
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
              onClick={() => router.push(`/users`)}
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
