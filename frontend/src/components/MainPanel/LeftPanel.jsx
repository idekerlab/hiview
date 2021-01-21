import React, { Component, useEffect, useState } from 'react'
import SplitPane from 'react-split-pane'
import NetworkPanel from '../NetworkPanel'
import AnalysisPanel from '../AnalysisPanel'

const LeftPanel = props => {
  const {
    networkActions,
    commands,
    commandActions,
    events,
    eventActions,
    enrichment,
    uiState,
    uiStateActions,
    currentProperty,
    propertyActions,
    search,
    network,
    messageActions,
    rawInteractionsActions,
    selection,
    selectionActions,
    currentPathActions,
    renderingOptions,
    cxtoolUrl,
    location,
    routeParams,
  } = props

  const [topPanelHeight, setTopPanelHeight] = useState(window.innerHeight * 0.9)
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    props.networkActions.setUuid(props.params.uuid)
    props.networkActions.setServer(props.location.query.server)
    setTopPanelHeight(window.innerHeight - 5)
  }, [])

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
    } else {
      setTopPanelHeight(window.innerHeight * 0.5)
    }
  }, [props.analysisPanelHeight])

  const handleHorizontalResize = newTopPanelHeight => {
    setTopPanelHeight(newTopPanelHeight)
  }
  return (
    <SplitPane
      style={{
        boxSizing: 'border-box',
      }}
      split="horizontal"
      minSize={100}
      defaultSize={window.innerHeight - 5}
      size={topPanelHeight}
      onDragFinished={topPanelHeight => handleHorizontalResize(topPanelHeight)}
    >
      <NetworkPanel
        routeParams={routeParams}
        location={location}
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
        maxEdgeCount={props.rawInteractions.get('maxEdgeCount')}
        autoLoadThreshold={props.rawInteractions.get('autoLoadThreshold')}
        rawInteractionsActions={rawInteractionsActions}
        idmapActions={props.idmapActions}
        datasource={props.datasource}
        selection={selection}
        selectionActions={selectionActions}
        cxtoolUrl={cxtoolUrl}
        currentPathActions={currentPathActions}
        renderingOptions={renderingOptions}
        rawInteractions={props.rawInteractions}
        interactionsCommandActions={props.interactionsCommandActions}
        externalNetworks={props.externalNetworks}
        externalNetworksActions={props.externalNetworksActions}
        goActions={props.goActions}
        localSearch={props.localSearch}
        {...props}
      />

      <AnalysisPanel
        height={window.innerHeight - topPanelHeight}
        data={enrichment.get('result')}
        enrichment={enrichment}
        uiState={uiState}
        uiStateActions={uiStateActions}
        selection={selection}
      />
    </SplitPane>
  )
}

export default LeftPanel
