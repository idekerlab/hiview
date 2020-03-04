import {
  SHOW_APP_BAR,
  SHOW_COMMANDS,
  SHOW_RESULT,
  SHOW_SEARCH_WINDOW,
  SHOW_MAIN_MENU,
  SHOW_PLOT_PANEL,
  RUN_ENRICHMENT,
  CHANGE_VIEWER,
  SET_DEFAULT_DEPTH,
  ENABLE_PRIMARY_EDGE,
  SET_FILTER_STATE,
  SET_SEARCH_MODE
} from '../actions/ui-state'

import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

const defaultState = Map({
  showMainMenu: false,
  showAppBar: true,
  showCommands: false,
  showResult: false,
  showSearchWindow: false,
  showPlotPanel: false,
  runEnrichment: false,
  changeViewer: false,
  defaultDepth: 1,
  enablePrimaryEdge: true,
  filterState: Map(),
  termSearchMode: false
})

export default handleActions(
  {
    [SHOW_APP_BAR]: (state, action) => state.set('showAppBar', action.payload),
    [SHOW_COMMANDS]: (state, action) =>
      state.set('showCommands', action.payload),
    [SHOW_RESULT]: (state, action) => state.set('showResult', action.payload),
    [SHOW_SEARCH_WINDOW]: (state, action) =>
      state.set('showSearchWindow', action.payload),
    [SHOW_MAIN_MENU]: (state, action) =>
      state.set('showMainMenu', action.payload),
    [SHOW_PLOT_PANEL]: (state, action) =>
      state.set('showPlotPanel', action.payload),

    [RUN_ENRICHMENT]: (state, action) =>
      state.set('runEnrichment', action.payload),

    [CHANGE_VIEWER]: (state, action) => {
      console.log('UPDATE viewer: ', action)
      return state.set('changeViewer', action.payload)
    },
    [SET_DEFAULT_DEPTH]: (state, action) => {
      console.log('Setting depth: ', action.payload)
      return state.set('defaultDepth', action.payload)
    },
    [ENABLE_PRIMARY_EDGE]: (state, action) =>
      state.set('enablePrimaryEdge', action.payload),
    [SET_FILTER_STATE]: (state, action) => {
      const newState = action.payload
      if(!newState) {
        return state
      }
      const filterName = newState.name
      const sliderPosition = newState.value
      const currentFilterState = state.get('filterState')
      const updatedState = currentFilterState.set(filterName, {value: sliderPosition, enabled: newState.enabled})
      console.log(updatedState.toJS())
      return state.set('filterState', updatedState)
    },
    [SET_SEARCH_MODE]: (state, action) =>
      state.set('termSearchMode', action.payload),

  },
  defaultState
)
