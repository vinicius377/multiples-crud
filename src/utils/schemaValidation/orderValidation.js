import { z } from 'zod'

export const orderValidation = z.object({
  products: z
    .object({
      name: z.string(),
      value: z.number(),
      id: z.string(),
      qty: z.preprocess(
        val => Number(val),
        z.number({ required_error: 'Obrigatório' })
      )
    })
    .array()
    .nonempty('Selecione um produto'),
  clientId: z.string().min(1, 'Obrigatório'),
  paymentMethod: z.string().min(1, 'Obrigatório')
})
