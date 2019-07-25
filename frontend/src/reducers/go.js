import { handleActions } from 'redux-actions'
import {
  findGenesFailed,
  findGenesStarted,
  findGenesSucceeded
} from '../actions/go'

const defaultState = {
  isSearchingGenes: false,
  results: {},
  error: null
}

const go = handleActions(
  {
    [findGenesStarted]: (state, payload) => {
      return {
        ...state,
        isSearchingGenes: true,
        error: null,
        results: {}
      }
    },
    [findGenesSucceeded]: (state, payload) => {
      console.log('Success GO:::::::::', payload)
      return {
        ...state,
        results: payload.payload.results,
        isSearchingGenes: false,
        error: null
      }
    },
    [findGenesFailed]: (state, payload) => {
      console.warn('Error:', payload.payload.error)
      return {
        ...state,
        isSearchingGenes: false,
        error: payload.payload.error,
        results: {}
      }
    }
  },
  defaultState
)

export default go
