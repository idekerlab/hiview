import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import NetworkPanel from '../NetworkPanel'
import PropertyPanel from '../PropertyPanel'
import Errorbar from 'material-ui/Snackbar';

import Commands from '../Commands'
import style from './style.css'

import MainMenuPanel from '../MainMenuPanel'

import FullSearch from '../FullSearch'


const CXTOOL_URL = 'http://35.203.154.74:3001/ndex2cyjs/'

/*
  Main Ontology DAG viewer
*/
export default class NetworkViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 1000000,
      open: false,
    };
  }

  handleActionTouchTap = () => {
    this.setState({
      open: false,
    });
    browserHistory.push('/')
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };


  render() {

    const {
      networkActions,
      commands, commandActions,
      events, eventActions, uiState, uiStateActions, currentProperty, propertyActions,
      search, searchActions, network, messageActions,
      rawInteractionsActions, selection, selectionActions,
      filters, filtersActions, interactionStyle, interactionStyleActions,
      currentPathActions, currentPath
    } = this.props

    let errorMsg = null
    if(errorMsg === null || errorMsg === undefined) {
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
        />

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
        />

        <Commands
          commandActions={commandActions}
          uiState={uiState}
        />


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
          action='Back'
          bodyStyle={{
            backgroundColor: 'rgba(0,0,0,0)',
            fontWeight: 700,
          }}
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />

      </div>
    )
  }
}
