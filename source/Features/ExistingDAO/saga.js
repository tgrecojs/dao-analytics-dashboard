import { call, put, takeLatest } from '@redux-saga/core/effects'
import { fetchFromFleekStorage } from '../../shared/api/fleek'
import {
  getData,
  reportSuccess,
  reportError,
  fetchGovernanceToken,
  setIsValidDao
} from './reducer'
import { formatFleekResponse, sanitizeString } from '../../shared/utils'

export function* fetchAnalyticsSaga(action) {
  try {
    const response = yield call(fetchFromFleekStorage, {
      key: sanitizeString(action.payload.key)
    })
    yield put(reportSuccess(formatFleekResponse(response)))
    yield put(setIsValidDao(true))
  } catch (error) {
    yield put(reportError(error))
  }
}
function* handleFetchAnalyticsSuccess(action) {
  yield put(fetchGovernanceToken({ ...action.payload, pageNumber: 0 }))
}
function* watchFetchDAOAnalytics() {
  yield takeLatest(getData().type, fetchAnalyticsSaga)
  yield takeLatest(reportSuccess().type, handleFetchAnalyticsSuccess)
}

export default watchFetchDAOAnalytics
