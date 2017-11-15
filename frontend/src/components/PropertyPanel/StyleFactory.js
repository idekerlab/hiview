const MAIN_INTERACTION_TYPE_TAG = 'Main Feature'
const ATTR_TYPES = {
  'MIN': 'min',
  'MAX': 'max',
  'TYPE': 'type',
}

import * as d3Scale from 'd3-scale'


const BASE_STYLE = {
  node: {
    'selector': 'node',
    'css': {
      'width': 1,
      'height': 1,
      'text-valign': 'center',
      'text-halign': 'center',
      'shape': 'ellipse',
      'color': '#FFFFFF',
      'background-color': '#eeeeee',
      'font-size': 12,
      'label': 'data(name)',
    },
  },
  nodeSelected: {
    'selector': 'node:selected',
    'css': {
      'background-color': 'white',
      'font-size': '0.4em',
      'color': 'white',
      'label': 'data(name)',
      'text-max-width': '200px',
    },
  },
  edge: {
    'selector': 'edge',
    'css': {
      width: 1,
      'line-color': '#aaaaaa',
      opacity: 0.8,
      'curve-style': 'bezier',
      'edge-distances': 'node-position',
    },
  },
  edgeSelected: {
    'selector': 'edge:selected',
    'css': {
      'line-color': 'rgb(255,0,0)',
      'width': 1,
    },
  },
}


export const createStyle = originalNetwork => {

  const defaultStyle = {
    'style': [BASE_STYLE.node, BASE_STYLE.nodeSelected, BASE_STYLE.edge, BASE_STYLE.edgeSelected],
  }

  const network = originalNetwork.toJS()


  if (network.loading) {
    return null
  }

  const interactions = network.interactions
  if (interactions === null) {
    return null
  }

  const networkData = interactions.data
  const primaryEdgeType = networkData[MAIN_INTERACTION_TYPE_TAG]

  // This is the generator for custom styling
  const similarityMin = networkData[`${primaryEdgeType} ${ATTR_TYPES.MIN}`]
  const similarityMax = networkData[`${primaryEdgeType} ${ATTR_TYPES.MAX}`]

  const colorScale = d3Scale.scaleSequential(d3Scale.interpolateInferno).domain([
    similarityMin,
    similarityMax,
  ])

  const edgeStyle = BASE_STYLE.edge

  edgeStyle.css['width'] = `mapData(RF_score,${similarityMin},${similarityMax}, 0.5, 4)`
  edgeStyle.css['line-color'] = (d) => {
    if (d.data('RF_score') === undefined) {
      return '#aaaaaa'
    } else {
      return colorScale(d.data('RF_score'))
    }
  }

  edgeStyle.css['opacity'] = `mapData(RF_score,${similarityMin},${similarityMax}, 0.4, 0.95)`
  edgeStyle.css['display'] = (d) => {

    if (d.data('RF_score') === undefined) {
      return 'none'
    }
    return 'element'
  }

  return {
    'style': [BASE_STYLE.node, BASE_STYLE.nodeSelected, edgeStyle, BASE_STYLE.edgeSelected],
  }
}
