'use client'

import { useEffect, useState } from 'react'

import { Orders } from '@/modules/orders/types/orders'

import { getOrderById } from '@/modules/orders/services/orders'

import { OrderDetails } from './components/order-details'

interface OrderIdPageProps {
  params: {
    orderDetailsId: string
  }
}

const OrderDetailsIdPage = ({ params }: OrderIdPageProps) => {
  const [order, setOrder] = useState<Orders | null>(null)

  useEffect(() => {
    const fetchOrderDetailsId = async () => {
      const data = await getOrderById(params.orderDetailsId)
      setOrder(data)
    }

    fetchOrderDetailsId()
  }, [params.orderDetailsId])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderDetails order={order} />
      </div>
    </div>
  )
}

export default OrderDetailsIdPage
