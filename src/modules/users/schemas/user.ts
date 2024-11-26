import { z } from 'zod'

export type UserFormValues = z.infer<typeof formSchema>
export type UserFilterSchema = z.infer<typeof userFilterSchema>

export const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Campo obrigatório!'
    })
    .email(),
  password: z.string().min(6, {
    message: 'A senha precisa conter pelo menos 6 caracteres!'
  }),
  name: z.string().min(2, {
    message: 'A nome precisa conter pelo menos 2 caracteres!'
  }),
  phone: z
    .string()
    .min(11, {
      message: 'A telefone precisa conter pelo menos 11 caracteres!'
    })
    .refine(
      (value) => {
        if (value) {
          const phone = value.replace(/\D/g, '')
          return phone.length >= 11
        }
        return true
      },
      {
        message: 'Telefone inválido!'
      }
    ),
  role: z.string().min(2, {
    message: 'A nome precisa conter pelo menos 2 caracteres!'
  })
})

export const userFilterSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.string().optional()
})
