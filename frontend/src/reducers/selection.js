import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const defaultState = Map({})

export default handleActions(
  {
    SELECT_NODE: (state, action) => {
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

    DESELECT_NODE: (state, action) =>
      // Payload should contain network ID
      state.delete(action.payload),
    ENTER_NODE: (state, action) => {
      return state.set('enter', action.payload)
    }
  },
  defaultState
)
