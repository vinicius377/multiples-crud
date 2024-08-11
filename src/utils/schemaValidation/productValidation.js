import { z } from 'zod'

export const productValidation = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(2, 'Mínimo de 2 caracteres'),
  description: z
    .string({ required_error: 'Descrição é obrigatório' })
    .min(2, 'Mínimo de 2 caracteres'),
  value: z.preprocess(
    val => Number(val),
    z.number({
      required_error: 'Valor é obrigatoŕio',
      invalid_type_error: 'Deve ter só números'
    })
  ),
  qty: z.preprocess(
    val => Number(val),
    z.number({
      required_error: 'Quantidade é obrigatoŕio',
      invalid_type_error: 'Deve ter só números'
    })
  ),
  category: z
    .string({ required_error: 'Categoria é obrigatório' })
    .min(2, 'Mínimo de 2 caracteres'),
})
