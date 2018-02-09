import { createAction } from 'redux-actions'

export const ADD_GROUPS = 'ADD_GROUPS'
export const REMOVE_GROUPS = 'REMOVE_GROUPS'

export const addGroups = createAction(ADD_GROUPS)
export const removeGroups = createAction(REMOVE_GROUPS)
