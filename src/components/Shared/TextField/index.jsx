import { TextField as TextFieldBase } from '@mui/material'
import styles from './styles.module.css'

export function TextField({ register = () => ({}), ...rest }) {
  return <TextFieldBase classes={{ root: styles.Textfield }} {...rest} {...register(rest.name)}/>
}
