import Cytoscape from 'cytoscape'
import COSEBilkent from 'cytoscape-cose-bilkent'

import React, { useEffect, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

Cytoscape.use(COSEBilkent)

import DEFAULT_STYLE from './visualstyle'
import './style.css'
import Warning from './Warning'
import LoadingPanel from '../PropertyPanel/LoadingPanel'
let cyInstance = null

const BASE_STYLE = { width: '100%', height: '100%', background: '#222522' }

const PRESET_LAYOUT = {
  name: 'preset',
  padding: 6
}

const COCENTRIC_LAYOUT = {
  name: 'concentric',
  padding: 6,
  minNodeSpacing: 100
}

const COSE_SETTING = {
  name: 'cose-bilkent',
  nodeRepulsion: 1,
  idealEdgeLength: 60,
  gravity: 0.01,
  tile: true,
  nodeDimensionsIncludeLabels: true
}

const CytoscapeViewer = props => {
  const [initialized, initialize] = useState(false)
  const { selectedNodes, layoutName } = props.externalNetworks

  useEffect(() => {
    if (cyInstance === undefined || cyInstance === null) {
      return
    }

    if (selectedNodes.length !== 0) {
      cyInstance.nodes().unselect()

      const modified = selectedNodes.map(node => '[name="' + node + '"]')

      const queryStr = modified.join(',')

      cyInstance
        .nodes()
        .filter(queryStr)
        .select()
    }

    const { externalNetworks, externalNetworksActions } = props

    if (externalNetworks !== undefined && externalNetworks.command !== null) {
      cyInstance.fit()
      externalNetworksActions.setCommand(null)
    }

    if (!initialized) {
      cyInstance.on('tap', function(event) {
        try {
          cyInstance.nodes().removeClass('connected')
          const target = event.target
          if (target === cyInstance) {
            if (props.networkActions !== undefined) {
              props.networkActions.deselectAll()
            }
          }
        } catch (e) {
          console.warn(e)
        }
      })

      cyInstance.on('tap', 'node', function() {
        try {
          cyInstance.nodes().removeClass('connected')
          const selected = this.data()
          if (props.networkActions !== undefined) {
            props.networkActions.selectNode(selected)
          }
        } catch (e) {
          console.warn(e)
        }
      })

      cyInstance.on('tap', 'edge', function() {
        try {
          cyInstance.nodes().removeClass('connected')
          const selected = this.data()
          const { source, target } = selected

          cyInstance.$('#' + source + ', #' + target).addClass('connected')

          if (props.networkActions !== undefined) {
            props.networkActions.selectEdge(selected)
          }
        } catch (e) {
          console.warn(e)
        }
      })

      initialize(true)
    }

    return () => {}
  }, [props.externalNetworks])

  const isLoading = props.externalNetworks.loading
  if (isLoading) {
    return <LoadingPanel {...props} />
  }

  const selectedNetwork = props.externalNetworks.selectedNetwork

  if (selectedNetwork === null || selectedNetwork === undefined) {
    return null
  }

  let layout = PRESET_LAYOUT
  if (cyInstance !== null) {
    cyInstance.resize()
  }

  if (layoutName !== null) {
    layout = {
      name: layoutName
    }
  }

  const cyjs = selectedNetwork.network

  const checkPresetLayout = (network, layoutName=null) => {
    const nodes = network.elements.nodes
    const sampleNode = nodes[0]

    let layout = 'cose-bilkent'
    if(layoutName !== null) {
      layout = layoutName
    }
    if (!sampleNode) {
      return layout
    }

    const position = sampleNode.position
    if (!position || (position.x === 0 && position.y === 0)) {
      return layout
    } else {
      return 'preset'
    }
  }

  const layoutNameUpdated = checkPresetLayout(cyjs, layoutName)
  layout = {
    name: layoutNameUpdated
  }

  return (
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(cyjs.elements)}
      layout={layout}
      style={BASE_STYLE}
      stylesheet={DEFAULT_STYLE}
      cy={cy => (cyInstance = cy)}
    />
  )
}

export default CytoscapeViewer
