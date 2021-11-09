import dsm from 'redux-dsm'

const SETUP_DAO_ANALYTICS_PAGE = 'sending data'
const SEND_ERROR = 'send data error'
const SETUP_DAO_READY = 'setup dao ready'
const SEND_SUCCESS = 'send data success'

const createDAOAnalyticsPageStates = [
  'initial',
  SETUP_DAO_READY,
  [
    'setup dao analytics page',
    SETUP_DAO_ANALYTICS_PAGE,
    ['report error', SEND_ERROR, ['handle error', SETUP_DAO_READY]],
    ['report success', SEND_SUCCESS]
  ]
]

const getTxnState = ({ setupDAOAnalyticsState }) => setupDAOAnalyticsState
const getTxnStatus = (x) => getTxnState(x).status

const mintDSM = dsm({
  component: 'CreateNewDAO',
  description: 'setup covalent DAO analytics dashboard',
  actionStates: createDAOAnalyticsPageStates
})

const {
  actionCreators: {
    setupDaoAnalyticsPage,
    reportError,
    reportSuccess,
    handleError,
    mintToken,
    reportMintSuccess,
    reportMintError,
    handleMintError
  },
  reducer
} = mintDSM

export {
  getTxnState,
  getTxnStatus,
  setupDaoAnalyticsPage,
  reportError,
  reportMintError,
  reportSuccess,
  handleError,
  handleMintError,
  mintToken,
  reportMintSuccess,
  reducer,
  SETUP_DAO_ANALYTICS_PAGE,
  SEND_ERROR
}

export default mintDSM
