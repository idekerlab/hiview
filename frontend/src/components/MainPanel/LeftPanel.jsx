import React, { Component } from 'react'
import SplitPane from 'react-split-pane'

import NetworkPanel from '../NetworkPanel'

import BottomPanel from '../BottomPanel'
import AnalysisPanel from '../AnalysisPanel'
const mainViewerStyle = {
  background: '#EFEFEF'
}

const networkViewerStyle = {
  background: '#FF00FF',
  width: '100%',
  height: '100%'
}

const propPanelStyle = {
  background: '#EEEEFF',
  width: '100%',
  height: '100%'
}

class LeftPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topPanelHeight: window.innerHeight * 0.9
    }
  }

  componentDidMount() {
    const topPanelHeight = window.innerHeight * 0.9
    this.setState({
      topPanelHeight
    })
  }

  handleHorizontalResize = topPanelHeight => {
    this.setState({
      topPanelHeight
    })
    console.log('Main Panel resize End:', topPanelHeight)
  }

  render() {
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
      routeParams
    } = this.props

    const bottomPanelHeight = window.innerHeight - this.state.topPanelHeight

    return (
      <div>
        <SplitPane
          split="horizontal"
          minSize={100}
          size={this.state.topPanelHeight}
          onDragFinished={topPanelHeight =>
            this.handleHorizontalResize(topPanelHeight)
          }
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
            maxEdgeCount={this.props.rawInteractions.get('maxEdgeCount')}
            autoLoadThreshold={this.props.rawInteractions.get(
              'autoLoadThreshold'
            )}
            rawInteractionsActions={rawInteractionsActions}
            idmapActions={this.props.idmapActions}
            datasource={this.props.datasource}
            selection={selection}
            selectionActions={selectionActions}
            cxtoolUrl={cxtoolUrl}
            currentPathActions={currentPathActions}
            renderingOptions={renderingOptions}
            rawInteractions={this.props.rawInteractions}
            interactionsCommandActions={this.props.interactionsCommandActions}
          />

          <AnalysisPanel
            height={bottomPanelHeight}
            data={enrichment.get('result')}
            enrichment={enrichment}
            uiState={uiState}
            uiStateActions={uiStateActions}
            selection={selection}
          />
        </SplitPane>
      </div>
    )
  }
}

export default LeftPanel
