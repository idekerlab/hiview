import { handleActions } from 'redux-actions'
import {
  localSearchFailed,
  localSearchStarted,
  localSearchSucceeded,
  clearSearchResults
} from '../actions/local-search'
import {createColorMap} from "./local-search-util";

const defaultState = {
  isSearching: false,
  results: [],
  ids: [],
  id2color: new Map(),
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
        id2color: new Map(),
        ids: []
      }
    },
    [localSearchSucceeded]: (state, payload) => {
      // payload is an array of hits.
      const id2color = createColorMap(payload.payload.results)
      const ids = payload.payload.results.map(entry => (entry.id))
      return {
        ...state,
        results: payload.payload.results,
        isSearching: false,
        ids,
        id2color,
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
        id2color: new Map(),
        ids: []
      }
    },
    [clearSearchResults]: (state, payload) => {
      return {
        ...state,
        results: [],
        id2color: new Map(),
        ids: []
      }
    }
  },
  defaultState
)

export default localSearch
