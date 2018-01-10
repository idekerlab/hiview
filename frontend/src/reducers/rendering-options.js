import {handleActions} from 'redux-actions'
import {Map} from 'immutable'

import {SET_NODE_RATIO, SET_NODE_SIZE_RANGE} from '../actions/rendering-options'

// Sigma.js rendering params
const NODE_RATIO = "nodesPowRatio"
const MIN_NODE_SIZE = "minNodeSize"
const MAX_NODE_SIZE = "maxNodeSize"

const defaultState = Map ({
  minNodeSize: 2,
  maxNodeSize: 20,
  labelThreshold: 4,
  labelSizeRatio: 1,
  nodesPowRatio: 0.8,
})


export default handleActions({
  [SET_NODE_RATIO]: (state, action) => state.set(NODE_RATIO, action.payload),
  [SET_NODE_SIZE_RANGE]: (state, action) =>
    state.set(MIN_NODE_SIZE, action.payload.min)
      .set(MAX_NODE_SIZE, action.payload.max),
}, defaultState)