import { all, call, put, take as takeAction } from 'redux-saga/effects'
import detectEthereumProvider from '@metamask/detect-provider'
import {
  setChainId,
  setWalletAddress
} from '../../Features/MetamaskAuth/reducer'
import { establishConnection } from '../../shared/hocs/withWeb3/reducer'
const isMetaMaskInstalled = () => {
  const { ethereum } = window
  return ethereum && ethereum.isMetaMask
}

const ethRpcMessages = {
  accountChanged: 'accountsChanged',
  networkChanged: 'chainChanged',
  disconnect: 'disconnect',
  connect: 'connect'
}

const ethRpcActions = {
  accountChanged: 'ACCOUNT_CHANGED',
  networkChanged: 'CHAIN_CHANGED',
  networkDisconnected: 'ETHEREUM_DISCONNECTED'
}

const { accountChanged, networkChanged } = ethRpcMessages

const createChannel = () => {
  const messageQueue = []
  const resolveQueue = []

  const put = (msg) => {
    // anyone waiting for a message ?
    if (resolveQueue.length) {
      // deliver the message to the oldest one waiting (First In First Out)
      const nextResolve = resolveQueue.shift()
      nextResolve(msg)
    } else {
      // no one is waiting ? queue the event
      messageQueue.push(msg)
    }
  }

  // returns a Promise resolved with the next message
  const take = () => {
    // do we have queued messages ?
    if (messageQueue.length) {
      // deliver the oldest queued message
      return Promise.resolve(messageQueue.shift())
    } else {
      // no queued messages ? queue the taker until a message arrives
      return new Promise((resolve) => resolveQueue.push(resolve))
    }
  }

  return {
    take,
    put
  }
}

const createCurrentChainChannel = () => {
  const channel = createChannel()
  const eth = window.ethereum

  // every change event will call put on the channel
  eth.on(networkChanged, channel.put)
  return channel
}

const createCurrentAccountChannel = () => {
  const channel = createChannel()
  const eth = window.ethereum

  // every change event will call put on the channel
  eth.on(accountChanged, channel.put)
  return channel
}

const getProvider = async () => {
  const provider = await detectEthereumProvider()
  console.log({ provider })
  return { ...provider }
}

function* ethereumWalletConnectionWatcher() {
  // Wait for the configuration to be set. This can happen multiple
  // times during the life cycle, for example when the user wants to
  // switch database/workspace.

  while (yield takeAction(establishConnection().type)) {
    const provider = yield call(getProvider)
    console.log({ provider })
    if (provider)
      yield call(monitorCurrentAccount, createCurrentAccountChannel())
  }
}

function* ethereumNetworkConnectionWatcher() {
  // Wait for the configuration to be set. This can happen multiple
  // times during the life cycle, for example when the user wants to
  // switch database/workspace.

  while (yield takeAction(establishConnection().type)) {
    const provider = yield call(getProvider)
    if (provider) yield call(monitorCurrentChain, createCurrentChainChannel())
  }
}

function* startEthereumConnection() {
  // Wait for the configuration to be set. This can happen multiple
  // times during the life cycle, for example when the user wants to
  // switch database/workspace.

  while (yield takeAction(establishConnection().type)) {
    yield all([
      call(monitorCurrentAccount, createCurrentAccountChannel()),
      call(monitorCurrentChain, createCurrentChainChannel())
    ])
  }
}

function* monitorCurrentAccount(channel) {
  while (true) {
    const address = yield call(channel.take) // Blocks until the promise resolves
    yield put(setWalletAddress(address))
  }
}

function* monitorCurrentChain(channel) {
  while (true) {
    const currentChain = yield call(channel.take) // Blocks until the promise resolves
    yield put(setChainId(currentChain))
  }
}

export {
  createChannel,
  ethRpcActions,
  startEthereumConnection,
  isMetaMaskInstalled,
  ethereumWalletConnectionWatcher,
  ethereumNetworkConnectionWatcher
}

export default startEthereumConnection
