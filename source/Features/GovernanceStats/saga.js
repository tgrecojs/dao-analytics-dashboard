import { call, put, select, takeLatest } from '@redux-saga/core/effects'
import {
  fetchGovernanceToken,
  handleGovernanceSuccess,
  reportGovernanceTokenFetchError,
  reportGovernanceTokenFetchSuccess
} from '../ExistingDAO/reducer'
import { addressEndpoints } from '../ClassAForm/reducer'
import {
  fetchCovalentData,
  makeClassAEndpoint
} from '../../shared/api/covalent'
const makeQueryParams = (arr = [['page-size', 1000]]) => Object.fromEntries(arr) //?
const getAnalyticsState = ({ viewDaoAnalyticsState }) =>
  viewDaoAnalyticsState.payload
const getGovernaneTokenData = ({ existingOrgState }) =>
  existingOrgState.governanceTokenData

import testData from '../../shared/charts/governanceTokenData'
let DEV_ENV = true

import { aggregateDataset, formatData } from './reducer'
function* fetchGovernanceTokenSaga(action) {
  try {
    const { payload } = action
    const { governanceToken } = yield select(getAnalyticsState)
    const response = yield call(
      fetchCovalentData,
      `${makeClassAEndpoint(1)}/tokens/${governanceToken}${
        addressEndpoints.holders
      }?page-size=1000&page-number=${action.payload.pageNumber}`
    )
    yield put(
      reportGovernanceTokenFetchSuccess({
        ...response,
        governanceToken: payload.governanceToken
      })
    )
  } catch (error) {
    yield put(reportGovernanceTokenFetchError(error))
  }
}
const parseResponse = ({ data }) => ({
  items: data.items,
  pagination: data.pagination,
  hasMore: data.pagination.has_more,
  pageNumber: data.pagination.page_number
})
const add = (x) => (y) => x + y
const addOne = add(1)
const head = (arr = []) => {
  const [value] = arr
  return value
}
function* handleTestSuccess(action) {
  yield put(handleGovernanceSuccess(testData))
}
function* handleGovernanceTokenResponse(action) {
  const { payload } = action

  const { items, pagination, pageNumber, hasMore } = parseResponse(payload)
  yield put(aggregateDataset(items))
  if (hasMore) {
    yield put(
      fetchGovernanceToken({
        pageNumber: addOne(pageNumber),
        governanceToken: payload.governanceToken
      })
    )
    yield put(handleGovernanceSuccess(testData))
    yield put(formatData())
  } else {
    const governanceTokens = yield select(getGovernaneTokenData)
    yield put(handleGovernanceSuccess(governanceTokens))
  }
}

function* watchFetchGovernanceToken() {
  yield takeLatest(fetchGovernanceToken().type, fetchGovernanceTokenSaga)
  yield takeLatest(
    reportGovernanceTokenFetchSuccess().type,
    handleGovernanceTokenResponse
  )
}

export default watchFetchGovernanceToken
export { fetchGovernanceTokenSaga }
