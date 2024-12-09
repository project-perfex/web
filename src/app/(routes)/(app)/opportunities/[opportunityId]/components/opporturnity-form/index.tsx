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

import { Opportunities } from '@/modules/opportunities/types/opportunities'
import {
  opportunitiesFormSchema,
  OpportunitiesFormValues
} from '@/modules/opportunities/schemas/opportunities'
import {
  addOpportunities,
  getOpportunities,
  updateOpportunity
} from '@/modules/opportunities/services/opportunities'
import { OpportunityStatus } from '@/enums'

interface OpportunityFormProps {
  initialData: Opportunities | null
}

export const OpportunityForm = ({ initialData }: OpportunityFormProps) => {
  const [loading, setLoading] = useState(false)
  const [opportunities, setOpportunities] = useState<Opportunities[]>([])

  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Editar oportunidade' : 'Nova oportunidade'
  const description = initialData
    ? 'Editar oportunidade'
    : 'Adicionar oportunidade'
  const toastMessage = initialData
    ? 'Oportunidade atualizada com sucesso!'
    : 'Oroduto adicionada com sucesso!'
  const action = initialData ? 'Editar' : 'Salvar'

  const form = useForm<OpportunitiesFormValues>({
    resolver: zodResolver(opportunitiesFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      status: '',
      customerId: ''
    }
  })

  useEffect(() => {
    const fetchOpportunity = async () => {
      const response = await getOpportunities({
        limit: 100
      })
      setOpportunities(response.data)
    }

    fetchOpportunity()
  }, [])

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData
      })
    }
  }, [initialData, form])

  const onSubmit = async (data: OpportunitiesFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await updateOpportunity(`${params.opportunityId}`, data)
      } else {
        await addOpportunities(data)
      }
      router.refresh()
      router.push(`/opportunities`)
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
          <div className="md:grid grid-cols-4 gap-2">
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o preço"
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
                  <FormLabel>Status</FormLabel>
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
          </div>
          <div className="md:grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="description"
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
              onClick={() => router.push(`/opportunities`)}
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
