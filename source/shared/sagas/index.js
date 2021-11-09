import { fork, call, all, spawn } from 'redux-saga/effects'
import web3ConnectionWatcher from '../hocs/withWeb3/saga'
import watchFetchMetamaskAccount from '../../Features/MetamaskAuth/saga'
import monitorChangeEventsWatcher, {
  ethereumNetworkConnectionWatcher,
  ethereumWalletConnectionWatcher
} from '../utils/jsonRpcHelpers'
import createNewDAOWatcher from '../../Features/CreateNewDAO/saga'
import fetchDAOAnalyticsWatcher from '../../Features/ExistingDAO/saga'
import watchFetchGovernanceToken from '../../Features/GovernanceStats/saga'

export default function* root() {
  // yield fork(monitorChangeEventsWatcher)fir
  yield spawn(ethereumWalletConnectionWatcher)
  // Need to add task below for network watcher
  // yield spawn(ethereumNetworkConnectionWatcher)
  yield spawn(web3ConnectionWatcher)
  yield fork(watchFetchMetamaskAccount)
  yield all([
    call(createNewDAOWatcher),
      call(fetchDAOAnalyticsWatcher),
      call(watchFetchGovernanceToken)
  ])
}
