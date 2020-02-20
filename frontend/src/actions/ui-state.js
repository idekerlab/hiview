import { createAction } from 'redux-actions'

export const SHOW_APP_BAR = 'SHOW_APP_BAR'
export const SHOW_COMMANDS = 'SHOW_COMMANDS'
export const SHOW_RESULT = 'SHOW_RESULT'

export const SHOW_SEARCH_WINDOW = 'SHOW_SEARCH_WINDOW'

export const SHOW_MAIN_MENU = 'SHOW_MAIN_MENU'

export const ENABLE_PRIMARY_EDGE = 'ENABLE_PRIMARY_EDGE'
export const SET_FILTER_STATE = 'SET_FILTER_STATE'


// State of the enrichment result
export const SHOW_PLOT_PANEL = 'SHOW_PLOT_PANEL'
export const RUN_ENRICHMENT = 'RUN_ENRICHMENT'

export const SET_DEFAULT_DEPTH = 'SET_DEFAULT_DEPTH'

export const CHANGE_VIEWER = 'CHANGE_VIEWER'


export const showAppBar = createAction(SHOW_APP_BAR)
export const showCommands = createAction(SHOW_COMMANDS)
export const showResult = createAction(SHOW_RESULT)

export const showMainMenu = createAction(SHOW_MAIN_MENU)

export const showPlotPanel = createAction(SHOW_PLOT_PANEL)

// For showing/hiding search window
export const showSearchWindow = createAction(SHOW_SEARCH_WINDOW)

// RUN enrichment or not
export const runEnrichment = createAction(RUN_ENRICHMENT)

// Switch viewer type
export const changeViewer = createAction(CHANGE_VIEWER)

// Default expand depth of the CP viewer
export const setDefaultDepth = createAction(SET_DEFAULT_DEPTH)

export const enablePrimaryEdge = createAction(ENABLE_PRIMARY_EDGE)
export const setFilterState = createAction(SET_FILTER_STATE)
