import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as quickGoApi from '../api/quickgo'

import {
  FIND_GENES_FAILED,
  FIND_GENES_STARTED,
  FIND_GENES_SUCCEEDED
} from '../actions/go'

export default function* goSaga() {
  yield takeLatest(FIND_GENES_STARTED, watchFind)
}

function* watchFind(action) {
  let goId = action.payload.goId

  try {
    const [res1] = yield all([call(quickGoApi.searchGenes, goId)])

    const geneJson = yield call([res1, 'json'])

    console.log('Got result:;', geneJson, goId)
    yield put({
      type: FIND_GENES_SUCCEEDED,
      payload: {
        results: geneJson
      }
    })
  } catch (e) {
    console.warn('GO search error:', e)
    yield put({
      type: FIND_GENES_FAILED,
      payload: {
        message: 'GO search error',
        goId: goId,
        error: e.message
      }
    })
  }
}
