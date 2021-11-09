import autodux from 'autodux'
const addressEndpoints = {
  //
  balances: '/balances/_v2/',
  portfolio: '/portfolio_v2/',
  transactions: '/transactions_v2/',
  transfers: '/transfers_v2/',
  holders: '/token_holders/'
}

const mainnetOptions = [
  { label: 'Ethereum', value: 1 },
  { label: 'Polygon/Matic', value: 137 },
  { label: 'Avalanche C-Chain', value: 43114 },
  { label: 'Binance Smart Chain', value: 56 },
  { label: 'Fantom Opera', value: 250 },
  { label: 'RSK', value: 30 },
  { label: 'Arbitrum', value: 42161 },
  { label: 'Palm', value: 11297108109 },
  { label: 'Klaytn', value: 8217 },
  { label: 'HECO', value: 128 },
  { label: 'Moonriver', value: 1285 }
]
const {
  reducer,
  actions: { setContractAddress, setEndpointSelection, setNetworkSelected },
  selectors: { getContractAddress, getEndpointSelection, getMainnetOptions }
} = autodux({
  slice: 'classA-data-request-form',
  initial: {
    contractAddress: '0x',
    endpointSelection: '',
    mainnetOptions,
    networkSelected: "1"
  }
})

export {
  addressEndpoints,
  reducer,
  setContractAddress,
  setEndpointSelection,
  setNetworkSelected,
  getContractAddress,
  getEndpointSelection,
  getMainnetOptions
}
