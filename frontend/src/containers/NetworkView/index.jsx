import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as commandActions from '../../actions/commands'
import * as eventActions from '../../actions/cyjs'
import * as uiStateActions from '../../actions/ui-state'
import * as vsActions from '../../reducers/visualstyles'
import * as currentVsActions from '../../reducers/currentvs'

import * as currentPathActions from '../../actions/current-path'

import MainPanel from '../../components/MainPanel'

import * as propertyActions from '../../actions/property'
import * as searchActions from '../../actions/search'

import * as networkActions from '../../actions/network'

import { grey50 } from '@material-ui/core/styles'

import * as queryGenesActions from '../../actions/query-genes'
import * as messageActions from '../../actions/message'
import * as rawInteractionsActions from '../../actions/raw-interactions'
import * as idmapActions from '../../actions/idmap'
import * as selectionActions from '../../actions/selection'
import * as filtersActions from '../../actions/filters'
import * as interactionStyleActions from '../../actions/interaction-style'

import * as interactionsCommandsActions from '../../actions/commands-interactions'

import * as enrichmentActions from '../../actions/enrichment'
import * as groupsActions from '../../actions/groups'

import { MuiThemeProvider } from '@material-ui/core/styles'

import { theme } from '../theme'
import 'typeface-roboto'

import * as renderingOptionsActions from '../../actions/rendering-options'
import * as externalNetworksActions from '../../actions/external-networks'
import * as goActions from '../../actions/go'
import * as localSearchActions from '../../actions/local-search'

const baseStyle = {
  boxSizing: 'border-box',
  zIndex: 0,
  background: grey50,
  height: '100%',
  width: '100%',
  margin: 0,
  padding: 0
}

/**
 * Base component for the network viewer page.
 */
class NetworkView extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <MainPanel {...this.props} style={baseStyle} />
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentProperty: state.app_manager.current_property,
    search: state.app_manager.search,
    commands: state.app_manager.commands,
    interactionsCommands: state.app_manager.interactions_commands,
    events: state.app_manager.cy_events,
    uiState: state.app_manager.ui_state,
    styles: state.visual_styles,
    currentVs: state.app_manager.current_vs,

    datasource: state.datasource,

    network: state.network,

    rawInteractions: state.raw_interactions,

    config: state.config,

    queryGenes: state.app_manager.query_genes,
    message: state.app_manager.message,

    idmap: state.idmap,
    selection: state.app_manager.selection,
    filters: state.filters,
    interactionStyle: state.interaction_style,

    currentPath: state.app_manager.current_path,

    renderingOptions: state.rendering_options,
    enrichment: state.enrichment,
    groups: state.groups,
    externalNetworks: state.externalNetworks,
    go: state.go,
    localSearch: state.localSearch
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // Main ontology tree
    networkActions: bindActionCreators(networkActions, dispatch),

    // Raw interactions
    rawInteractionsActions: bindActionCreators(
      rawInteractionsActions,
      dispatch
    ),

    // ID Mapping
    idmapActions: bindActionCreators(idmapActions, dispatch),

    commandActions: bindActionCreators(commandActions, dispatch),
    interactionsCommandActions: bindActionCreators(
      interactionsCommandsActions,
      dispatch
    ),
    eventActions: bindActionCreators(eventActions, dispatch),
    uiStateActions: bindActionCreators(uiStateActions, dispatch),
    vsActions: bindActionCreators(vsActions, dispatch),
    currentVsActions: bindActionCreators(currentVsActions, dispatch),

    propertyActions: bindActionCreators(propertyActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),

    queryGenesActions: bindActionCreators(queryGenesActions, dispatch),

    messageActions: bindActionCreators(messageActions, dispatch),

    selectionActions: bindActionCreators(selectionActions, dispatch),

    filtersActions: bindActionCreators(filtersActions, dispatch),
    interactionStyleActions: bindActionCreators(
      interactionStyleActions,
      dispatch
    ),

    currentPathActions: bindActionCreators(currentPathActions, dispatch),

    renderingOptionsActions: bindActionCreators(
      renderingOptionsActions,
      dispatch
    ),
    enrichmentActions: bindActionCreators(enrichmentActions, dispatch),
    groupsActions: bindActionCreators(groupsActions, dispatch),
    externalNetworksActions: bindActionCreators(
      externalNetworksActions,
      dispatch
    ),
    goActions: bindActionCreators(goActions, dispatch),
    localSearchActions: bindActionCreators(localSearchActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkView)
