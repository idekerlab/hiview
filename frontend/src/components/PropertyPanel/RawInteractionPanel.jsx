import React, { useState, useEffect } from 'react'
import CyNetworkViewer from '@cytoscape/cy-network-viewer'
import { CytoscapeJsRenderer } from '@cytoscape/cytoscapejs-renderer'
import LoadingPanel from './LoadingPanel'
import { Set } from 'immutable'
import { MAIN_EDGE_TAG } from '../../actions/raw-interactions-util'

import {
  insertEdgeColorMapping,
  insertNodeColorMapping,
} from '../../utils/vs-util'
import CustomPopover from '../CustomPopover'
import { enableCustomStyling } from '../../actions/ui-state'

const Viewer = CyNetworkViewer(CytoscapeJsRenderer)

// TODO: Remove this - this is a special case for Anton's data
const DDRAM_TOOLTIP_KEY = ['pleio', 'systems', 'dominantEvidence']
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

  const filterState = uiState.get('filterState')

  // For switching VS
  const enableCustomStyling = uiState.get('enableCustomStyling')
  
  const [originalVS, setOriginalVS] = useState(null)

  const [vsUpdated, setVsUpdated] = useState(false)

  // These attributes will be rendered as tooltip text
  const [tooltipKeys, setTooltipKeys] = useState([])

  // Cytoscape.js reference
  const [cyReference, setCyReference] = useState(null)
  const [openPopover, setOpenPopover] = useState(false)

  // Custom event handler for node click / tap
  const selectNodes = (nodeIds, nodeProps, rawEvent) => {
    const node = nodeIds[0]
    const props = nodeProps[node]
  }

  useEffect(() => {
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
    if (originalVS === null) {
      const clone = JSON.parse(JSON.stringify(networkStyle))
      setOriginalVS(clone)
    }

    if (vsUpdated) {
      return
    }

    if (!enableCustomStyling) {
      return
    }

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

    const currentFilters = filterState.toJSON()
    let colorPrimaryEdge = false
    let showPrimary = false
    const primaryEdgeName = subnet.data[MAIN_EDGE_TAG]

    for (const [attributeName, filter] of Object.entries(currentFilters)) {
      const enabled = filter.enabled
      if (attributeName === primaryEdgeName && enabled) {
        showPrimary = true
      } else {
        colorPrimaryEdge = colorPrimaryEdge || enabled
      }
    }

    insertEdgeColorMapping({
      vs: networkStyle,
      attrName: primaryEdgeName,
      scoreMin: 0,
      scoreMax: 1,
    })
    
    setTooltipKeys(DDRAM_TOOLTIP_KEY)

    // Modify style only once
    setVsUpdated(true)
  }, [networkStyle, enableCustomStyling, filterState])

  useEffect(() => {
    const curFilter = filterState.toJSON()
    // console.log('FilterChange', curFilter)
  }, [filterState])

  useEffect(() => {
    if (cyReference !== null) {
      let newStyle = networkStyle.style
      if (!enableCustomStyling) {
        newStyle = originalVS.style
      }
      cyReference.style().fromJson(newStyle).update()
    }
  }, [enableCustomStyling])

  const commandFinished = (lastCommand, status = {}) => {
    commandActions.clearCommand()
  }
  const hoverOnNode = (nodeId, nodeProps) => {
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
