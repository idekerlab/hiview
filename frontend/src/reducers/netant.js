import { handleActions } from 'redux-actions'
import {
  netantSearchFailed,
  netantSearchStarted,
  netantSearchSucceeded,
  setJobId,
  clearAll
} from '../actions/netant'

const defaultState = {
  isNetAntRunning: false,
  jobId: null,
  result: null,
  error: null
}

const source = handleActions(
  {
    [netantSearchStarted]: (state, payload) => {
      return {
        ...state,
        isNetAntRunning: true,
        error: null,
        jobId: null,
        result: null
      }
    },
    [netantSearchSucceeded]: (state, payload) => {
      console.log('Success!!!---------', payload)
      return {
        ...state,
        result: payload.payload.result,
        isNetAntRunning: false,
        error: null
      }
    },
    [netantSearchFailed]: (state, payload) => {
      console.warn('Error:', payload)
      return {
        ...state,
        isNetAntRunning: false,
        error: payload.payload.error,
        result: null
      }
    },
    [setJobId]: (state, payload) => {
      return {
        ...state,
        jobId: payload.payload.jobId
      }
    },
    [clearAll]: (state, payload) => {
      return {
        isNetAntRunning: false,
        jobId: null,
        result: null,
        error: null
      }
    }
  },
  defaultState
)

export default source
