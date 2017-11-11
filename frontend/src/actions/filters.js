import { createAction } from 'redux-actions'

export const ADD_FILTER = 'ADD_FILTER'
export const REMOVE_FILTER = 'REMOVE_FILTER'

export const SET_VALUE = 'SET_VALUE'
export const ENABLE_FILTER = 'ENABLE_FILTER'


export const addFilter = createAction(ADD_FILTER)
export const removeFilter = createAction(REMOVE_FILTER)
export const setValue = createAction(SET_VALUE)
export const enableFilter = createAction(ENABLE_FILTER)
