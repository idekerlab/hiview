import {FETCH_INTERACTIONS, RECEIVE_INTERACTIONS} from '../actions/raw-interactions'
import {Map} from 'immutable'

const defState = Map({
  loading: false,
  interactions: null,
  filters: null
})

export default function networkState(state = defState, action) {

  switch (action.type) {
    case FETCH_INTERACTIONS:
      return state
        .set('loading', true)
        .set('interactions', null)
    case RECEIVE_INTERACTIONS:
      return state
        .set('loading', false)
        .set('interactions', action.network)
        .set('filters', action.filters)
        .set('groups', action.groups)

    default:
      return state
  }
}
