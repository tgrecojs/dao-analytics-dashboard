import { connectToMetamask, getIsMetamaskInstalled } from './reducer'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'ramda'
import CreateNFTForm from '../CreateNewDAO/component'
import ExistingDAO from '../ExistingDAO/component'
import { setupDaoAnalyticsPage } from '../CreateNewDAO/reducer'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { setIsExistingOrg } from '../ExistingDAO/reducer'
import { setter } from '../../shared/utils/input'
import { Box } from '@mui/system'
import SubmitButton from '../../shared/MUI/SubmitButton'

// eslint-disable-next-line react/prop-types
const HomeScreen = ({ userAddress, onSubmit, txnStatus, exisitingOrgUser }) => {
  return exisitingOrgUser ? (
    <ExistingDAO />
  ) : (
    <CreateNFTForm
      userAddress={userAddress}
      onSubmit={onSubmit}
      name={txnStatus}
    />
  )
}

// eslint-disable-next-line react/prop-types
const Container = ({ onChange, children }) => {
  return (
    <Box sx={{ p: 2, bgcolor: '#fff' }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">UI Selection</FormLabel>
        <RadioGroup
          aria-label="isExistingOrg"
          defaultValue={false}
          name="radio-buttons-group"
          onChange={setter(onChange)}
        >
          <FormControlLabel
            value={false}
            control={<Radio />}
            label="New DAO Setup"
          />

          <FormControlLabel
            value={true}
            control={<Radio />}
            label="View Existing Dashboard"
          />
        </RadioGroup>
      </FormControl>
      {children}
    </Box>
  )
}

const MetamaskAuth = () => {
  const dispatch = useDispatch()
  const onConnectToMetamask = compose(dispatch, connectToMetamask)
  const onToggleExisting = compose(dispatch, setIsExistingOrg)
  const isMetamaskInstalled = useSelector(getIsMetamaskInstalled)
  const exisitingOrgUser = useSelector((x) => x.existingOrgState.isExistingOrg)
  const userSessionState = useSelector(x => x.userSessionState)
  const onSetupDao = compose(dispatch, setupDaoAnalyticsPage)

  const metamaskState = useSelector((x) => x.metamaskProviderState)
  return !isMetamaskInstalled ? (
    <div>
      <p>Please make sure the metamask extension is installed and try again.</p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  ) : metamaskState.status === 'disconnected' ||
    userSessionState.walletAddress.length !== 1 ? (
    <Box>
      <SubmitButton
        onClick={onConnectToMetamask}
        buttonText="Sign In withMetamask"
      />
    </Box>
  ) : (
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
      <Box
        sx={{
          typography: 'h2',

          textAlign: 'center'
        }}
      >
        DAO Analytics Dashboard
      </Box>
      <Box sx={{ p: 2, bgcolor: '#fff' }}>
        <Container
          exisitingOrgUser={exisitingOrgUser}
          onChange={onToggleExisting}
        >
          <HomeScreen
            exisitingOrgUser={exisitingOrgUser}
            status={exisitingOrgUser}
            userAddress={metamaskState.payload}
            onSubmit={onSetupDao}
          />
        </Container>
      </Box>
    </Box>
  )
}

export default MetamaskAuth
