import autodux from 'autodux'
const addressEndpoints = {
  //
  balances: '/balances/_v2/',
  portfolio: '/portfolio_v2/',
  transactions: '/transactions_v2/',
  transfers: '/transfers_v2/'
}
const mainnetOptions = [
  { name: 'Ethereum', chain_id: 1 },
  { name: 'Polygon/Matic', chain_id: 137 },
  { name: 'Avalanche C-Chain', chain_id: 43114 },
  { name: 'Binance Smart Chain', chain_id: 56 },
  { name: 'Fantom Opera', chain_id: 250 },
  { name: 'RSK', chain_id: 30 },
  { name: 'Arbitrum', chain_id: 42161 },
  { name: 'Palm', chain_id: 11297108109 },
  { name: 'Klaytn', chain_id: 8217 },
  { name: 'HECO', chain_id: 128 },
  { name: 'Moonriver', chain_id: 1285 }
]
export const {
  reducer,
  actions: { setContractAddress, setEndpointSelection, setNetworkSelected },
  selectors: { getContractAddress, getEndpointSelection, getMainnetOptions }
} = autodux({
  slice: 'classA-data-request-form',
  initial: {
    contractAddress: '0x',
    endpointSelection: '',
    mainnetOptions,
    networkSelected: 1
  }
})

export { addressEndpoints }
