import { Box } from '@mui/system'
import { object } from 'prop-types'
import { Pie } from 'react-chartjs-2'

const PieChart = ({ chartProps = {}, chartWrapperProps = {} }) => (
  <Box {...chartWrapperProps}>
    <Pie data={chartProps.data} />
  </Box>
)

PieChart.propTypes = {
  chartProps: object,
  chartWrapperProps: object
}
export default PieChart
