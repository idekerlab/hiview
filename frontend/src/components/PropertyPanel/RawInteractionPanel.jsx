import React, { useState, useEffect } from 'react'
import CyNetworkViewer from '@cytoscape/cy-network-viewer'
import { CytoscapeJsRenderer } from '@cytoscape/cytoscapejs-renderer'
import LoadingPanel from './LoadingPanel'
import { Set } from 'immutable'

const Viewer = CyNetworkViewer(CytoscapeJsRenderer)

// Custom event handler
const selectNodes = (nodeIds, nodeProps) => {
  const node = nodeIds[0]
  const props = nodeProps[node]

  const newSelectionState = {
    networkId: 'raw',
    nodeId: node,
    nodeProps: props,
  }

  // if necessary, app can use selection in Cytoscape.js
  // selectionActions.selectNode(newSelectionState)
}

const RawInteractionPanel = props => {
  const t0 = performance.now()

  const {
    uiState,
    subnet,
    enrichment,
    enrichmentActions,
    selectedTerm,
    commandActions,
    filters,
    networkAreaStyle,
    setCy,
    setHandleSvg,
  } = props

  const [cyReference, setCyReference] = useState(null)

  useEffect(() => {
    console.log('*Cytoscape instance assigned:', cyReference)
    if (cyReference) {
      setCy(cyReference)
    }
  }, [cyReference])

  useEffect(() => {
    // Check whether enrichment analysis is required or not
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
    enrichmentActions.runEnrichment('http://amp.pharm.mssm.edu/Enrichr/addList', genes, selectedTerm)
  }, [uiState.get('runEnrichment'), subnet])

  const commandFinished = (lastCommand, status = {}) => {
    commandActions.clearCommand()
  }

  // Then use it as a custom handler
  const getCustomEventHandlers = () => ({
    selectNodes,
    // selectEdges: selectEdges,
    commandFinished,
  })

  const newNet = subnet
  const visualStyle = props.networkStyle
  const hidePrimary = !uiState.get('enablePrimaryEdge')

  if (newNet === null || newNet === undefined || visualStyle === null) {
    if (props.loading) {
      return <LoadingPanel message={'Loading network...'} />
    } else {
      return <div>Finalizing...</div>
    }
  }

  const selected = {
    nodes: props.subnetSelected,
    edges: props.subnetSelectedEdge,
    nodesPerm: props.subnetSelectedPerm,
    edgesPerm: props.subnetSelectedEdgePerm,
  }

  const hidden = {
    nodes: [],
    edges: [],
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
          layout: checkPresetLayout(subnet),
        }}
        command={props.commands}
        setRendererReference={setCyReference}
      />
    )
  }

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
        layout: checkPresetLayout(subnet),
      }}
      command={props.commands}
      setRendererReference={setCyReference}
    />
  )
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
