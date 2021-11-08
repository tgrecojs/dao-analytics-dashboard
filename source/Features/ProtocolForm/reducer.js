import autodux from 'autodux'
const addressEndpoints = {
    // 
    balances: '/balances/_v2/',
    portfolio: '/portfolio_v2/',
    transactions: '/transactions_v2/',
    transfers: '/transfers_v2/'
}
export const {
    reducer,
    actions: {
      setContractAddress,
      setEndpointSelection,
    },
    selectors: {
      getShowTable,
      getHistoricalFliData,
      getHistoricalData,
      getVolDecayStats,
      getHistoricalDataWithVolatility
    }
  } = autodux({
    slice: 'volatility-decay',
    initial: {
      contractAddress: '0x',
      
    })

export { 
    addressEndpoints
}