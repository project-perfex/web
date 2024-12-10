'use client'

import { useEffect, useState } from 'react'

import { Orders } from '@/modules/orders/types/orders'

import { getOrderById } from '@/modules/orders/services/orders'

import { OrderForm } from './components/order-form'

interface OrderIdPageProps {
  params: {
    orderId: string
  }
}

const OrderIdPage = ({ params }: OrderIdPageProps) => {
  const [order, setOrder] = useState<Orders | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrderById(params.orderId)
      setOrder(data)
    }

    fetchOrder()
  }, [params.orderId])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm initialData={order} />
      </div>
    </div>
  )
}

export default OrderIdPage
