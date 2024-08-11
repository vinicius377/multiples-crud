import { z } from 'zod'

export const clientValidation = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(2, 'Deve ter no minimo 2 caracteres')
    .max(100, 'Deve ter no máximo 100 caracteres'),
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email('Deve ser um e-mail válido'),
  yearsOld: z.preprocess(
    val => Number(val),
    z.number({
      invalid_type_error: 'Deve ser só números',
      required_error: 'Idade é obrigatório'
    })
  ),
  phoneNumber: z.number({
    invalid_type_error: 'Deve ser só números',
    required_error: 'Número é obrigatório'
  }),
  cpf: z.preprocess(
    val => val?.trim(),
    z
      .number({
        invalid_type_error: 'Deve ser só números',
        required_error: 'CPF é obrigatório'
      })
      .min(11, 'Deve ter só 11 caracteres')
      .max(11, 'Deve ter só 11 caracteres')
  )
})
