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
  FILTER_EDGES: (state, action) => ({
    command: 'filter',
    parameters: action.payload
  }),
  APPLY_LAYOUT: (state, action) => ({
    command: 'layout',
    parameters: action.payload
  }),
  CLEAR_COMMAND: (state, action) => (defaultState),
}, defaultState)