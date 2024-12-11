import { z } from 'zod'

export type OrderProductFormValues = z.infer<typeof orderProductFormSchema>
export type OrderProductFilterSchema = z.infer<typeof orderProductFilterSchema>

export const orderProductFormSchema = z.object({
  orderId: z.string().min(1, {
    message: 'O pedido ID deve ser obrigátorio!!'
  }),
  productId: z.string().min(10, {
    message: 'O produto ID id deve ser obrigátorio!!'
  }),
  quantity: z.coerce.number().min(1, {
    message: 'A quantidade é obrigátorio!'
  }),
  total: z.coerce.number().min(1, {
    message: 'O total é obrigátorio!'
  })
})

export const orderProductFilterSchema = z.object({
  order: z.string().optional(),
  product: z.string().optional()
})
