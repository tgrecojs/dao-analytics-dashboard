import { fork, call, all, spawn } from 'redux-saga/effects'
import web3ConnectionWatcher from '../hocs/withWeb3/saga'
import watchFetchMetamaskAccount from '../../Features/MetamaskAuth/saga'
import watchStartEthereumConnection from '../utils/jsonRpcHelpers'
import createNewDAOWatcher from '../../Features/CreateNewDAO/saga'
import fetchDAOAnalyticsWatcher from '../../Features/ExistingDAO/saga'
import watchFetchGovernanceToken from '../../Features/GovernanceStats/saga'

export default function* root() {
  yield spawn(watchStartEthereumConnection)
  yield spawn(web3ConnectionWatcher)
  yield fork(watchFetchMetamaskAccount)
  yield all([
    call(createNewDAOWatcher),
    call(fetchDAOAnalyticsWatcher),
    call(watchFetchGovernanceToken)
  ])
}
