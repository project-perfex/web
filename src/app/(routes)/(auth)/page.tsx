'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'

import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { Heading } from '@/components/heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { userLogin } from '@/modules/auth/services/auth'
import { authFormSchema, AuthFormValues } from '@/modules/auth/schemas/auth'

const AuthPage = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<{
    name: string
    role: string
  } | null>(null)

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_SECRET as string)

    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  const onSubmit = async (data: AuthFormValues) => {
    try {
      setLoading(true)
      const response = await userLogin(data)
      Cookies.set(
        process.env.NEXT_PUBLIC_COOKIE_SECRET as string,
        response.data.token
      )
      const decodedToken: { name: string; role: string } = jwtDecode(
        response.data.token
      )
      setUserData(decodedToken)
      router.push('/users')
    } catch (error) {
      toast.error('Usuário ou senha inválidos')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="min-w-[700px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              <Heading
                title="Login"
                description="Realize seu login para acessar o sistema."
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userData && (
              <div>
                <p>Name: {userData.name}</p>
                <p>Role: {userData.role}</p>
              </div>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
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
                <Button
                  type="submit"
                  size="sm"
                  disabled={loading}
                  className="w-full"
                >
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuthPage
