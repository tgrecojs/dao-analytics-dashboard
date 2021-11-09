import autodux from 'autodux'
import { createPieChart } from '../../shared/charts/format'
const {
  reducer,
  selectors: {
    getRequestLimit,
    getCurrentDataset,
    getCurrentWalletBalances,
    getAddressLookupEnabled,
    getAddressLookupTarget,
    getCustomRequestLimit
  },
  actions: {
    aggregateDataset,
    formatData,
    setRequestLimit,
    setCurrentDataset,
    setCurrentWalletBalances,
    setAddressLookupEnabled,
    setAddressLookupTarget,
    setCustomRequestLimit
  }
} = autodux({
  slice: 'governance token analytics',
  initial: {
    currentDataset: [],
    requestLimit: 50,
    requestLimitIncrements: [10, 25, 50, 100, 200].map((x) => ({
      label: x.toString(),
      value: x.toString()
    })),
    customRequestLimit: null,
    addressLookupEnabled: false,
    addressLookupTarget: null,
    currentWalletBalances: null
  },
  actions: {
      setRequestLimit: (state, payload) => ({...state,  requestLimit: payload, currentDataset: state.currentDataset.slice(0, Number(payload))})
    ,formatData: (state, payload) => ({
      ...state,
      formatted: createPieChart(state.currentDataset)
    }),
    aggregateDataset: (state, payload) => ({
      ...state,
      currentDataset: state.currentDataset.concat(payload)
    })
  }
})
const getGovernanceTokenState = ({ governanceTokenDataState }) =>
  governanceTokenDataState

export {
  aggregateDataset,
  reducer,
  setRequestLimit,
  setCurrentDataset,
  setCurrentWalletBalances,
  setAddressLookupEnabled,
  setAddressLookupTarget,
  setCustomRequestLimit,
  getRequestLimit,
  getCurrentDataset,
  getCurrentWalletBalances,
  getAddressLookupEnabled,
  getAddressLookupTarget,
  getCustomRequestLimit,
  getGovernanceTokenState,
  formatData
}
