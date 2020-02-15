import { createAction } from 'redux-actions'

export const ADD_FILTER = 'ADD_FILTER'
export const REMOVE_FILTER = 'REMOVE_FILTER'

export const ENABLE_FILTER = 'ENABLE_FILTER'


export const addFilter = createAction(ADD_FILTER)
export const removeFilter = createAction(REMOVE_FILTER)
export const enableFilter = createAction(ENABLE_FILTER)

