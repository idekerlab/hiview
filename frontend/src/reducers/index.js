import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import current_vs from './currentvs'
import visual_styles from './visualstyles'
import cy_commands from './cycommands'
import cy_events from './cy-events'
import ui_state from './ui-state'
import datasource from './datasource'
import property from './property'
import filters from './filters'
import interaction_style from './interaction-style'

import search from './search'
import network from './network'
import interactions_commands from './commands-interactions'

import raw_interactions from './raw-interactions'
import query_genes from './query-genes'

import message from './message'
import idmap from './idmap'

import selection from './selection'
import current_path from './current-path'

import rendering_options from './rendering-options'


// Application states
const app_manager = combineReducers({
  current_vs,
  current_property: property,

  commands: cy_commands,
  cy_events,
  ui_state,
  search,
  query_genes,
  message,
  selection,
  interactions_commands,
  current_path
})


export default combineReducers({
  routing,
  app_manager,
  visual_styles,
  network,
  datasource,
  raw_interactions,
  idmap,
  filters,
  interaction_style,
  rendering_options
})
