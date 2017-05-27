import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const defaultState = Map({
  uuid: '',
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

