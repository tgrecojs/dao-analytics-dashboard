import { Select } from '@mui/material'
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
  const {networkSelected, mainnetOptions} = useSelector(x => x.classADataState)


  const dispatch = useDispatch()
  const onChangeAddress = compose(dispatch, setContractAddress)
  const onNetworkChange = compose(dispatch, setNetworkSelected)

  return (
    <SelectBox label="Select Blockchain" value={networkSelected} onChange={setter(onNetworkChange)} 
    options={mainnetOptions} />
  )
}
export default ClassAForm
