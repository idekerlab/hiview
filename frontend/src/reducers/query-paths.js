import {
  FETCH_INTERCONNECTION,
  RECEIVE_INTERCONNECTION
} from '../actions/query-paths'

const defaultState = {
  paths: new Map(), // Map of edge type - network pair
  loading: false
}

/**
 * 
 * @param {State for path between two genes} state 
 * @param {*} action 
 * @returns 
 */
export default function queryPathsState(state = defaultState, action) {
  switch (action.type) {
    case FETCH_INTERCONNECTION:
      return {
        paths: new Map(),
        loading: true
      }
    case RECEIVE_INTERCONNECTION:
      return {
        paths: action.paths,
        loading: false
      }
    default:
      return state
  }
}
