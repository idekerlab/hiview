import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Cytoscape from 'cytoscape'
import COSEBilkent from 'cytoscape-cose-bilkent'

import CytoscapeComponent from 'react-cytoscapejs'

Cytoscape.use(COSEBilkent)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '20em',
    backgroundColor: 'red',
  },
  subtitle: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
}))

const BASE_STYLE = { width: '100%', height: '100%', background: '#000000' }

let cyInstance = null

const DUMMY = {
  elements: {
    nodes: [
      {
        data: {
          id: 'a',
          name: 'a1',
        },
      },
      {
        data: {
          id: 'b',
          name: 'b1',
        },
      },
    ],
  },
}

const DEF_VS = [
  {
    selector: 'node',
    style: {
      'background-color': 'red',
    },
  },
  {
    selector: '.test',
    style: {
      'width': 1000,
    },
  },
]

const PathNetworkPanel = ({ network, node1, node2 }) => {
  const classes = useStyles()


  if(network === undefined) {
    return (
      <div className={classes.root}></div>
    )
  }

  const modifyLayout = ({ network, node1, node2 }) => {
    const boundingBox = cyInstance.extent()
    const { x1, x2, y1, y2, w, h } = boundingBox

    const PAD = w * 0.4
    const leftX = x1 - PAD
    const y = y1 + h / 2
    const rightX = x2 + PAD

    const nodes = cyInstance.nodes()
    console.log('CY NS--------->>', nodes)
    const n1 = nodes.first()
    const n2 = nodes.last()

    n1.addClass('test')


    console.log(
      '22------------------------------->> END cose ',
      n1,
      n2,
      boundingBox,
      cyInstance,
    )
    n1.position({ x: leftX, y: y })
    n2.position({ x: rightX, y: y })
    console.log('UP---------->> END cose ', n1, n2)

    cyInstance.fit()
    cyInstance.style().update()
  }
  const PRESET_LAYOUT = {
    name: 'cose-bilkent',
    nodeRepulsion: 1,
    idealEdgeLength: 60,
    gravity: 0.01,
    tile: true,
    padding: 6,
    nodeDimensionsIncludeLabels: true,
    stop: () => {
      modifyLayout({ network, node1, node2 })
    },
  }

  return (
    <div className={classes.root}>
      <CytoscapeComponent
        elements={CytoscapeComponent.normalizeElements(network.elements)}
        layout={PRESET_LAYOUT}
        style={BASE_STYLE}
        stylesheet={DEF_VS}
        cy={(cy) => (cyInstance = cy)}
      />
    </div>
  )
}

export default PathNetworkPanel
