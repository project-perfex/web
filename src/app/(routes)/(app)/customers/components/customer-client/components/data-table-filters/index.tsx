import { useSearchParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Search, X } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import {
  CustomerFilterSchema,
  customerFilterSchema
} from '@/modules/customers/schemas/customer'
import { Customers } from '@/modules/customers/types/customer'
import { getCustomers } from '@/modules/customers/services/customer'

interface FiltersProps {
  setData: (data: Customers[]) => void
}

export const Filters = ({ setData }: FiltersProps) => {
  const searchParams = useSearchParams()

  const name = searchParams.get('name')
  const email = searchParams.get('email')

  const { register, handleSubmit, reset } = useForm<CustomerFilterSchema>({
    resolver: zodResolver(customerFilterSchema),
    defaultValues: {
      name: name ?? '',
      email: email ?? ''
    }
  })

  const handleFilter = async ({ name, email }: CustomerFilterSchema) => {
    const params = new URLSearchParams(searchParams.toString())

    if (name) {
      params.set('name', name)
    } else {
      params.delete('name')
    }

    if (email) {
      params.set('email', email)
    } else {
      params.delete('email')
    }

    params.set('page', '1')

    window.history.replaceState(null, '', `?${params.toString()}`)

    const response = await getCustomers({
      page: 1,
      limit: 10,
      name: name ?? undefined,
      email: email ?? undefined
    })
    setData(response.data)
  }

  const handleClearFilter = async () => {
    reset({
      name: '',
      email: ''
    })
    window.history.replaceState(null, '', window.location.pathname)
    const response = await getCustomers({
      page: 1,
      limit: 10
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
        <Input placeholder="Nome" {...register('name')} />
        <Input placeholder="E-mail" {...register('email')} />

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
