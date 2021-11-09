import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { array, func, string } from 'prop-types'
const SelectBox = ({
  label = 'Default Label',
  value = 'Default Value',
  onChange,
  options = []
}) => (
  <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">{label}</InputLabel>
    <Select value={value} label={label} onChange={onChange}>
      {options.map((x) => (
        <MenuItem key={x.value} value={x.value}>
          {x.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

SelectBox.propTypes = {
  label: string,
  value: string,
  onChange: func,
  options: array
}

export default SelectBox
