import { createAction } from 'redux-actions'

export const SELECT_NODE = 'SELECT_NODE'
export const DESELECT_NODE = 'DESELECT_NODE'

export const ENTER_NODE = 'ENTER_NODE'
export const LEAVE_NODE = 'LEAVE_NODE'

export const SELECT_NODES = 'SELECT_NODES'
export const DESELECT_ALL_NODES = 'DESELECT_ALL_NODES'

export const selectNode = createAction(SELECT_NODE)
export const deselectNode = createAction(DESELECT_NODE)

export const enterNode = createAction(ENTER_NODE)
export const leaveNode = createAction(LEAVE_NODE)


// This is for multiple selection (in circle packing)
export const selectNodes = createAction(SELECT_NODES)
export const deselectAllNodes = createAction(DESELECT_ALL_NODES)
