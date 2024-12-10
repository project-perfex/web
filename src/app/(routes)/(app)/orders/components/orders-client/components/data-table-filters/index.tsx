import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

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

import { Orders } from '@/modules/orders/types/orders'
import {
  OrdersFilterSchema,
  ordersFilterSchema
} from '@/modules/orders/schema/orders'
import { getOrders } from '@/modules/orders/services/orders'
import { OrderStatus } from '@/enums'

interface FiltersProps {
  setData: (data: Orders[]) => void
}

export const Filters = ({ setData }: FiltersProps) => {
  const searchParams = useSearchParams()
  const [orders, setOrders] = useState<Orders[]>([])

  const status = searchParams.get('status')
  const user = searchParams.get('user')
  const customer = searchParams.get('customer')

  const form = useForm<OrdersFilterSchema>({
    resolver: zodResolver(ordersFilterSchema),
    defaultValues: {
      status: status ?? '',
      user: user ?? '',
      customer: customer ?? ''
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

  const handleFilter = async ({
    status,
    user,
    customer
  }: OrdersFilterSchema) => {
    const params = new URLSearchParams(searchParams.toString())

    if (status) {
      params.set('status', status)
    } else {
      params.delete('status')
    }

    if (user) {
      params.set('user', user)
    } else {
      params.delete('user')
    }

    if (customer) {
      params.set('customer', customer)
    } else {
      params.delete('customer')
    }

    params.set('page', '1')

    window.history.replaceState(null, '', `?${params.toString()}`)

    const response = await getOrders({
      page: 1,
      limit: 10,
      status: status ?? undefined,
      user: user ?? undefined,
      customer: customer ?? undefined
    })
    setData(response.data)
  }

  const handleClearFilter = async () => {
    form.reset({
      status: '',
      user: '',
      customer: ''
    })
    window.history.replaceState(null, '', window.location.pathname)
    const response = await getOrders({
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
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
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
              name="user"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Usuário" />
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
              name="customer"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Clientes" />
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
