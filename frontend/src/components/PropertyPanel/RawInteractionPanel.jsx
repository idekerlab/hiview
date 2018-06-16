import React, { Component } from 'react'
import CyNetworkViewer from 'cy-network-viewer'
import { CytoscapeJsRenderer } from 'cytoscapejs-renderer'

import { Set } from 'immutable'

const Viewer = CyNetworkViewer(CytoscapeJsRenderer)

class RawInteractionPanel extends Component {


  componentWillReceiveProps(nextProps) {

    const runAnalysys = nextProps.uiState.get('runEnrichment')

    if(!runAnalysys) {
      return
    }

    const newNetwork = nextProps.subnet

    const running = nextProps.enrichment.get('running')
    const lastRunning = this.props.enrichment.get('running')

    if (lastRunning && running) {
      return
    }

    if(newNetwork === null || newNetwork === undefined) {
      return
    }

    const genes = Set(newNetwork.elements.nodes.map(node => node.data.name))

    const subsystemId = this.props.enrichment.get('subsystemId')
    const nextSubsystemId = nextProps.selectedTerm

    if (subsystemId === null || (subsystemId !== nextSubsystemId)) {


      if(lastRunning) {
        return
      }

      this.props.enrichmentActions.runEnrichment(
        'http://amp.pharm.mssm.edu/Enrichr/addList',
        genes,
        nextSubsystemId
      )
    }
  }

  render() {
    // Style of this component's area
    let containerStyle = {
      width: '100%',
      height: this.props.panelHeight,
      background: '#000000',
      flexGrow: 3
    }

    const networkAreaStyle = {
      width: this.props.panelWidth,
      height: '100%',
      top: 0,
      right: 0,
      position: 'relative'
    }

    return (
      <div style={containerStyle}>{this.getMainContents(networkAreaStyle)}</div>
    )
  }

  getMainContents = networkAreaStyle => {
    const newNet = this.props.subnet
    const visualStyle = this.props.networkStyle

    if (newNet === null || newNet === undefined || visualStyle === null) {
      return <div />

    }

    const filters = this.props.filters

    if (filters === null || filters.length === 0) {
      return
    }

    let primaryFilter = null
    const filterNames = []
    const filterMap = {}

    filters.forEach(filter => {
      const isPrimary = filter.isPrimary
      if (isPrimary) {
        primaryFilter = filter
      } else {
        filterNames.push(filter.attributeName)
        filterMap[filter.attributeName] = filter
      }
    })

    return (
      <Viewer
        key="subNetworkView"
        network={this.props.subnet}
        networkType={'cyjs'}
        networkStyle={visualStyle}
        style={networkAreaStyle}
        eventHandlers={this.getCustomEventHandlers()}
        rendererOptions={{
          layout: 'cose-bilkent',
          defaultFilter: {
            command: 'filter',
            parameters: {
              options: {
                type: 'numeric',
                isPrimary: true,
                range:
                  '[' +
                  primaryFilter.attributeName +
                  ' < ' +
                  primaryFilter.threshold +
                  ']'
              }
            }
          }
        }}
        command={this.props.commands}
      />
    )
  }

  selectNodes = (nodeIds, nodeProps) => {
    const node = nodeIds[0]
    const props = nodeProps[node]

    const newSelectionState = {
      networkId: 'raw',
      nodeId: node,
      nodeProps: props
    }

    this.props.selectionActions.selectNode(newSelectionState)
  }


  commandFinished = (lastCommand, status = {}) => {
    this.props.commandActions.clearCommand()
  }

  // Then use it as a custom handler
  getCustomEventHandlers = () => ({
    selectNodes: this.selectNodes,
    // selectEdges: this.selectEdges,
    commandFinished: this.commandFinished
  })
}

export default RawInteractionPanel
