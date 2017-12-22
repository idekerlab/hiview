import { createAction } from 'redux-actions'

export const SET_PATH = 'SET_PATH'
export const REMOVE_PATH = 'REMOVE_PATH'

export const setPath = createAction(SET_PATH)
export const removePath = createAction(REMOVE_PATH)
