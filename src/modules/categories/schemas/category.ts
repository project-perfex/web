import { z } from 'zod'

export type CategoryFormValues = z.infer<typeof categoryFormSchema>
export type CategoryFilterSchema = z.infer<typeof categoryFilterSchema>

export const categoryFormSchema = z.object({
  title: z.string().min(2, {
    message: 'A título precisa conter pelo menos 2 caracteres!'
  })
})

export const categoryFilterSchema = z.object({
  title: z.string().optional()
})
