import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';

import React, { useEffect, useState } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

Cytoscape.use(COSEBilkent);



import DEFAULT_STYLE from './visualstyle'
import './style.css'
import Warning from './Warning'
import LoadingPanel from '../PropertyPanel/LoadingPanel'
let cyInstance = null

const BASE_STYLE = { width: '100%', height: '100%', background: '#222230' }

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
  nodeRepulsion: 180,
  idealEdgeLength: 130,
  gravity: 1.25

}

const CytoscapeViewer = props => {

  const selectedGenes = props.rawInteractions.get('selected')
  console.log('GList -= ', selectedGenes)

  useEffect(() => {
    console.log('* Viewer effect:', props)

    if (cyInstance === undefined || cyInstance === null) {
      return
    }
    console.log('This should run only once:  CyViewer Mounted:', cyInstance)

    cyInstance.on('tap', function(event) {
      try {
        cyInstance.nodes().removeClass('connected')
        const target = event.target
        if (target === cyInstance) {
          props.networkActions.deselectAll()
          console.log('UNSELECT')
        }
      } catch (e) {
        console.warn(e)
      }
    })

    cyInstance.on('tap', 'node', function() {
      try {
        cyInstance.nodes().removeClass('connected')
        const selected = this.data()
        props.networkActions.selectNode(selected)
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

        props.networkActions.selectEdge(selected)
      } catch (e) {
        console.warn(e)
      }
    })

    return () => {
      console.log('unmount')
    }
  }, [props.externalNetworks])

  // const numObjects = props.network.nodeCount + props.network.edgeCount
  // if (numObjects > 5000) {
  //   return <Warning />
  // }

  const isLoading = props.externalNetworks.loading
  if (isLoading) {
    return <LoadingPanel {...props} />
  }

  const selectedNetwork = props.externalNetworks.selectedNetwork

  if (selectedNetwork === null || selectedNetwork === undefined) {
    return null
  }

  let layout = COSE_SETTING
  if (cyInstance !== null) {
    cyInstance.resize()
  }

  const cyjs = selectedNetwork.network

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
