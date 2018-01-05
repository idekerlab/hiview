import { createAction } from 'redux-actions'

export const SHOW_APP_BAR = 'SHOW_APP_BAR'
export const SHOW_COMMANDS = 'SHOW_COMMANDS'
export const SHOW_RESULT = 'SHOW_RESULT'

export const SHOW_SEARCH_WINDOW = 'SHOW_SEARCH_WINDOW'

export const SHOW_MAIN_MENU = 'SHOW_MAIN_MENU'

export const showAppBar = createAction(SHOW_APP_BAR)
export const showCommands = createAction(SHOW_COMMANDS)
export const showResult = createAction(SHOW_RESULT)

export const showMainMenu = createAction(SHOW_MAIN_MENU)

// For showing/hiding search window
export const showSearchWindow = createAction(SHOW_SEARCH_WINDOW)
