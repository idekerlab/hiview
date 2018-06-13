import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const defaultState = Map({
  uuid: 'c84ec0b0-02f4-11e8-bd69-0660b7976219',
  serverUrl: 'http://test.ndexbio.org'
})

export default handleActions(
  {
    ADD_DATA_SOURCE: (state, action) =>
      state
        .set('uuid', action.payload.uuid)
        .set('serverUrl', action.payload.serverUrl)
        .set('serverType', action.payload.serverType),
    REMOVE_DATA_SOURCE: (state, action) => defaultState
  },
  defaultState
)
