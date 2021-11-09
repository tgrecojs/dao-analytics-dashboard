import { Box } from '@mui/system'
import { object } from 'prop-types'
import { Pie } from 'react-chartjs-2'
import { createPieChart } from '../format'
import { chartColors  } from '../colors'

const getAddress = ({ address }) => address

const PieChart = ({ chartProps = {}, chartWrapperProps = {} }) => (
  <Box {...chartWrapperProps}>
    <Pie
      data={chartProps.data}
    />``
  </Box>
)

PieChart.propTypes = {
  data: object,
  chartWrapperProps: object
}
export default PieChart
