'use client'

import { useEffect, useState } from 'react'

import { CustomerForm } from './components/user-form'

import { getCustomerById } from '@/modules/customers/services/customer'
import { Customers } from '@/modules/customers/types/customer'

interface CustomerIdPageProps {
  params: {
    customerId: string
  }
}

const CustomerIdPage = ({ params }: CustomerIdPageProps) => {
  const [user, setUser] = useState<Customers | null>(null)

  useEffect(() => {
    const fetchCustomer = async () => {
      const data = await getCustomerById(params.customerId)
      setUser(data)
    }

    fetchCustomer()
  }, [params.customerId])

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomerForm initialData={user} />
      </div>
    </div>
  )
}

export default CustomerIdPage
