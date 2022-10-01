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
  SET_SEARCH_MODE,
  ENABLE_CUSTOM_STYLING,
  SHOW_PLEIO_EDGES,
  SET_NODE_STYLE
} from '../actions/ui-state'

import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

export const SEARCH_MODE = {
  EXACT: 'exact',
  PREFIX: 'prefix',
  FUZZY: 'fuzzy'
}

// Change coloring
export const NODE_STYLE = {
  MEMBERSHIP: 'Cluster membership',
  CURATION: 'Curation status',
  DOMINANT_EVIDENCE: 'Dominant evidence type',
  PLEIO: 'Pleiotropy',
  BAIT_PREY: 'Bait / Prey',
}

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
  searchMode: SEARCH_MODE.EXACT,
  enableCustomStyling: true,
  showPleioEdges: true,
  nodeStyle: NODE_STYLE.MEMBERSHIP
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
      return state.set('changeViewer', action.payload)
    },
    [SET_DEFAULT_DEPTH]: (state, action) => {
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
      return state.set('filterState', updatedState)
    },
    [SET_SEARCH_MODE]: (state, action) =>
      state.set('searchMode', action.payload),
    [ENABLE_CUSTOM_STYLING]: (state, action) =>
      state.set('enableCustomStyling', action.payload),
    [SHOW_PLEIO_EDGES]: (state, action) =>
      state.set('showPleioEdges', action.payload),
    [SET_NODE_STYLE]: (state, action) =>
      state.set('nodeStyle', action.payload)
  },
  defaultState
)
