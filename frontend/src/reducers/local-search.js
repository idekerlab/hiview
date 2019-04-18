import { handleActions } from 'redux-actions'
import {
  localSearchFailed,
  localSearchStarted,
  localSearchSucceeded
} from '../actions/local-search'

const defaultState = {
  isSearching: false,
  results: {},
  error: null
}

const localSearch = handleActions(
  {
    [localSearchStarted]: (state, payload) => {
      return {
        ...state,
        isSearching: true,
        error: null,
        results: {}
      }
    },
    [localSearchSucceeded]: (state, payload) => {
      console.log('Success Local Index:::::::::', payload)
      return {
        ...state,
        results: payload.payload.results,
        isSearching: false,
        error: null
      }
    },
    [localSearchFailed]: (state, payload) => {
      console.warn('Error local index search:', payload.payload.error)
      return {
        ...state,
        isSearching: false,
        error: payload.payload.error,
        results: {}
      }
    }
  },
  defaultState
)

export default localSearch
