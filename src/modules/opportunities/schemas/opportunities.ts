import { z } from 'zod'

export type OpportunitiesFormValues = z.infer<typeof opportunitiesFormSchema>
export type OpportunitiesFilterSchema = z.infer<
  typeof opportunitiesFilterSchema
>

export const opportunitiesFormSchema = z.object({
  title: z.string().min(2, {
    message: 'A título precisa conter pelo menos 2 caracteres!'
  }),
  description: z.string().min(10, {
    message: 'A descrição precisa conter pelo menos 10 caracteres!'
  }),
  price: z.coerce.number().min(1, {
    message: 'O preço é obrigátorio!'
  }),
  status: z.string().min(1, {
    message: 'O status deve ser obrigátorio!'
  }),
  customerId: z.string().min(2, {
    message: 'A cliente deve ser obrigátorio!'
  })
})

export const opportunitiesFilterSchema = z.object({
  title: z.string().optional(),
  status: z.string().optional(),
  customer: z.string().optional()
})
