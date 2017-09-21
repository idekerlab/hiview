import {FETCH_INTERACTIONS, RECEIVE_INTERACTIONS} from '../actions/raw-interactions'
import {Map} from 'immutable'

const defState = Map({
  loading: false
})

export default function networkState(state = defState, action) {

  switch (action.type) {
    case FETCH_INTERACTIONS:
      return state.set('loading', true);
    case RECEIVE_INTERACTIONS:
      return state
        .set('loading', false)
        .set('interactions', action.network)

    default:
      return state
  }
}
