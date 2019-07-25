import {SEARCH, RECEIVE_SEARCH_RESULT, CLEAR_SEARCH_RESULT, SET_SEARCH_RESULT} from '../actions/search'

const defaultState = {
  query: null,
  result: null,
  loading: false,
  highlight: null
}


export default function searchState(state = defaultState, action) {

  switch (action.type) {
    case SEARCH:
      return {
        query: action.query,
        result: null,
        loading: true
      }
    case RECEIVE_SEARCH_RESULT:
      return {
        query: action.query,
        result: action.result,
        loading: false
      }
    case SET_SEARCH_RESULT:
      return {
        query: action.query,
        result: action.result,
        loading: false
      }
    case CLEAR_SEARCH_RESULT:
      return defaultState
    default:
      return state
  }
}
