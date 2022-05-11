import {
  FETCH_INTERCONNECTION,
  RECEIVE_INTERCONNECTION
} from '../actions/query-paths'

const defaultState = {
  paths: new Map(),
  currentUuid: null,
  loading: false
}

export default function queryPathsState(state = defaultState, action) {
  switch (action.type) {
    case FETCH_INTERCONNECTION:
      return {
        currentUuid: action.uuid,
        paths: state.paths.set(action.uuid, {}),
        loading: true
      }
    case RECEIVE_INTERCONNECTION:
      return {
        paths: state.paths.set(action.uuid, action.network),
        loading: false
      }
    default:
      return state
  }
}
