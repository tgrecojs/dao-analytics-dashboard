import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import SelectBox from '../../shared/MUI/SelectBox'
import { setter } from '../../shared/utils/input'
import {
  getContractAddress,
  setContractAddress,
  getMainnetOptions,
  setNetworkSelected
} from './reducer'

const ClassAForm = () => {
  const contractAddress = useSelector((x) =>
    getContractAddress(x.classAFormState)
  )
  const mainnetOptions = useSelector((x) => x.classAFormState.mainnetOptions)

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
            {mainnetOptions &&
              mainnetOptions.map(({ chain_id, name }) => (
                <SelectBox key={chain_id} value={chain_id} label={name} />
              ))}
          </select>
        </div>
      </div>
    </>
  )
}
export default ClassAForm
