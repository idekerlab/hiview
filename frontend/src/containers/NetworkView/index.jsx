import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as commandActions from '../../actions/commands'
import * as eventActions from '../../actions/cyjs'
import * as uiStateActions from '../../actions/ui-state'
import * as vsActions from '../../reducers/visualstyles'
import * as currentVsActions from '../../reducers/currentvs'


import NetworkViewer from '../../components/NetworkViewer'

import * as propertyActions from '../../actions/property'
import * as searchActions from '../../actions/search'

import * as networkActions from '../../actions/network'

import {grey50} from 'material-ui/styles';

import * as queryGenesActions from '../../actions/query-genes'

import * as messageActions from '../../actions/message'

import * as rawInteractionsActions from '../../actions/raw-interactions'

import * as idmapActions from '../../actions/idmap'
import * as selectionActions from '../../actions/selection'

import * as filtersActions from '../../actions/filters'
import * as interactionStyleActions from '../../actions/interaction-style'

import * as interactionsCommandsActions from '../../actions/commands-interactions'

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import {lightBlue, red} from 'material-ui/colors'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    error: red,
  },
});


const baseStyle = {
  'left': 0,
  'position': 'fixed',
  'top': 0,
  'zIndex': 0,
  'background': grey50,
  'height': '100%',
  'width': '100%',
}

/**
 * Base component for the network viewer page.
 */
class NetworkView extends Component {

  render() {

    const networkId = this.props.params.uri

    return (
      <MuiThemeProvider theme={theme}>
        <NetworkViewer
          {...this.props}
          networkId={networkId}
          style={baseStyle}
        />
      </MuiThemeProvider>
    )
  }

}

function mapStateToProps(state) {

  return {
    'currentProperty': state.app_manager.current_property,
    'search': state.app_manager.search,
    'commands': state.app_manager.commands,
    'interactionsCommands': state.app_manager.interactions_commands,
    'events': state.app_manager.cy_events,
    'uiState': state.app_manager.ui_state,
    'styles': state.visual_styles,
    'currentVs': state.app_manager.current_vs,

    'datasource': state.datasource,

    'network': state.network,

    'rawInteractions': state.raw_interactions,

    'config': state.config,

    'queryGenes': state.app_manager.query_genes,
    'message': state.app_manager.message,

    'idmap': state.idmap,
    'selection': state.app_manager.selection,
    'filters': state.filters,
    'interactionStyle': state.interaction_style,

  }

}

function mapDispatchToProps(dispatch) {

  return {

    // Main ontology tree
    'networkActions': bindActionCreators(networkActions, dispatch),

    // Raw interactions
    'rawInteractionsActions': bindActionCreators(rawInteractionsActions, dispatch),

    // ID Mapping
    'idmapActions': bindActionCreators(idmapActions, dispatch),

    'commandActions': bindActionCreators(commandActions, dispatch),
    'interactionsCommandActions': bindActionCreators(interactionsCommandsActions, dispatch),
    'eventActions': bindActionCreators(eventActions, dispatch),
    'uiStateActions': bindActionCreators(uiStateActions, dispatch),
    'vsActions': bindActionCreators(vsActions, dispatch),
    'currentVsActions': bindActionCreators(currentVsActions, dispatch),

    'propertyActions': bindActionCreators(propertyActions, dispatch),
    'searchActions': bindActionCreators(searchActions, dispatch),

    'queryGenesActions': bindActionCreators(queryGenesActions, dispatch),

    'messageActions': bindActionCreators(messageActions, dispatch),

    'selectionActions': bindActionCreators(selectionActions, dispatch),

    'filtersActions': bindActionCreators(filtersActions, dispatch),
    'interactionStyleActions': bindActionCreators(interactionStyleActions, dispatch),
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NetworkView)
