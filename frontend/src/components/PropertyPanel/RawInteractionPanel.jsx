import React, { useState, useEffect } from 'react'
import CyNetworkViewer from '@cytoscape/cy-network-viewer'
import { CytoscapeJsRenderer } from '@cytoscape/cytoscapejs-renderer'
import LoadingPanel from './LoadingPanel'
import { Set } from 'immutable'
import { MAIN_EDGE_TAG } from '../../actions/raw-interactions-util'

import { insertEdgeColorMapping, insertNodeColorMapping } from '../../utils/vs-util'
import CustomPopover from '../CustomPopover'

const Viewer = CyNetworkViewer(CytoscapeJsRenderer)

// TODO: Remove this - this is a special case for Anton's data
const DDRAM_TOOLTIP_KEY = ['pleio', 'systems']
const NODE_COLOR_KEY = 'dominantEvidence'

const RawInteractionPanel = (props) => {
  const {
    uiState,
    subnet,
    networkStyle,
    enrichment,
    enrichmentActions,
    selectedTerm,
    commandActions,
    filters,
    networkAreaStyle,
    setCy,
    setHandleSvg,
  } = props

  // These attributes will be rendered as tooltip text
  const [tooltipKeys, setTooltipKeys] = useState([])

  const [cyReference, setCyReference] = useState(null)
  const [openPopover, setOpenPopover] = useState(false)

  // Custom event handler for node click / tap
  const selectNodes = (nodeIds, nodeProps, rawEvent) => {
    const node = nodeIds[0]
    const props = nodeProps[node]

    // Show popup
    const { pleio, systems } = props
    console.log('##PS', pleio, systems)

    const newSelectionState = {
      networkId: 'raw',
      nodeId: node,
      nodeProps: props,
    }
    // if necessary, app can use selection in Cytoscape.js
    // selectionActions.selectNode(newSelectionState)
  }

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

    const genes = Set(subnet.elements.nodes.map((node) => node.data.name))
    enrichmentActions.runEnrichment(
      'http://amp.pharm.mssm.edu/Enrichr/addList',
      genes,
      selectedTerm,
    )
  }, [uiState.get('runEnrichment'), subnet])

  useEffect(() => {
    // Test subnet to check it has required attributes
    const { elements } = subnet
    const { nodes } = elements
    if (
      nodes[0] === undefined ||
      nodes[0]['data'][NODE_COLOR_KEY] === undefined
    ) {
      return
    }

    // Update visual style if necessary
    let edgeAttrNames = []
    if (filters !== undefined) {
      // Note: this always contains "Score"
      const edgeAttrs = filters.filter(
        (filter) => filter.attributeName !== 'Score',
      )
      edgeAttrNames = edgeAttrs.map((attr) => attr.attributeName)
    }

    const vsClone = insertNodeColorMapping(
      networkStyle,
      NODE_COLOR_KEY,
      edgeAttrNames,
    )
    console.log(networkStyle)

    const primaryEdgeName = subnet.data[MAIN_EDGE_TAG]
    insertEdgeColorMapping({vs: networkStyle, attrName: primaryEdgeName, scoreMin: 0, scoreMax: 1})
    setTooltipKeys(DDRAM_TOOLTIP_KEY)
  }, [networkStyle])

  const commandFinished = (lastCommand, status = {}) => {
    commandActions.clearCommand()
  }
  const hoverOnNode = (nodeId, nodeProps) => {
    console.log('Hover:')
    console.log(nodeId, nodeProps)
  }

  const hoverOutNode = (nodeId, nodeProps) => {
    // console.log("Hover out:")
    console.log(nodeId, nodeProps)
  }

  // Then use it as a custom handler
  const getCustomEventHandlers = () => ({
    selectNodes,
    // selectEdges: selectEdges,
    // hoverOnNode,
    // hoverOutNode,
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
      <React.Fragment>
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
            tooltipKeys,
          }}
          command={props.commands}
          setRendererReference={setCyReference}
        />
        <CustomPopover open={openPopover} />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
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
          tooltipKeys,
        }}
        command={props.commands}
        setRendererReference={setCyReference}
      />
      <CustomPopover open={openPopover} />
    </React.Fragment>
  )
}

const checkPresetLayout = (network) => {
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
