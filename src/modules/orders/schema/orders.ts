import { z } from 'zod'

export type OrdersFormValues = z.infer<typeof ordersFormSchema>
export type OrdersFilterSchema = z.infer<typeof ordersFilterSchema>

export const ordersFormSchema = z.object({
  title: z.string().min(2, {
    message: 'A título precisa conter pelo menos 2 caracteres!'
  }),
  notes: z.string().min(10, {
    message: 'A descrição precisa conter pelo menos 10 caracteres!'
  }),
  payment: z.string().min(1, {
    message: 'O tipo pagamento é obrigátorio!'
  }),
  status: z.string().min(1, {
    message: 'O status deve ser obrigátorio!'
  }),
  address: z.string().min(5, {
    message: 'O endereço precisa conter pelo menos 5 caracteres!'
  }),
  userId: z.string().min(2, {
    message: 'O usuário deve ser obrigátorio!'
  }),
  customerId: z.string().min(2, {
    message: 'A cliente deve ser obrigátorio!'
  })
})

export const ordersFilterSchema = z.object({
  status: z.string().optional(),
  user: z.string().optional(),
  customer: z.string().optional()
})
