import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Search, X } from 'lucide-react'

import { Input } from '@/components/ui/input'

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
import { Opportunities } from '@/modules/opportunities/types/opportunities'
import {
  opportunitiesFilterSchema,
  OpportunitiesFilterSchema
} from '@/modules/opportunities/schemas/opportunities'
import { getOpportunities } from '@/modules/opportunities/services/opportunities'

import { OpportunityStatus } from '@/enums'

interface FiltersProps {
  setData: (data: Opportunities[]) => void
}

export const Filters = ({ setData }: FiltersProps) => {
  const searchParams = useSearchParams()
  const [opportunities, setOpportunities] = useState<Opportunities[]>([])

  const title = searchParams.get('title')
  const status = searchParams.get('status')
  const customer = searchParams.get('customer')

  const form = useForm<OpportunitiesFilterSchema>({
    resolver: zodResolver(opportunitiesFilterSchema),
    defaultValues: {
      title: title ?? '',
      status: status ?? '',
      customer: customer ?? ''
    }
  })

  useEffect(() => {
    const fetchOpportunities = async () => {
      const response = await getOpportunities({
        limit: 100
      })
      setOpportunities(response.data)
    }

    fetchOpportunities()
  }, [])

  const handleFilter = async ({
    title,
    status,
    customer
  }: OpportunitiesFilterSchema) => {
    const params = new URLSearchParams(searchParams.toString())

    if (title) {
      params.set('title', title)
    } else {
      params.delete('title')
    }

    if (status) {
      params.set('status', status)
    } else {
      params.delete('status')
    }

    if (customer) {
      params.set('customer', customer)
    } else {
      params.delete('customer')
    }

    params.set('page', '1')

    window.history.replaceState(null, '', `?${params.toString()}`)

    const response = await getOpportunities({
      page: 1,
      limit: 10,
      title: title ?? undefined,
      status: status ?? undefined,
      customer: customer ?? undefined
    })
    setData(response.data)
  }

  const handleClearFilter = async () => {
    form.reset({
      title: '',
      status: '',
      customer: ''
    })
    window.history.replaceState(null, '', window.location.pathname)
    const response = await getOpportunities({
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
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Título" {...field} />
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
                          new Set(
                            opportunities.map(
                              (opportunity) => opportunity.customer
                            )
                          )
                        ).map((opportunity) => (
                          <SelectItem
                            key={opportunity?.id}
                            value={String(opportunity?.id)}
                          >
                            {opportunity?.name}
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
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={OpportunityStatus.OPEN}>
                          Aberto
                        </SelectItem>
                        <SelectItem value={OpportunityStatus.INPROGRESS}>
                          Em progresso
                        </SelectItem>
                        <SelectItem value={OpportunityStatus.ONHOLD}>
                          Em analise
                        </SelectItem>
                        <SelectItem value={OpportunityStatus.CLOSED}>
                          Fechado
                        </SelectItem>
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
