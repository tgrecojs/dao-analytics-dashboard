import dsm from 'redux-dsm'
import autodux from 'autodux'
const evaluateString = (str) => (str === 'true' ? true : false)
const {
  reducer: existingOrgReducer,
  selectors: { getContractAddress, getOrgName, getIsExistingOrg },
  actions: {
    setContractAddress,
    setOrgName,
    setIsExistingOrg,
    toggleForm,
    setIsValidDao,
    setGovernanceData,
    setTokenAmountFn,
    setGridInput
  }
} = autodux({
  slice: 'existing orginzation dashboard',
  initial: {
    orgName: '',
    contractAddress: '',
    isExistingOrg: false,
    hideForm: false,
    isValidDao: false,
    tokenAmountFn: () => {},
    governanceTokenData: [],
    gridInput: {}
  },
  actions: {
    setTokenAmountFn: (state, payload) => ({
      ...state,
      tokenAmountFn: payload
    }),
    setGridInput: (state, payload) => ({
      ...state,
      gridInput: {
        labels: payload.labels,
        datasets: payload.datasets
      }
    }),
    toggleForm: (state) => ({
      ...state,
      hideForm: !state.hideForm
    }),
    setGovernanceData: (state, payload) => ({
      ...state,
      governanceTokenData: state.governanceTokenData.concat(payload)
    }),
    setContractAddress: (state, payload) => ({
      ...state,
      contractAddress: payload
    }),
    setIsExistingOrg: (state, payload) => ({
      ...state,
      isExistingOrg: evaluateString(payload)
    })
  }
})

const FETCH_DAO_DATA = 'fetching'
const ADD_DATA_SET = 'adding dataset'
const ADD_DATA_SET_ERROR = 'add dataset error'
const ADD_DATA_SET_SUCCESS = 'add dataset success'
const FETCH_DAO_DATA_ERROR = 'error'
const FETCH_GOVERNANCE_TOKEN_ERROR = `${FETCH_DAO_DATA} governance error`
const FETCH_GOVERNANCE_TOKEN_SUCCESS = `${FETCH_DAO_DATA} governance success`

const IDLE = 'idle'
const FETCH_DAO_DATA_READY = 'fetch DAO data ready'
const FETCH_DAO_DATA_SUCCESS = 'success'
const FETCH_GOVERNANCE_TOKEN_FINISHED = 'governance fetch finished'
const viewDAOAnalyticsStates = [
  'initial',
  FETCH_DAO_DATA_READY,
  [
    'get data',
    FETCH_DAO_DATA,
    [
      'report error',
      FETCH_DAO_DATA_ERROR,
      ['handle error', FETCH_DAO_DATA_READY]
    ],
    [
      'report success',
      FETCH_DAO_DATA_SUCCESS,
      [
        'add new data',
        ADD_DATA_SET,
        [
          'report add data error',
          ADD_DATA_SET_ERROR,
          ['handle add data error', FETCH_DAO_DATA_READY]
        ],
        [
          'report add data success',
          ADD_DATA_SET_SUCCESS,
          ['handle add data success', FETCH_DAO_DATA_READY]
        ]
      ],
      [
        'fetch governance token',
        FETCH_DAO_DATA,
        [
          'report governance token fetch success',
          FETCH_GOVERNANCE_TOKEN_SUCCESS,

          ['handle governance success', FETCH_GOVERNANCE_TOKEN_FINISHED]
        ],
        [
          'report governance token fetch error',
          FETCH_GOVERNANCE_TOKEN_ERROR,
          ['handle add data error', FETCH_DAO_DATA_SUCCESS]
        ]
      ]
    ]
  ]
]

const getTxnState = ({ sendTransactionState }) => sendTransactionState
const getTxnStatus = (x) => getTxnState(x).status

const mintDSM = dsm({
  component: 'DAOHomepage',
  description: 'view DAO analytics page',
  actionStates: viewDAOAnalyticsStates
})

const {
  actionCreators: {
    getData,
    fetchGovernanceToken,
    reportGovernanceTokenFetchSuccess,
    reportGovernanceTokenFetchError,
    handleGovernanceSuccess,
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
  fetchGovernanceToken,
  reportGovernanceTokenFetchSuccess,
  reportGovernanceTokenFetchError,
  handleGovernanceSuccess,
  existingOrgReducer,
  setIsExistingOrg,
  getIsExistingOrg,
  setContractAddress,
  getContractAddress,
  getOrgName,
  setOrgName,
  getTxnState,
  getTxnStatus,
  getData,
  reportError,
  reportMintError,
  reportSuccess,
  handleError,
  handleMintError,
  mintToken,
  reportMintSuccess,
  reducer,
  FETCH_DAO_DATA,
  FETCH_DAO_DATA_ERROR,
  FETCH_GOVERNANCE_TOKEN_ERROR,
  FETCH_GOVERNANCE_TOKEN_SUCCESS,
  FETCH_GOVERNANCE_TOKEN_FINISHED,
  toggleForm,
  setIsValidDao,
  setGovernanceData,
  setTokenAmountFn,
  setGridInput
}

export default mintDSM
