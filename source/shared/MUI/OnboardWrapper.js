import { Box } from '@mui/system'
import { func } from 'prop-types'

const OnboardWrapper = ({ children }) => (
  <Box
    sx={{
      width: 800,
      height: 700,
      bgcolor: 'primary.main',
      fontFamily: 'Roboto',
      p: 2,
      boxShadow: 3,
      minWidth: 350,
      margin: 'auto'
    }}
  >
    {children}
  </Box>
)

OnboardWrapper.propTypes = {
  children: func
}
export default OnboardWrapper
