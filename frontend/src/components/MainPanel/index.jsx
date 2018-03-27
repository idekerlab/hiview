import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import NetworkPanel from '../NetworkPanel'
import PropertyPanel from '../PropertyPanel'
import Commands from '../Commands'

import MainMenuPanel from '../MainMenuPanel'
import FullSearch from '../FullSearch'
import SplitPane from 'react-split-pane'

import Overlay from '../Overlay'
import BottomPanel from '../BottomPanel'

const CXTOOL_URL = 'http://35.203.154.74:3001/ndex2cyjs/'

import { blueGrey } from 'material-ui/colors'

const VIZ_PANEL_STYLE = {
  background: blueGrey[50],
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTop: 'solid 2px #aaaaaa'
}

const DEF_BOTTOM_PANEL_HEIGHT = 30

/*
  Main Ontology DAG viewer
*/
export default class MainPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autoHideDuration: 1000000,
      open: false,
      plotWidth: 100,
      plotHeight: 100,
      networkViewWidth: 100,
      networkViewHeight: 100
    }
  }

  handleActionTouchTap = () => {
    this.setState({
      open: false
    })
    browserHistory.push('/')
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }



  render() {
    const {
      networkActions,
      commands,
      commandActions,
      events,
      eventActions,
      uiState,
      uiStateActions,
      currentProperty,
      propertyActions,
      search,
      searchActions,
      network,
      messageActions,
      rawInteractionsActions,
      selection,
      selectionActions,
      filters,
      filtersActions,
      interactionStyle,
      interactionStyleActions,
      currentPathActions,
      currentPath,
      renderingOptions,
      renderingOptionsActions
    } = this.props

    return (
      <div style={this.props.style}>

        <Overlay selection={selection} />

        <MainMenuPanel
          uiState={uiState}
          uiStateActions={uiStateActions}
          maxEdgeCount={this.props.rawInteractions.get('maxEdgeCount')}
          rawInteractionsActions={this.props.rawInteractionsActions}
          renderingOptions={renderingOptions}
          renderingOptionsActions={renderingOptionsActions}
        />

        <BottomPanel
          width={'100%'}
          height={'14em'}
          data={this.props.enrichment.get('result')}
          enrichment={this.props.enrichment}
        />

        <NetworkPanel
          uiState={uiState}
          uiStateActions={uiStateActions}
          width={window.innerWidth}
          height={window.innerHeight}
          networkActions={networkActions}
          commands={commands}
          commandActions={commandActions}
          events={events}
          eventActions={eventActions}
          currentProperty={currentProperty}
          propertyActions={propertyActions}
          network={network}
          search={search}
          messageActions={messageActions}
          maxEdgeCount={this.props.rawInteractions.get('maxEdgeCount')}
          rawInteractionsActions={rawInteractionsActions}
          idmapActions={this.props.idmapActions}
          datasource={this.props.datasource}
          selection={selection}
          selectionActions={selectionActions}
          cxtoolUrl={CXTOOL_URL}
          currentPathActions={currentPathActions}
          renderingOptions={renderingOptions}
          rawInteractions={this.props.rawInteractions}
          interactionsCommandActions={this.props.interactionsCommandActions}
        />

        <Commands commandActions={commandActions} uiState={uiState} />

        <PropertyPanel
          // commands={commands}
          // commandActions={commandActions}
          interactionsCommands={this.props.interactionsCommands}
          interactionsCommandActions={this.props.interactionsCommandActions}
          events={events}
          currentProperty={currentProperty}
          rawInteractions={this.props.rawInteractions}
          rawInteractionsActions={this.props.rawInteractionsActions}
          selection={selection}
          selectionActions={selectionActions}
          filters={filters}
          filtersActions={filtersActions}
          interactionStyle={interactionStyle}
          interactionStyleActions={interactionStyleActions}
          datasource={this.props.datasource}
          network={network}
          cxtoolUrl={CXTOOL_URL}
          enrichment={this.props.enrichment}
          enrichmentActions={this.props.enrichmentActions}
          groups={this.props.groups}
          groupsActions={this.props.groupsActions}
        />

        <FullSearch
          datasource={this.props.datasource.toJS()}
          network={network.toJS()}
          commandActions={commandActions}
          searchActions={searchActions}
          search={search}
          currentPath={currentPath}
          uiState={uiState}
          uiStateActions={uiStateActions}
        />
      </div>
    )
  }
}
