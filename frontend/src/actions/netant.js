import { createAction } from 'redux-actions'

export const NETANT_SEARCH_STARTED = 'NETANT_SEARCH_STARTED'
export const NETANT_SEARCH_SUCCEEDED = 'NETANT_SEARCH_SUCCEEDED'
export const NETANT_SEARCH_FAILED = 'NETANT_SEARCH_FAILED'

export const SET_JOB_ID = 'SET_JOB_ID'
export const CLEAR_ALL = 'CLEAR_ALL'

export const netantSearchStarted = createAction(NETANT_SEARCH_STARTED)
export const netantSearchSucceeded = createAction(NETANT_SEARCH_SUCCEEDED)
export const netantSearchFailed = createAction(NETANT_SEARCH_FAILED)

export const setJobId = createAction(SET_JOB_ID)
export const clearAll = createAction(CLEAR_ALL)