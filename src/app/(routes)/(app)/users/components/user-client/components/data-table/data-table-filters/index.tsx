import { useSearchParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Search, X } from 'lucide-react'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

import {
  userFilterSchema,
  UserFilterSchema
} from '@/modules/users/schemas/user'

import { Users } from '@/modules/users/types/users'
import { getUsers } from '@/modules/users/services/users'

interface FiltersProps {
  setData: (data: Users[]) => void
}

export const Filters = ({ setData }: FiltersProps) => {
  const searchParams = useSearchParams()

  const name = searchParams.get('name')
  const email = searchParams.get('email')

  const { register, handleSubmit, reset } = useForm<UserFilterSchema>({
    resolver: zodResolver(userFilterSchema),
    defaultValues: {
      name: name ?? '',
      email: email ?? ''
    }
  })

  const handleFilter = async ({ name, email }: UserFilterSchema) => {
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

    const response = await getUsers({
      page: 1,
      limit: 5,
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
    const response = await getUsers({
      page: 1,
      limit: 5
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
