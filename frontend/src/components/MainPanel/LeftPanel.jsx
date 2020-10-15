import React, { Component } from 'react'
import SplitPane from 'react-split-pane'
import NetworkPanel from '../NetworkPanel'
import AnalysisPanel from '../AnalysisPanel'

class LeftPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topPanelHeight: window.innerHeight * 0.9
    }
  }

  componentDidMount() {
    this.props.networkActions.setUuid(this.props.params.uuid)
    this.props.networkActions.setServer(this.props.location.query.server)
    const topPanelHeight = window.innerHeight - 100
    this.setState({
      topPanelHeight
    })
  }

  handleHorizontalResize = topPanelHeight => {
    this.setState({
      topPanelHeight
    })
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
      <SplitPane
        style={{
          boxSizing: 'border-box'
        }}
        split="horizontal"
        minSize={100}
        size={window.innerHeight - 5}
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
          externalNetworks={this.props.externalNetworks}
          externalNetworksActions={this.props.externalNetworksActions}
          goActions={this.props.goActions}
          localSearch={this.props.localSearch}
          {...this.props}
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
    )
  }
}

export default LeftPanel
