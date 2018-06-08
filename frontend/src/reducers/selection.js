import { handleActions } from 'redux-actions'
import { Map } from 'immutable'
import {
  ENTER_NODE,
  LEAVE_NODE,
  SELECT_NODE,
  DESELECT_NODE,
  DESELECT_ALL_NODES,
  SELECT_NODES
} from '../actions/selection'

const defaultState = Map({
  enter: undefined,
  multiple: []
})

export default handleActions(
  {
    [SELECT_NODE]: (state, action) => {
      const networkId = action.payload.networkId
      const nodeId = action.payload.nodeId
      const nodeProps = action.payload.nodeProps
      const props = {
        nodeId: nodeId,
        nodeProps: nodeProps
      }

      console.log('Model Update: ')
      console.log(props)
      return state.set(networkId, props)
    },

    [DESELECT_NODE]: (state, action) =>
      // Payload should contain network ID
      state.delete(action.payload),
    [ENTER_NODE]: (state, action) => {
      return state.set('enter', action.payload)
    },

    [LEAVE_NODE]: (state, action) => {
      return state.set('enter', undefined)
    },

    [SELECT_NODES]: (state, action) => {
      const nodeIds = action.payload
      console.log('List Model Update!!: ', action.payload)
      return state.set('multiple', nodeIds)
    },

    [DESELECT_ALL_NODES]: (state, action) =>
      // Multiple selection is empty
      state.set('multiple', [])
  },
  defaultState
)
