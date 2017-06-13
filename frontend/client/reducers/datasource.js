import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const defaultState = Map({
  uuid: '20bcb48f-3e6b-11e7-baf1-0660b7976219',
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

