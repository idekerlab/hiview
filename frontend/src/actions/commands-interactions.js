import { createAction } from 'redux-actions'

/**
 * Actions for raw interaction network viewer
 *
 * @type {string}
 */
export const SELECT_NODES = 'SELECT_NODES'
export const UNSELECT_NODES = 'UNSELECT_NODES'
export const UNSELECT_ALL_NODES = 'UNSELECT_ALL_NODES'
export const FILTER_EDGES = 'FILTER_EDGES'
export const APPLY_LAYOUT = 'APPLY_LAYOUT'
export const EXPAND_EDGES = 'EXPAND_EDGES'
export const COLLAPSE_EDGES = 'COLLAPSE_EDGES'

export const CLEAR_COMMAND = 'CLEAR_COMMAND'

export const FIT = 'FIT'
export const FIT_SELECTED = 'FIT_SELECTED'

export const selectNodes = createAction(SELECT_NODES)
export const unselectNodes = createAction(UNSELECT_NODES)
export const unselectAllNodes = createAction(UNSELECT_ALL_NODES)
export const filterEdges = createAction(FILTER_EDGES)
export const clearCommand = createAction(CLEAR_COMMAND)
export const applyLayout = createAction(APPLY_LAYOUT)
export const fit = createAction(FIT)
export const fitSelected = createAction(FIT_SELECTED)

export const expandEdges = createAction(EXPAND_EDGES)
export const collapseEdges = createAction(COLLAPSE_EDGES)
