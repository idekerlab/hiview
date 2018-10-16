import React from 'react'

import Commands from '../Commands'
import MainMenuPanel from '../MainMenuPanel'
import FullSearch from '../FullSearch'
import BaseSplitPane from './BaseSplitPane'
import Overlay from '../Overlay'
import MessageBox from '../MessageBox'

const CXTOOL_URL = 'http://35.203.154.74:3001/ndex2cyjs/'

/**
 *
 * Top-level component, used as a container of all sub panels
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const MainPanel = props => {
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
    renderingOptionsActions,
    routeParams,
    location,
  } = props

  return (
    <div style={props.style}>
      <Overlay
        uiState={uiState}
        network={network}
        cxUrl={CXTOOL_URL}
        selection={selection}
        location={location}
        routeParams={routeParams}
      />

      <MessageBox uiState={uiState} selection={selection} />

      <MainMenuPanel
        uiState={uiState}
        uiStateActions={uiStateActions}
        maxEdgeCount={props.rawInteractions.get('maxEdgeCount')}
        rawInteractionsActions={props.rawInteractionsActions}
        renderingOptions={renderingOptions}
        renderingOptionsActions={renderingOptionsActions}
      />


      <BaseSplitPane cxtoolUrl={CXTOOL_URL} {...props} />

      <Commands
        commandActions={commandActions}
        uiState={uiState}
        uiStateActions={uiStateActions}
      />

      <FullSearch
        network={network.toJS()}
        commandActions={commandActions}
        searchActions={searchActions}
        search={search}
        currentPath={currentPath}
        uiState={uiState}
        uiStateActions={uiStateActions}
        routeParams={routeParams}
        location={location}
      />
    </div>
  )
}

export default MainPanel
