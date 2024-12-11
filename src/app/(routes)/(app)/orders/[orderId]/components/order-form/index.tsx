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

import { Orders } from '@/modules/orders/types/orders'

import { OrderStatus } from '@/enums'
import {
  ordersFormSchema,
  OrdersFormValues
} from '@/modules/orders/schema/orders'
import {
  addOrder,
  getOrders,
  updateOrder
} from '@/modules/orders/services/orders'

interface OrderFormProps {
  initialData: Orders | null
}

export const OrderForm = ({ initialData }: OrderFormProps) => {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Orders[]>([])

  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Editar pedido' : 'Novo pedido'
  const description = initialData ? 'Editar pedido' : 'Adicionar pedido'
  const toastMessage = initialData
    ? 'Pedido atualizada com sucesso!'
    : 'Pedido adicionada com sucesso!'
  const action = initialData ? 'Editar' : 'Salvar'

  const form = useForm<OrdersFormValues>({
    resolver: zodResolver(ordersFormSchema),
    defaultValues: {
      title: '',
      notes: '',
      payment: '',
      address: '',
      status: '',
      userId: '',
      customerId: ''
    }
  })

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrders({
        limit: 100
      })
      setOrders(response.data)
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData
      })
    }
  }, [initialData, form])

  const onSubmit = async (data: OrdersFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await updateOrder(`${params.orderId}`, data)
      } else {
        await addOrder(data)
      }
      router.refresh()
      router.push(`/orders`)
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
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          new Set(orders.map((order) => order.customer))
                        ).map((order) => (
                          <SelectItem key={order?.id} value={String(order?.id)}>
                            {order?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(
                          new Set(orders.map((order) => order.user))
                        ).map((order) => (
                          <SelectItem key={order?.id} value={String(order?.id)}>
                            {order?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo pagamento</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o tipo de pagamento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={OrderStatus.PENDING}>
                          Pendente
                        </SelectItem>
                        <SelectItem value={OrderStatus.SHIPPED}>
                          Enviado
                        </SelectItem>
                        <SelectItem value={OrderStatus.DELIVERED}>
                          Entregue
                        </SelectItem>
                        <SelectItem value={OrderStatus.CANCELED}>
                          Cancelado
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                      placeholder="Digite a endereço"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="notes"
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
              onClick={() => router.push(`/orders`)}
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
