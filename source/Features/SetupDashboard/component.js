import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

const SetupDashboard = ({steps = []}) => {
  
  return (
    <Box>
      <Stepper activeStep={steps.filter(x => x.active)[0]}>
        {steps.map((x) => (
          <Step key={`${x.label}`} {...x}>
            <StepLabel>{x.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
export default SetupDashboard