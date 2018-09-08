import React, { Component } from 'react'
import SplitPane from 'react-split-pane'

import LeftPanel from './LeftPanel'
import PropertyPanel from '../PropertyPanel'
import BlankPanel from './BlankPanel'

const MIN_WIDTH = 300

const DEF_MAIN_PANEL_WIDTH = 800
const DEF_NETWORK_PANEL_HEIGHT = 600



// Adjustable main split panes
export default class BaseSplitPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      networkPanelHeight: DEF_NETWORK_PANEL_HEIGHT,
      mainPanelWidth: DEF_MAIN_PANEL_WIDTH
    }
  }

  componentDidMount() {
    const width = window.innerWidth
    const height = window.innerHeight

    const leftPanelWidth = width / 2
    const topPanelHeight = height * 0.5

    this.setState({
      networkPanelHeight: topPanelHeight,
      mainPanelWidth: leftPanelWidth
    })
  }

  handleVerticalResize = leftWidth => {
    this.setState({
      mainPanelWidth: leftWidth
    })
    console.log('New Width:', leftWidth)
  }

  handleHorizontalResize = topHeight => {
    console.log('D HOL End:', topHeight)
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
      network,
      messageActions,
      rawInteractionsActions,
      selection,
      selectionActions,
      currentPathActions,
      renderingOptions,
      cxtoolUrl,
      filters,
      filtersActions,
      interactionStyle,
      interactionStyleActions
    } = this.props

    const rightPanelWidth = window.innerWidth - this.state.mainPanelWidth

    return (
      <div>
        <SplitPane
          split="vertical"
          minSize={50}
          size={this.state.mainPanelWidth}
          onDragFinished={leftWidth => this.handleVerticalResize(leftWidth)}
        >

          <LeftPanel {...this.props} />

          {currentProperty.id === null ? (
            <BlankPanel />
          ) : (
            <PropertyPanel
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
              cxtoolUrl={cxtoolUrl}
              enrichment={this.props.enrichment}
              enrichmentActions={this.props.enrichmentActions}
              groups={this.props.groups}
              groupsActions={this.props.groupsActions}
              uiState={uiState}
              uiStateActions={uiStateActions}
              width={rightPanelWidth}
              maxEdgeCount={this.props.rawInteractions.get('maxEdgeCount')}
              originalEdgeCount={this.props.rawInteractions.get(
                'originalEdgeCount'
              )}
            />
          )}
        </SplitPane>
      </div>
    )
  }
}
