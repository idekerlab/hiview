import {handleActions} from 'redux-actions'

const defaultState = {
  command: '',
  parameters: {}
}

export default handleActions({
  SELECT_NODES: (state, action) => ({
    command: 'select',
    parameters: action.payload
  }),
  UNSELECT_NODES: (state, action) => ({
    command: 'unselect',
    parameters: action.payload
  }),
}, defaultState)