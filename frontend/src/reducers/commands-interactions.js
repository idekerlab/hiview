import {handleActions} from 'redux-actions'
import {FIT, FIT_SELECTED} from '../actions/commands-interactions'

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
  UNSELECT_ALL_NODES: (state, action) => ({
    command: 'unselectAll',
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
  EXPAND_EDGES: (state, action) => ({
    command: 'expandEdges',
    parameters: action.payload
  }),
  [FIT]: (state, action) => ({
    command: 'fit',
    parameters: action.payload
  }),
  [FIT_SELECTED]: (state, action) => ({
    command: 'fitSelected',
    parameters: action.payload
  }),
  COLLAPSE_EDGES: (state, action) => ({
    command: 'collapseEdges',
    parameters: action.payload
  }),
  CLEAR_COMMAND: (state, action) => (defaultState),
}, defaultState)