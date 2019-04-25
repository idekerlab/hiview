import { handleActions } from 'redux-actions'
import {
  localSearchFailed,
  localSearchStarted,
  localSearchSucceeded,
  clearSearchResults
} from '../actions/local-search'

const defaultState = {
  isSearching: false,
  results: [],
  ids: [],
  error: null
}

const localSearch = handleActions(
  {
    [localSearchStarted]: (state, payload) => {
      return {
        ...state,
        isSearching: true,
        error: null,
        results: [],
        ids: []
      }
    },
    [localSearchSucceeded]: (state, payload) => {
      console.log('Success Local Index:::::::::', payload)
      const ids = payload.payload.results.map(entry => (entry.id))
      return {
        ...state,
        results: payload.payload.results,
        isSearching: false,
        ids,
        error: null
      }
    },
    [localSearchFailed]: (state, payload) => {
      console.warn('Error local index search:', payload.payload.error)
      return {
        ...state,
        isSearching: false,
        error: payload.payload.error,
        results: [],
        ids: []
      }
    },
    [clearSearchResults]: (state, payload) => {
      console.log('Local search results cleared', payload)
      return {
        ...state,
        results: [],
        ids: []
      }
    },
  },
  defaultState
)

export default localSearch
