import { createAction } from 'redux-actions'

export const ADD_STYLE = 'ADD_STYLE'
export const REMOVE_STYLE = 'REMOVE_STYLE'

export const UPDATE_STYLE = 'SET_VALUE'


export const addStyle = createAction(ADD_STYLE)
export const removeStyle = createAction(REMOVE_STYLE)
export const updateStyle = createAction(UPDATE_STYLE)
