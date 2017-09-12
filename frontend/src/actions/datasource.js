import { createAction } from 'redux-actions'

export const ADD_DATA_SOURCE = 'ADD_DATA_SOURCE'
export const REMOVE_DATA_SOURCE = 'REMOVE_DATA_SOURCE'

export const addDataSource = createAction(ADD_DATA_SOURCE)
export const removeDataSource = createAction(REMOVE_DATA_SOURCE)
