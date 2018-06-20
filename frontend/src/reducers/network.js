import {
  FETCH_NETWORK,
  RECEIVE_NETWORK,
  DELETE_NETWORK
} from '../actions/network'
import { Map } from 'immutable'

const defState = Map({
  loading: false,
  index: null,
  idx2: null,
  error: null
})

export default function networkState(state = defState, action) {
  switch (action.type) {
    case FETCH_NETWORK:
      return state.set('loading', true)

    case RECEIVE_NETWORK:
      return state
        .set('loading', false)
        .set('error', action.error)
        .set(action.url, action.network)
        .set('index', action.index)
        .set('idx2', action.idx2)
    case DELETE_NETWORK:
      return state.delete(action.url).delete('index')

    default:
      return state
  }
}
