import { handleActions } from 'redux-actions'
import { Map, Set } from 'immutable'
import {
  ENTER_NODE,
  LEAVE_NODE,
  SELECT_NODE,
  DESELECT_NODE,
  DESELECT_ALL_SUB_NODES,
  SELECT_SUB_NODE,
  DESELECT_SUB_NODE
} from '../actions/selection'

const defaultState = Map({
  enter: undefined,
  subSelection: Map()
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

    [SELECT_SUB_NODE]: (state, action) => {
      const nodeId = action.payload.nodeId
      const genes = action.payload.geneIds
      const currentSelection = state.get('subSelection')
      const newMap = currentSelection.set(nodeId, genes)

      return state.set('subSelection', newMap)
    },

    [DESELECT_SUB_NODE]: (state, action) => {
      const nodeId = action.payload
      const currentSelection = state.get('subSelection')
      const newMap = currentSelection.delete(nodeId)
      return state.set('subSelection', newMap)
    },

    [DESELECT_ALL_SUB_NODES]: (state, action) =>
      // Multiple selection is empty
      state.set('subSelection', Map())
  },
  defaultState
)
