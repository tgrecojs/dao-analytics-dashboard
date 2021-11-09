import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import SelectBox from '../../shared/MUI/SelectBox'
import { setter } from '../../shared/utils/input'
import { setNetworkSelected } from './reducer'

const ClassAForm = () => {
  const { networkSelected, mainnetOptions } = useSelector(
    (x) => x.classADataState
  )

  const dispatch = useDispatch()
  const onNetworkChange = compose(dispatch, setNetworkSelected)

  return (
    <SelectBox
      label="Select Blockchain"
      value={networkSelected}
      onChange={setter(onNetworkChange)}
      options={mainnetOptions}
    />
  )
}
export default ClassAForm
