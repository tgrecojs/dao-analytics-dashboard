import {
  connectToMetamask,
  getConnectionStatus,
  getWalletAddress,
  getIsMetamaskInstalled
} from './reducer'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'ramda'
import CreateNFTForm from '../CreateNewNFT/component'
import ExistingDAO from '../ExistingDAO/component'
import { getTxnStatus, sendTransaction } from '../CreateNewNFT/reducer'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material'
import { setIsExistingOrg } from '../ExistingDAO/reducer'
import { setter } from '../../shared/utils/input'
import SetupDashboard from '../SetupDashboard/component'
import { Box } from '@mui/system'

const HomeScreen = ({ userAddress, onSubmit, txnStatus, exisitingOrgUser }) => {
  return exisitingOrgUser ? (
    <ExistingDAO />
  ) : (
    <CreateNFTForm
      userAddress={userAddress}
      onSubmit={onSubmit}
      status={txnStatus}
    />
  )
}

const CreateNewDAO = ({ exisitingOrgUser = false, onChange, children }) => {
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
const Web3Authentication = () => {
  const dispatch = useDispatch()
  const onConnectToMetamask = compose(dispatch, connectToMetamask)
  const onToggleExisting = compose(dispatch, setIsExistingOrg)
  const isMetamaskInstalled = useSelector(getIsMetamaskInstalled)
  const exisitingOrgUser = useSelector((x) => x.existingOrgState.isExistingOrg)
  const dashboardSetupSteps = useSelector(
    (x) => x.userSessionState.dashboardSetupSteps
  )
  const walletAddress = useSelector(getWalletAddress)
  const txnStatus = useSelector(getTxnStatus)
  const onSendTxn = compose(dispatch, sendTransaction)
  return !isMetamaskInstalled ? (
    <div>
      <p>Please make sure the metamask extension is installed and try again.</p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  ) : walletAddress.length === 0 ? (
    <div>
      <button onClick={onConnectToMetamask}>Sign In withMetamask</button>
    </div>
  ) : (
    <>
      <h2>Connected to wallet: {walletAddress}</h2>
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
          <CreateNewDAO
            exisitingOrgUser={exisitingOrgUser}
            onChange={onToggleExisting}
          >
            <HomeScreen
              exisitingOrgUser={exisitingOrgUser}
              status={exisitingOrgUser}
              userAddress={walletAddress}
              onSubmit={onSendTxn}
            />
          </CreateNewDAO>
        </Box>
      </Box>
      `
    </>
  )
}

export default Web3Authentication
