import { createAction } from 'redux-actions'

/**
 * Actions for raw interaction network viewer
 *
 * @type {string}
 */
export const SELECT_NODES = 'SELECT_NODES'
export const UNSELECT_NODES = 'UNSELECT_NODES'

export const selectNodes = createAction(SELECT_NODES)
export const unselectNodes = createAction(UNSELECT_NODES)

