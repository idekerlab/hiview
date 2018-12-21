import { createAction } from 'redux-actions'

export const HIGHLIGHT_NODE = 'HIGHLIGHT_NODE'
export const REMOVE_HIGHLIGHT_NODE = 'REMOVE_HIGHLIGHT_NODE'

export const SELECT_NODE = 'SELECT_NODE'
export const DESELECT_NODE = 'DESELECT_NODE'

export const ENTER_NODE = 'ENTER_NODE'
export const LEAVE_NODE = 'LEAVE_NODE'

// For CTR-CLICK selection
export const SELECT_SUB_NODE = 'SELECT_SUB_NODE'
export const DESELECT_SUB_NODE = 'DESELECT_SUB_NODE'
export const DESELECT_ALL_SUB_NODES = 'DESELECT_ALL_SUB_NODES'


export const highlightNode = createAction(HIGHLIGHT_NODE)
export const removeHighlightNode = createAction(REMOVE_HIGHLIGHT_NODE)
export const selectNode = createAction(SELECT_NODE)
export const deselectNode = createAction(DESELECT_NODE)

export const enterNode = createAction(ENTER_NODE)
export const leaveNode = createAction(LEAVE_NODE)


// This is for multiple selection (in circle packing)
export const selectSubNode = createAction(SELECT_SUB_NODE)
export const deselectSubNode = createAction(DESELECT_SUB_NODE)
export const deselectAllSubNodes = createAction(DESELECT_ALL_SUB_NODES)
