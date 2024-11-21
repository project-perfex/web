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

import { formSchema, UserFormValues } from '@/modules/users/schemas/user'

import { Users } from '@/modules/users/types/users'

import api from '@/lib/axios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface UserFormProps {
  initialData: Users | null
}

export const UserForm = ({ initialData }: UserFormProps) => {
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Editar usuário' : 'Novo usuário'
  const description = initialData ? 'Editar usuário' : 'Adicionar usuário'
  const toastMessage = initialData
    ? 'Usuário atualizada com sucesso!'
    : 'Usuário adicionada com sucesso!'
  const action = initialData ? 'Editar' : 'Salvar'

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      phone: '',
      role: 'USER'
    }
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    }
  }, [initialData, form])

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await api.put(`/users/${params.userId}`, data)
      } else {
        await api.post(`/users`, data)
      }
      router.refresh()
      router.push(`/users`)
      toast.success(toastMessage)
    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao atualizar!')
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite o telefone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Digite a senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field: { name, onChange, value, disabled } }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    defaultValue=""
                    name={name}
                    onValueChange={onChange}
                    value={value}
                    disabled={disabled}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="USER">Usuário</SelectItem>
                    </SelectContent>
                  </Select>
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
            {initialData && (
              <Button
                size="sm"
                type="button"
                variant="destructive"
                disabled={loading}
                className="ml-2"
                onClick={() => router.push(`/users`)}
              >
                <XCircle className="size-4" />
                Cancelar
              </Button>
            )}
          </div>
        </form>
      </Form>
      <Separator />
    </>
  )
}
