import { Button as ButtonBase } from '@mui/material'

export function Button({children, ...rest}) {
  return <ButtonBase {...rest}>{children}</ButtonBase>
}
//interface Client {
//	name: string;
//	yearsOld: number;
//	cpf: string;
//	email: string;
//	phoneNumber: number
//}
//
//interface Product {
//	name: string;
//	category: string;
//	qty: number;
//	description: string;
//	value: number
//}
//
//interface Order {
//	clientId: string;
//	products: Product[];
//	total: number;
//	paymentMethod: string
//}
