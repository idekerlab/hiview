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

// Gene or systems
export const SET_SEARCH_MODE = 'SET_SEARCH_MODE'

// For Anton's data only - should be removed
export const ENABLE_CUSTOM_STYLING = 'ENABLE_CUSTOM_STYLING'

// Show / Hide pleiotropic edges
export const SHOW_PLEIO_EDGES = 'SHOW_PLEIO_EDGES'

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

export const setSearchMode = createAction(SET_SEARCH_MODE)

export const enableCustomStyling = createAction(ENABLE_CUSTOM_STYLING)

export const showPleioEdges = createAction(SHOW_PLEIO_EDGES)
