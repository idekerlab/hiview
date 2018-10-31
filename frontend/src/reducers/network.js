import {
  FETCH_NETWORK,
  RECEIVE_NETWORK,
  DELETE_NETWORK,
  SET_SERVER,
  SET_UUID
} from '../actions/network'
import { Map } from 'immutable'

const defState = Map({
  loading: false,
  index: null,
  idx2: null,
  error: null,
  uuid: null,
  server: null,
  networkUrl: null,
  cyjs: null
})

export default function networkState(state = defState, action) {
  switch (action.type) {
    case FETCH_NETWORK:
      return state.set('loading', true)

    case RECEIVE_NETWORK:

      const net = action.network
      return state
        .set('cyjs', net)
        .set('loading', false)
        .set('error', action.error)
        .set('index', action.index)
        .set('idx2', action.idx2)
    case DELETE_NETWORK:
      return state.delete(action.url).delete('index')
    case SET_UUID:
      return state.set('uuid', action.payload)
    case SET_SERVER:
      const networkUrl = action.payload + '/v2/network/' + state.get('uuid')
      return state.set('server', action.payload).set('networkUrl', networkUrl)
    default:
      return state
  }
}
