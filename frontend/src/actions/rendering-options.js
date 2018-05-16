import { createAction } from 'redux-actions'

export const SET_NODE_RATIO = 'SET_NODE_RATIO'
export const SET_NODE_SIZE_RANGE = 'SET_NODE_SIZE_RANGE'
export const SET_EDGE_WIDTH_RANGE = 'SET_EDGE_WIDTH_RANGE'
export const SET_NODE_LABEL_RATIO = 'SET_NODE_LABEL_RATIO'

export const SET_ROOT_COLOR = 'SET_ROOT_COLOR'
export const SET_LEAF_COLOR = 'SET_LEAF_COLOR'


export const setNodeRatio = createAction(SET_NODE_RATIO)
export const setNodeSizeRange = createAction(SET_NODE_SIZE_RANGE)
export const setEdgeWidthRange = createAction(SET_EDGE_WIDTH_RANGE)
export const setNodeLabelRatio = createAction(SET_NODE_LABEL_RATIO)

export const setRootColor = createAction(SET_ROOT_COLOR)
export const setLeafColor = createAction(SET_LEAF_COLOR)
