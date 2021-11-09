import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

const RequestProgress = ({ color = 'secondary' }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color={color} />
    </Box>
  )
}

export default RequestProgress
