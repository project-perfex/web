import { z } from 'zod'

export type ProductFormValues = z.infer<typeof productFormSchema>
export type ProductFilterSchema = z.infer<typeof productFilterSchema>

export const productFormSchema = z.object({
  title: z.string().min(2, {
    message: 'A título precisa conter pelo menos 2 caracteres!'
  }),
  description: z.string().min(10, {
    message: 'A descrição precisa conter pelo menos 10 caracteres!'
  }),
  price: z.coerce.number().min(1, {
    message: 'O preço é obrigátorio!'
  }),
  categoryId: z.string().min(2, {
    message: 'A categoria deve ser obrigátorio!'
  })
})

export const productFilterSchema = z.object({
  title: z.string().optional(),
  category: z.string().optional()
})
