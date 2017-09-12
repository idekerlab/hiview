import {FETCH_INTERACTIONS, RECEIVE_INTERACTIONS} from '../actions/raw-interactions'
import {Map} from 'immutable'

const defState = Map({
  loading: false
})

export default function networkState(state = defState, action) {

  switch (action.type) {
    case FETCH_INTERACTIONS:
      console.log('+++++++++++++++ Fetching Raw interaction 2 ++++++++++++++')
      return state.set('loading', true);
    case RECEIVE_INTERACTIONS:
      console.log('+++++++++++++++ Raw interaction Fetch finished 2 ++++++++++++++')
      const finishedState = state.set('loading', false)
      return finishedState.set('interactions', action.network)
    default:
      return state
  }
}
