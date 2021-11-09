import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  setupDaoAnalyticsPage,
  reportSuccess,
  reportError,
  handleError
} from './reducer'
const getSetupPayload = ({ existingOrgState }) => existingOrgState
import { postToFleekStorage } from '../../shared/api/fleek'
import { getCurrentTimestamp, sanitizeString } from '../../shared/utils'
import { getData, toggleForm } from '../ExistingDAO/reducer'

export function* fleekUploadSaga(action) {
  try {
    const payload = yield select(getSetupPayload)

    const { orgName: daoName, contractAddress: governanceToken } = payload
    const sanitizedName = sanitizeString(daoName)

    const postParams = {
      orginizationName: daoName,
      creationDate: getCurrentTimestamp(),
      sanitizedName,
      governanceTokenAddress: governanceToken
    }
    console.log({ postParams })
    yield put(toggleForm())
    const setupNewDAOResponse = yield call(postToFleekStorage, postParams)

    yield put(reportSuccess(setupNewDAOResponse))
  } catch (error) {
    yield put(reportError(error))
    yield put(handleError(error))
  }
}

function* handleCreateDAOSuccess(action) {
  yield put(getData(action.payload))
}

function* createNewDAOWatcher() {
  yield takeLatest(setupDaoAnalyticsPage().type, fleekUploadSaga)
  yield takeLatest(reportSuccess().type, handleCreateDAOSuccess)
}

export default createNewDAOWatcher
