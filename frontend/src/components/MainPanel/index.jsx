import React, { Component } from 'react'
import { browserHistory } from 'react-router'

import PropertyPanel from '../PropertyPanel'
import Commands from '../Commands'

import MainMenuPanel from '../MainMenuPanel'
import FullSearch from '../FullSearch'
import SplitPane from 'react-split-pane'
import BaseSplitPane from './BaseSplitPane'

import Overlay from '../Overlay'
import MessageBox from '../MessageBox'

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
      commandActions,
      uiState,
      uiStateActions,
      search,
      searchActions,
      network,
      selection,
      currentPath,
      renderingOptions,
      renderingOptionsActions
    } = this.props

    return (
      <div style={this.props.style}>
        <Overlay
          uiState={uiState}
          network={network}
          datasource={this.props.datasource}
          cxtoolUrl={CXTOOL_URL}
          selection={selection}
        />

        <MessageBox uiState={uiState} selection={selection} />

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
          uiState={uiState}
          uiStateActions={uiStateActions}
          selection={selection}
        />

        <BaseSplitPane cxtoolUrl={CXTOOL_URL} {...this.props} />

        <Commands
          commandActions={commandActions}
          uiState={uiState}
          uiStateActions={uiStateActions}
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
