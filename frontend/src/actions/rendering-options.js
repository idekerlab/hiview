import { createAction } from 'redux-actions'

export const SET_NODE_RATIO = 'SET_NODE_RATIO'
export const SET_NODE_SIZE_RANGE = 'SET_NODE_SIZE_RANGE'

export const setNodeRatio = createAction(SET_NODE_RATIO)
export const setNodeSizeRange = createAction(SET_NODE_SIZE_RANGE)
