import { handleActions } from "redux-actions";
import { Map } from "immutable";

import {
  SET_NODE_RATIO,
  SET_NODE_SIZE_RANGE,
  SET_EDGE_WIDTH_RANGE,
  SET_NODE_LABEL_RATIO
} from "../actions/rendering-options";

// Sigma.js rendering params
const NODE_RATIO = "nodesPowRatio";
const MIN_NODE_SIZE = "minNodeSize";
const MAX_NODE_SIZE = "maxNodeSize";
const MIN_EDGE_SIZE = "minEdgeSize";
const MAX_EDGE_SIZE = "maxEdgeSize";
const NODE_LABEL_RATIO = "labelSizeRatio";

const defaultState = Map({
  minNodeSize: 2,
  maxNodeSize: 20,
  labelThreshold: 4,
  labelSizeRatio: 1,
  nodesPowRatio: 0.8,
  minEdgeSize: 0.01,
  maxEdgeSize: 0.5
});

export default handleActions(
  {
    [SET_NODE_RATIO]: (state, action) => state.set(NODE_RATIO, action.payload),
    [SET_NODE_LABEL_RATIO]: (state, action) =>
      state.set(NODE_LABEL_RATIO, action.payload),
    [SET_NODE_SIZE_RANGE]: (state, action) =>
      state
        .set(MIN_NODE_SIZE, action.payload.min)
        .set(MAX_NODE_SIZE, action.payload.max),
    [SET_EDGE_WIDTH_RANGE]: (state, action) =>
      state
        .set(MIN_EDGE_SIZE, action.payload.min)
        .set(MAX_EDGE_SIZE, action.payload.max)
  },
  defaultState
);
