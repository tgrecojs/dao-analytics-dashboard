import dsm from 'redux-dsm'
import autodux from 'autodux'
const evaluateString = (str) => (str === 'true' ? true : false)
const {
  reducer: existingOrgReducer,
  selectors: { getOrgName, getIsExistingOrg },
  actions: { setOrgName, setIsExistingOrg }
} = autodux({
  slice: 'existing orginzation dashboard',
  initial: {
    orgName: '',
    isExistingOrg: false
  },
  actions: {
    setIsExistingOrg: (state, payload) => ({
      ...state,
      isExistingOrg: evaluateString(payload)
    })
  }
})

const FETCH_DAO_DATA = 'feetching DAO data'
const ADD_DATA_SET = 'adding dataset'
const ADD_DATA_SET_ERROR = 'add dataset error'
const ADD_DATA_SET_SUCCESS = 'add dataset success'
const FETCH_DAO_DATA_ERROR = 'fetch DAO data error'
const IDLE = 'idle'
const FETCH_DAO_DATA_READY = 'fetch DAO data ready'
const FETCH_DAO_DATA_SUCCESS = 'fetch DAO data success'

const sendTxnStates = [
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
  component: 'CreateNewNFT',
  description: 'send NFT txn',
  actionStates: sendTxnStates
})

const {
  actionCreators: {
    sendTransaction,
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
  getOrgName,
  setOrgName,
  getTxnState,
  getTxnStatus,
  sendTransaction,
  reportError,
  reportMintError,
  reportSuccess,
  handleError,
  handleMintError,
  mintToken,
  reportMintSuccess,
  reducer,
  FETCH_DAO_DATA,
  FETCH_DAO_DATA_ERROR
}

export default mintDSM
