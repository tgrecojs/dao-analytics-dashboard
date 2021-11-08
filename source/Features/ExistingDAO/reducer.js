import dsm from 'redux-dsm'
import autodux from 'autodux'
const evaluateString = (str) => (str === 'true' ? true : false)
const {
  reducer: existingOrgReducer,
  selectors: { getContractAddress, getOrgName, getIsExistingOrg },
  actions: { setContractAddress, setOrgName, setIsExistingOrg, toggleForm }
} = autodux({
  slice: 'existing orginzation dashboard',
  initial: {
    orgName: '',
    contractAddress: '',
    isExistingOrg: false,
    hideForm: false
  },
  actions: {
    toggleForm: (state) => ({
      ...state,
      hideForm: !state.hideForm
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

const FETCH_DAO_DATA = 'fetching DAO data'
const ADD_DATA_SET = 'adding dataset'
const ADD_DATA_SET_ERROR = 'add dataset error'
const ADD_DATA_SET_SUCCESS = 'add dataset success'
const FETCH_DAO_DATA_ERROR = 'fetch DAO data error'
const IDLE = 'idle'
const FETCH_DAO_DATA_READY = 'fetch DAO data ready'
const FETCH_DAO_DATA_SUCCESS = 'success'

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
  toggleForm
}

export default mintDSM
