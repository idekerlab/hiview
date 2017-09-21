import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const defaultState = Map({
  uuid: 'c848905a-8edb-11e7-9743-0660b7976219',
  serverUrl: 'http://test.ndexbio.org'
})


export default handleActions({
  ADD_DATA_SOURCE: (state, action) => (
    state
      .set('uuid', action.payload.uuid)
      .set('serverUrl', action.payload.serverUrl)
  ),
  REMOVE_DATA_SOURCE: (state, action) => (defaultState)
}, defaultState)

