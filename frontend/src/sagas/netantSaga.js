import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as netAntApi from '../api/netant'

import {
  NETANT_SEARCH_FAILED,
  NETANT_SEARCH_SUCCEEDED,
  NETANT_SEARCH_STARTED,
  SET_JOB_ID
} from '../actions/netant'

export default function* netantSaga() {
  yield takeLatest(NETANT_SEARCH_STARTED, watchSearch)
}

const API_CALL_INTERVAL = 10000
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function* watchSearch(action) {
  let genes = action.payload
  try {
    const res = yield call(netAntApi.postGenes, genes)
    const jobIdJson = yield call([res, 'json'])

    const jobId = jobIdJson.id
    yield put({
      type: SET_JOB_ID,
      payload: {
        jobId: jobId
      }
    })

    let counter = 0

    while (counter < 5) {
      const resStatus = yield call(netAntApi.checkStatus, jobId)
      const statusJson = yield call([resStatus, 'json'])

      console.log('Waiting for result:', statusJson, statusJson.status)
      yield call(sleep, API_CALL_INTERVAL)

      counter++

      // yield put({
      //   type: NETANT_SEARCH_SUCCEEDED,
      //   payload: {
      //     result: {
      //       val: 'OK'
      //     }
      //   }
      // })
    }

    console.log('TIMEOUT:', jobId)
    yield put({
      type: NETANT_SEARCH_FAILED,
      payload: {
        message: 'Timeout'
      }
    })
  } catch (e) {
    console.warn('NETANT search error:', e)
    yield put({
      type: NETANT_SEARCH_FAILED,
      payload: {
        message: 'NetAnt search error',
        error: e.message
      }
    })
  }
}
