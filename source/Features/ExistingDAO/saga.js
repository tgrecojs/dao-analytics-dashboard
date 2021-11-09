import { call, put, takeLatest } from '@redux-saga/core/effects'
import { fetchFromFleekStorage } from '../../shared/api/fleek'
import {
  getData,
  reportSuccess,
  reportError,
  fetchGovernanceToken,
  setIsValidDao
} from './reducer'
import { reportSuccess as reportCreateNewDAOSuccess } from '../CreateNewDAO/reducer'
import { formatFleekResponse, sanitizeString } from '../../shared/utils'
import { fetchGovernanceTokenSaga } from '../GovernanceStats/saga'
fetchGovernanceToken
export function* fetchAnalyticsSaga(action) {
  try {
    const { payload } = action
    console.log({ payload })
    const response = yield call(fetchFromFleekStorage, {
      key: sanitizeString(action.payload.key)
    })
    console.log('response from fetchAnalyticsSaga::', response)
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

// function* redirectUserSaga(action) {
//   yield call(redirectUser)
// }
export default watchFetchDAOAnalytics
