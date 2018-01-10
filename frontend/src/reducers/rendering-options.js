import {handleActions} from 'redux-actions'
import {Map} from 'immutable'

import {SET_NODE_RATIO} from '../actions/rendering-options'

// Sigma.js rendering params
const NODE_RATIO = "nodesPowRatio"

const defaultState = Map ({
  minNodeSize: 2,
  maxNodeSize: 20,
  labelThreshold: 4,
  labelSizeRatio: 1,
  nodesPowRatio: 0.8,
})


export default handleActions({
  [SET_NODE_RATIO]: (state, action) => state.set(NODE_RATIO, action.payload),
}, defaultState)