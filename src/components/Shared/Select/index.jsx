import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import SelectBase from '@mui/material/Select'

export function Select({ items = [], label, register = () => ({}), error,  ...rest }) {
  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <SelectBase
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        {...rest}
        {...register(rest.name)}
      >
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))}
      </SelectBase>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  )
}
