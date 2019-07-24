import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as netAntApi from '../api/netant'

import {
  NETANT_SEARCH_FAILED,
  NETANT_SEARCH_SUCCEEDED,
  NETANT_SEARCH_STARTED,
  SET_JOB_ID
} from '../actions/netant'

const SERVICE_STATES = {
  SUBMITTED: 'submitted', PROCESSING: 'processing', DONE: 'done'
}

export default function* netantSaga() {
  yield takeLatest(NETANT_SEARCH_STARTED, watchSearch)
}

// 10 second interval
const API_CALL_INTERVAL = 10000
const NUM_REPEAT = 60

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function* watchSearch(action) {
  let genes = action.payload.genes
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

    while (counter < NUM_REPEAT) {
      const resStatus = yield call(netAntApi.checkStatus, jobId)
      const statusJson = yield call([resStatus, 'json'])

      const { status } = statusJson

      console.log('# status ===>', status)

      if(status === 'done') {
        console.log('-------------------------------Finished!!!!!', jobId, statusJson)
        yield put({
          type: NETANT_SEARCH_SUCCEEDED,
          payload: {
            result: statusJson
          }
        })
        return
      }
      console.log('Waiting for result:', statusJson, status)
      yield call(sleep, API_CALL_INTERVAL)

      counter++

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
