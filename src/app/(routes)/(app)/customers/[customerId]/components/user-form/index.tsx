'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'

import toast from 'react-hot-toast'

import { zodResolver } from '@hookform/resolvers/zod'

import { Edit, PlusCircle, XCircle } from 'lucide-react'

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

import { AxiosError } from 'axios'

import { CustomInput } from '@/components/custom-input'
import { Customers } from '@/modules/customers/types/customer'
import {
  CustomerFormValues,
  customerFormSchema
} from '@/modules/customers/schemas/customer'
import {
  addCustomer,
  updateCustomer
} from '@/modules/customers/services/customer'

interface CustomerFormProps {
  initialData: Customers | null
}

export const CustomerForm = ({ initialData }: CustomerFormProps) => {
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Editar cliente' : 'Novo cliente'
  const description = initialData ? 'Editar cliente' : 'Adicionar cliente'
  const toastMessage = initialData
    ? 'Cliente atualizado com sucesso!'
    : 'Cliente adicionado com sucesso!'
  const action = initialData ? 'Editar' : 'Salvar'

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      address: ''
    }
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    }
  }, [initialData, form])

  const onSubmit = async (data: CustomerFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await updateCustomer(`${params.customerId}`, data)
      } else {
        await addCustomer(data)
      }
      router.refresh()
      router.push(`/customers`)
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
          <div className="md:grid grid-cols-5 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o e-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <CustomInput
                      type="tel"
                      disabled={loading}
                      placeholder="(XX) XXXXX-XXXX"
                      mask="(99) 99999-9999"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o endereço"
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
              onClick={() => router.push(`/customers`)}
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
