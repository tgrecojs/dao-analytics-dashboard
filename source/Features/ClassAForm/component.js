import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import {
  getContractAddress,
  setContractAddress,
  getMainnetOptions,
  setNetworkSelected
} from './reducer'

const SelectBox = ({ label, value }) => <option value={value}>{label}</option>
const ClassAForm = () => {
  const setter = (fn) => (event) => {
    const {
      target: { value }
    } = event
    return fn(value)
  }

  const contractAddress = useSelector((x) =>
    getContractAddress(x.classAFormState)
  )
  const mainnetOptions = useSelector((x) =>
  x.classAFormState.mainnetOptions)

  const dispatch = useDispatch()
  const onChangeAddress = compose(dispatch, setContractAddress)
  const onNetworkChange = compose(dispatch, setNetworkSelected)

  return (
    <>
      <div>
        <input
          type="text"
          onChange={setter(onChangeAddress)}
          value={contractAddress}
        />
        <div>
          <label>Select Blockchain</label>
          <select onChange={setter(onNetworkChange)}>
            {mainnetOptions &&  mainnetOptions.map(({ chain_id, name }) => (
              <SelectBox key={chain_id} value={chain_id} label={name} />
            ))}
          </select>
        </div>
      </div>
    </>
  )
}
export default ClassAForm
