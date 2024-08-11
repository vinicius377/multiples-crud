import { Button as ButtonBase } from '@mui/material'

export function Button({children, ...rest}) {
  return <ButtonBase variant="contained" {...rest}>{children}</ButtonBase>
}
