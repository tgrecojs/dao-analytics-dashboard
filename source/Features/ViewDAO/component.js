import { Box, Grid } from '@mui/system'
import { string, number } from 'prop-types'

const ViewDAO = ({
  daoName = 'default NFT name',
  governanceToken=''
}) => (
  <Box>
    <Grid item>
      <Box sx={{ typography: 'h2' }}>{daoName}</Box>
      <Box sx={{ typography: 'h2' }}>{governanceToken}</Box>
    </Grid>
    </Box>
)

ViewDAO.propTypes = {
  daoName: string,
  governanceToken: string
}

export default ViewDAO
