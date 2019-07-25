import { createAction } from 'redux-actions'

export const FIND_GENES_STARTED = 'FIND_GENES_STARTED'
export const FIND_GENES_SUCCEEDED = 'FIND_GENES_SUCCEEDED'
export const FIND_GENES_FAILED = 'FIND_GENES_FAILED'

export const findGenesStarted = createAction(FIND_GENES_STARTED)
export const findGenesSucceeded = createAction(FIND_GENES_SUCCEEDED)
export const findGenesFailed = createAction(FIND_GENES_FAILED)
