import { handleActions } from 'redux-actions'
import { ADD_GROUPS, REMOVE_GROUPS } from '../actions/groups'
import {Map} from 'immutable'


const defaultState = Map({
  parent: null,
  parentName: null,
  groups: {}
})

export default handleActions(
  {
    [ADD_GROUPS]: (state, action) =>
      state
        .set('parent', action.payload.parent)
        .set('parentName', action.payload.parentName)
        .set('groups', action.payload.groups),
    [REMOVE_GROUPS]: (state, action) => defaultState
  },
  defaultState
)
