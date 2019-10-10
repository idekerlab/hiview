import { handleActions } from 'redux-actions'
import { Map } from 'immutable'
import { SET_PATH, REMOVE_PATH } from '../actions/current-path'

const defaultState = Map({
  currentPath: null
})

export default handleActions(
  {
    [SET_PATH]: (state, action) => state.set('currentPath', action.payload),
    [REMOVE_PATH]: (state, action) => state.set('currentPath', null)
  },
  defaultState
)
