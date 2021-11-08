import { string } from 'prop-types'
const SelectBox = ({ label = 'Default Label', value = 'Default Value' }) => (
  <option value={value}>{label}</option>
)

SelectBox.propTypes = {
  label: string,
  value: string
}

export default SelectBox
