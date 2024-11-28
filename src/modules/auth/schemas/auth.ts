import { z } from 'zod'

export type AuthFormValues = z.infer<typeof authFormSchema>

export const authFormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'O campo e-mail precisa ser preenchido!'
    })
    .email(),
  password: z.string().min(6, {
    message: 'A senha precisa conter pelo menos 6 caracteres!'
  })
})
