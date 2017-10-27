import React, {Component} from 'react'
import {browserHistory} from 'react-router'

import ClosableAppBar from '../ClosableAppBar'
import NetworkPanel from '../NetworkPanel'
import PropertyPanel from '../PropertyPanel'
import Errorbar from 'material-ui/Snackbar';

import Commands from '../Commands'
import style from './style.css'


import SimpleSearch from '../SimpleSearch'

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
      events, eventActions, networkId, uiState, uiStateActions,
      backgroundColor, vsActions, datasource, currentProperty, propertyActions,
      searchActions, search, network, config, message, messageActions,
      rawInteractionsActions, rawInteractions, selection, selectionActions

    } = this.props

    let errorMsg = null
    if(errorMsg === null || errorMsg === undefined) {
      errorMsg = 'N/A'
    } else {
      errorMsg = 'ERROR: ' + errorMsg
    }


    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ prop panelUI")
    console.log(this.props)

    return (

      <div style={this.props.style}>

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

          trees={config.get('trees').toJS()}
          currentNetwork={this.props.currentNetwork.toJS()}

          messageActions={messageActions}

          rawInteractionsActions={rawInteractionsActions}

          idmapActions={this.props.idmapActions}

          datasource={this.props.datasource}

          selection={selection}
          selectionActions={selectionActions}
        />

        <Commands
          commandActions={commandActions}
          uiState={uiState}
        />


        <PropertyPanel
          commands={commands}
          commandActions={commandActions}
          events={events}
          currentProperty={currentProperty}
          currentNetwork={this.props.currentNetwork.toJS()}
          trees={config.get('trees').toJS()}
          backendServices={config.get('backendServices').toJS()}
          rawInteractions={this.props.rawInteractions}
          rawInteractionsActions={this.props.rawInteractionsActions}
          selection={selection}
          selectionActions={selectionActions}
        />

        <SimpleSearch
          datasource={this.props.datasource.toJS()}
          network={network.toJS()}
          commandActions={commandActions}
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
