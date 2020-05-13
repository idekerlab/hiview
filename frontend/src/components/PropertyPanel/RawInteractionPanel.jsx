import React, { useState, useEffect } from 'react'
import CyNetworkViewer from '@cytoscape/cy-network-viewer'
import { CytoscapeJsRenderer } from '@cytoscape/cytoscapejs-renderer'
import LoadingPanel from './LoadingPanel'
import { Set } from 'immutable'

const Viewer = CyNetworkViewer(CytoscapeJsRenderer)

const networkAreaStyle = {
  width: '100%',
  height: '100%',
  background: '#555555'
}

const RawInteractionPanel = props => {
  const {
    uiState,
    subnet,
    enrichment,
    enrichmentActions,
    selectedTerm,
    commandActions,
    selectionActions,
    filters
  } = props

  useEffect(() => {
    // Check whether enrichment analysis is required or not
    const runAnalysys = uiState.get('runEnrichment')
    if (!uiState.get('runEnrichment')) {
      return
    }
    if (enrichment.running) {
      return
    }
    if (subnet === null || subnet === undefined) {
      return
    }

    const genes = Set(subnet.elements.nodes.map(node => node.data.name))
    enrichmentActions.runEnrichment(
      'http://amp.pharm.mssm.edu/Enrichr/addList',
      genes,
      selectedTerm
    )
  }, [uiState.get('runEnrichment'), subnet])

  const getMainContents = networkAreaStyle => {
    const t0 = performance.now()

    const newNet = subnet
    const visualStyle = props.networkStyle
    const hidePrimary = !uiState.get('enablePrimaryEdge')

    if (newNet === null || newNet === undefined || visualStyle === null) {
      if (props.loading) {
        return <LoadingPanel message={'Loading network...'} />
      } else {
        return <LoadingPanel message={'Drawing network...'} />
        // return (
        //   <div>
        //     <h3>(Network not available)</h3>
        //   </div>
        // )
      }
    }

    const selected = {
      nodes: props.subnetSelected,
      edges: props.subnetSelectedEdge,
      nodesPerm: props.subnetSelectedPerm,
      edgesPerm: props.subnetSelectedEdgePerm
    }

    const hidden = {
      nodes: [],
      edges: []
    }

    if (filters === null || filters.length === 0) {
      return (
        <Viewer
          key="subNetworkView"
          network={subnet}
          selected={selected}
          hidden={hidden}
          hidePrimary={hidePrimary}
          networkType={'cyjs'}
          networkStyle={visualStyle}
          style={networkAreaStyle}
          eventHandlers={getCustomEventHandlers()}
          rendererOptions={{
            layout: checkPresetLayout(subnet)
          }}
          command={props.commands}
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

    console.log(
      '!!!!!!!!!!!##################CyViewer loaded::',
      performance.now() - t0
    )
    return (
      <Viewer
        key="subNetworkView"
        network={subnet}
        selected={selected}
        hidden={hidden}
        hidePrimary={hidePrimary}
        networkType={'cyjs'}
        networkStyle={visualStyle}
        style={networkAreaStyle}
        eventHandlers={getCustomEventHandlers()}
        rendererOptions={{
          layout: checkPresetLayout(subnet)
        }}
        command={props.commands}
      />
    )
  }

  const selectNodes = (nodeIds, nodeProps) => {
    const node = nodeIds[0]
    const props = nodeProps[node]

    const newSelectionState = {
      networkId: 'raw',
      nodeId: node,
      nodeProps: props
    }

    selectionActions.selectNode(newSelectionState)
  }

  const commandFinished = (lastCommand, status = {}) => {
    commandActions.clearCommand()
  }

  // Then use it as a custom handler
  const getCustomEventHandlers = () => ({
    selectNodes,
    // selectEdges: selectEdges,
    commandFinished
  })

  return getMainContents(networkAreaStyle)
}

const checkPresetLayout = network => {
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
export default RawInteractionPanel
