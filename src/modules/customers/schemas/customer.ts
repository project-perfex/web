import { z } from 'zod'

export type CustomerFormValues = z.infer<typeof customerFormSchema>
export type CustomerFilterSchema = z.infer<typeof customerFilterSchema>

export const customerFormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Campo obrigatório!'
    })
    .email(),
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
  address: z.string().min(2, {
    message: 'O endereço precisa conter pelo menos 5 caracteres!'
  })
})

export const customerFilterSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional()
})
