import { call, put, takeLatest } from 'redux-saga/effects'
import {
  reportError,
  reportMetamaskConnectionSuccess,
  disconnectWallet,
  setWalletAddress,
  setChainId,
  completeStep
} from './reducer'
import isEmpty from 'crocks/predicates/isEmpty'

import { requestEthAccount } from '../../shared/api/eth'
import { ethRpcActions } from '../../shared/utils/jsonRpcHelpers'

export function* handleMetamaskConnection() {
  try {
    const user = yield call(requestEthAccount)
    yield put(reportMetamaskConnectionSuccess(user))
  } catch (error) {
    yield put(reportError(error))
  }
}

function* handleConnectionDetails(action) {
  console.log('inside')
  yield put(setWalletAddress(action.payload))
  yield put(setChainId(window.ethereum.chainId))
  yield put(completeStep({ id: 0 }))
  // TODO: implement automatic refresh
  // ex. yield call()
}

function* handleNetworkChanged(action) {
  const { chainId, selectedAddress } = payload
  yield put(setChainId(chainId))
  yield put(setWalletAddress(selectedAddress))
  // TODO: implement automatic refresh
  // ex. yield call()
}

function* handleAccountChanged(action) {
  const { payload } = action
  if (!isEmpty(payload)) {
    yield put(setWalletAddress(payload))
  } else {
    yield put(setWalletAddress([]))
    yield put(disconnectWallet())
  }
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(
    reportMetamaskConnectionSuccess().type,
    handleConnectionDetails
  )
  yield takeLatest(ethRpcActions.networkChanged, handleNetworkChanged)
}

export default watchFetchMetamaskAccount
