export const money = {
  apply: (value) => Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency'}).format(value)
}
