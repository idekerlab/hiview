import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Cytoscape from 'cytoscape'
import COSEBilkent from 'cytoscape-cose-bilkent'

import CytoscapeComponent from 'react-cytoscapejs'
import FitButton from './FitButton'

Cytoscape.use(COSEBilkent)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '15em',
    paddingRight: '1em'
  },
  subtitle: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
}))

const BASE_STYLE = { width: '100%', height: '100%', background: '#EEEEEE' }

const DEF_VS = [
  {
    selector: 'node',
    style: {
      label: 'data(name)',
      color: '#333333',
      'background-color': '#888888',
      width: 10,
      height: 10,
      'font-size': 12,
    },
  },
  {
    selector: 'edge',
    style: {
      'line-color': '#444444',
      'line-opacity': 0.5,
      width: 0.7,
    },
  },
  {
    selector: '.terminals',
    style: {
      'background-color': '#39FF14',
      'font-size': 18,
      'text-valign': 'bottom',
    },
  },
]

const PathNetworkPanel = React.memo(({ network, node1, node2, uuid }) => {
  const classes = useStyles()
  const [cyInstance, setCyInstance] = useState(null)


  if (network === undefined || network === null) {
    return null
  }

  const modifyLayout = () => {
    if(cyInstance === null) {
      return
    }

    const boundingBox = cyInstance.extent()
    const { x1, x2, y1, w, h } = boundingBox

    const PAD = w * 0.1
    const leftX = x1 - PAD
    const y = y1 + h / 2
    const rightX = x2 + PAD

    const n1 = cyInstance.elements(`node[name = "${node1}"]`)
    const n2 = cyInstance.elements(`node[name = "${node2}"]`)

    n1.position({ x: leftX, y: y })
    n2.position({ x: rightX, y: y })
    n1.addClass('terminals')
    n2.addClass('terminals')

    cyInstance.style().update()
    cyInstance.fit()
  }

  const preset2 = {
    name: 'cose-bilkent',
    animationDuration: 0,
    nodeRepulsion: 1,
    idealEdgeLength: 80,
    gravity: 0.01,
    tile: true,
    padding: 5,
    nodeDimensionsIncludeLabels: true,
    stop: () => {
      modifyLayout()
    },
  }

  return (
    <div className={classes.root}>
      <CytoscapeComponent
        id={`path-${uuid}`}
        elements={CytoscapeComponent.normalizeElements(network.elements)}
        layout={preset2}
        style={BASE_STYLE}
        stylesheet={DEF_VS}
        cy={(cy) => setCyInstance(cy)}
      />
      <FitButton cyInstance={cyInstance}/>
    </div>
  )
})

PathNetworkPanel.displayName = 'PathNetworkPanel'

export default PathNetworkPanel
