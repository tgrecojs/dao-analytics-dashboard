import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  reducer as ethProviderReducer,
  web3Reducer as userSessionReducer
} from '../Features/MetamaskAuth/reducer'
import { reducer as web3ConnectionReducer } from './hocs/withWeb3/reducer'
import { reducer as setupDAOAnalyticsReducer } from '../Features/CreateNewDAO/reducer'
import {
  existingOrgReducer,
  reducer as viewDaoAnalyticsReducer
} from '../Features/ExistingDAO/reducer'
import { reducer as classADataReducer } from '../Features/ClassAForm/reducer'
import { reducer as governanceTokenDataReducer } from '../Features/GovernanceStats/reducer'

import rootSaga from './sagas'
import createSagaMiddleware from '@redux-saga/core'
const exampleInitialState = {
  metamaskProviderState: ethProviderReducer(),
  userSessionState: userSessionReducer(),
  setupDAOAnalyticsState: setupDAOAnalyticsReducer(),
  existingOrgState: existingOrgReducer(),
  viewDaoAnalyticsState: viewDaoAnalyticsReducer(),
  classADataState: classADataReducer(),
  governanceTokenDataState: governanceTokenDataReducer()
}

export function initializeStore(initialState = exampleInitialState) {
  const sagaMiddleware = createSagaMiddleware()
  const rootReducer = combineReducers({
    metamaskProviderState: ethProviderReducer,
    userSessionState: userSessionReducer,
    setupDAOAnalyticsState: setupDAOAnalyticsReducer,
    web3ConnectionState: web3ConnectionReducer,
    existingOrgState: existingOrgReducer,
    viewDaoAnalyticsState: viewDaoAnalyticsReducer,
    classADataState: classADataReducer,
    governanceTokenDataState: governanceTokenDataReducer
  })
  return {
    ...createStore(
      rootReducer,
      initialState,
      applyMiddleware(...[sagaMiddleware, logger])
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  }
}
