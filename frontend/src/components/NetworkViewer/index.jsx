import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import NetworkPanel from '../NetworkPanel'
import PropertyPanel from '../PropertyPanel'
import Errorbar from 'material-ui/Snackbar'

import PlotPanel from '../PlotPanel'

import Commands from '../Commands'
import style from './style.css'

import MainMenuPanel from '../MainMenuPanel'

import FullSearch from '../FullSearch'

import SplitPane from 'react-split-pane'

const CXTOOL_URL = 'http://35.203.154.74:3001/ndex2cyjs/'

import { blueGrey } from 'material-ui/colors'

const VIZ_PANEL_STYLE = {
  background: blueGrey[50],
  height: '100%',
  borderTop: 'solid 2px #EEEEEE'
}

/*
  Main Ontology DAG viewer
*/
export default class NetworkViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      autoHideDuration: 1000000,
      open: false,
      plotWidth: 100,
      plotHeight: 100
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

  componentDidMount() {
    this.setState({
      plotWidth: this.plotPanel.offsetWidth,
      plotHeight: this.plotPanel.offsetHeight
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

    let errorMsg = null
    if (errorMsg === null || errorMsg === undefined) {
      errorMsg = 'N/A'
    } else {
      errorMsg = 'ERROR: ' + errorMsg
    }

    return (
      <div style={this.props.style}>
        <MainMenuPanel
          uiState={uiState}
          uiStateActions={uiStateActions}
          maxEdgeCount={this.props.rawInteractions.get('maxEdgeCount')}
          rawInteractionsActions={this.props.rawInteractionsActions}
          renderingOptions={renderingOptions}
          renderingOptionsActions={renderingOptionsActions}
        />

        <SplitPane split="horizontal" defaultSize={350} primary="second">
          <div>
            <NetworkPanel
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
            />
          </div>
          <div style={{ height: '100%', width: '100%' }}>
            <SplitPane split="vertical" defaultSize={100} primary="second">
              <div
                ref={plot => {
                  this.plotPanel = plot
                }}
                style={VIZ_PANEL_STYLE}
              >
                <PlotPanel
                  width={this.state.plotWidth}
                  height={this.state.plotHeight}
                  data={this.props.enrichment.get('result')}
                />
              </div>
              <div
                style={{
                  background: blueGrey[100],
                  height: '100%',
                  width: '100%'
                }}
              />
            </SplitPane>
          </div>
        </SplitPane>

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

        <Errorbar
          className={style.errorbar}
          open={this.state.open}
          message={errorMsg}
          action="Back"
          bodyStyle={{
            backgroundColor: 'rgba(0,0,0,0)',
            fontWeight: 700
          }}
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}
