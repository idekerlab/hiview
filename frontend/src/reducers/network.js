import {FETCH_NETWORK, RECEIVE_NETWORK, DELETE_NETWORK} from '../actions/network'
import {Map} from 'immutable'

const defState = Map({
  loading: false
});


export default function networkState(state = defState, action) {

  switch (action.type) {

    case FETCH_NETWORK:
      return state.set('loading', true)

    case RECEIVE_NETWORK:
      return state
        .set('loading', false)
        .set(action.url, action.network)
    case DELETE_NETWORK:
      return state.delete(action.url)

    default:
      return state
  }
}
