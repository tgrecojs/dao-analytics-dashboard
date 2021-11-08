import { call, put, takeLatest } from '@redux-saga/core/effects'
import { fetchFromFleekStorage } from '../../shared/api/fleek'
import { getData, reportSuccess, reportError } from './reducer'
import { reportSuccess as reportCreateNewDAOSuccess } from '../CreateNewDAO/reducer'
import { formatFleekResponse, sanitizeString } from '../../shared/utils'

export function* fetchAnalyticsSaga(action) {
  try {
    const { payload } = action;
    console.log({payload})
    const response = yield call(fetchFromFleekStorage, ({key: 
      sanitizeString(action.payload.key)}))
    console.log('response from fetchAnalyticsSaga::', response)
    yield put(reportSuccess(formatFleekResponse(response)))
  } catch (error) {
    yield put(reportError(error))
  }
}
function* watchFetchDAOAnalytics() {
  yield takeLatest(
    getData().type,
    fetchAnalyticsSaga
  )
}


// function* redirectUserSaga(action) {
//   yield call(redirectUser)
// }
export default watchFetchDAOAnalytics
