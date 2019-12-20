import React, { Component } from 'react'
import CyNetworkViewer from '@cytoscape/cy-network-viewer'
import { CytoscapeJsRenderer } from '@cytoscape/cytoscapejs-renderer'

import { Set } from 'immutable'

const Viewer = CyNetworkViewer(CytoscapeJsRenderer)

class RawInteractionPanel extends Component {
  componentWillReceiveProps(nextProps) {
    const runAnalysys = nextProps.uiState.get('runEnrichment')

    if (!runAnalysys) {
      return
    }

    const newNetwork = nextProps.subnet

    const running = nextProps.enrichment.get('running')
    const lastRunning = this.props.enrichment.get('running')

    if (lastRunning && running) {
      return
    }

    if (newNetwork === null || newNetwork === undefined) {
      return
    }

    const genes = Set(newNetwork.elements.nodes.map(node => node.data.name))

    const subsystemId = this.props.enrichment.get('subsystemId')
    const nextSubsystemId = nextProps.selectedTerm

    if (subsystemId === null || subsystemId !== nextSubsystemId) {
      if (lastRunning) {
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
    const networkAreaStyle = {
      width: '100%',
      height: '100%',
      background: '#555555'
    }

    return this.getMainContents(networkAreaStyle)
  }

  getMainContents = networkAreaStyle => {
    const newNet = this.props.subnet
    const visualStyle = this.props.networkStyle

    if (newNet === null || newNet === undefined || visualStyle === null) {
      return (
        <div>
          <h3>(Network not available)</h3>
        </div>
      )
    }

    const selected = {
      nodes: this.props.subnetSelected,
      edges: this.props.subnetSelectedEdge,
      nodesPerm: this.props.subnetSelectedPerm,
      edgesPerm: this.props.subnetSelectedEdgePerm
    }

    const filters = this.props.filters

    if (filters === null || filters.length === 0) {
      return (
        <Viewer
          key="subNetworkView"
          network={this.props.subnet}
          selected={selected}
          networkType={'cyjs'}
          networkStyle={visualStyle}
          style={networkAreaStyle}
          eventHandlers={this.getCustomEventHandlers()}
          rendererOptions={{
            layout: this.checkPresetLayout(this.props.subnet)
          }}
          command={this.props.commands}
        />
      )
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

    // const selected = {
    //   nodes: this.props.subnetSelected,
    //   edges: this.props.subnetSelectedEdge,
    //   nodesPerm: this.props.subnetSelectedPerm,
    //   edgesPerm: this.props.subnetSelectedEdgePerm
    // }

    return (
      <Viewer
        key="subNetworkView"
        network={this.props.subnet}
        selected={selected}
        networkType={'cyjs'}
        networkStyle={visualStyle}
        style={networkAreaStyle}
        eventHandlers={this.getCustomEventHandlers()}
        rendererOptions={{
          layout: this.checkPresetLayout(this.props.subnet)
        }}
        command={this.props.commands}
      />
    )
  }

  checkPresetLayout = network => {
    const nodes = network.elements.nodes
    const sampleNode = nodes[0]

    if (!sampleNode) {
      return 'cose-bilkent'
    }

    const position = sampleNode.position
    if (!position || (position.x === 0 && position.y === 0)) {
      return 'cose-bilkent'
    } else {
      return 'preset'
    }
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

  selectEdges = (edgeIds, edgeProps) => {
    // console.log('Selected Edge:', edgeIds, edgeProps)
  }

  commandFinished = (lastCommand, status = {}) => {
    this.props.commandActions.clearCommand()
  }

  // Then use it as a custom handler
  getCustomEventHandlers = () => ({
    selectNodes: this.selectNodes,
    selectEdges: this.selectEdges,
    commandFinished: this.commandFinished
  })
}

const bfs = (node, target) => {
  const id = node.data.id

  if (target === id) {
    return node
  }

  const children = node.children
  if (!children || children.length == 0) {
    return null
  }
  return children.forEach(child => bfs(child, target))
}

export default RawInteractionPanel
