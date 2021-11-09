import { Box } from '@mui/system'
import { useSelector } from 'react-redux'
import PieChart from '../../shared/charts/Pie/components'
import { getCurrentDataset, getGovernanceTokenState } from './reducer'

const GovernanceStats = ({
  items = [],

  customProps = {
    sx: {
      boxShadow: 3
    }
  }
}) => {
  const state = useSelector(x => x.governanceTokenDataState)
  console.log({state})
  return <PieChart chartProps={{data: state.currentDataSet}} {...customProps} />
}
export default GovernanceStats
