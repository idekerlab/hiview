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
      'width': 40,
      'height': 15,
      'shape': 'roundrectangle',
      'text-valign': 'center',
      'text-halign': 'center',
      'color': '#FFFFFF',
      'background-color': '#000000',
      'font-size': 9,
      'label': 'data(name)',
    },
  },
  nodeSelected: {
    'selector': 'node:selected',
    'css': {
      'shape': 'ellipse',
      'width': 40,
      'height': 40,
      'text-valign': 'bottom',
      'text-halign': 'left',
      'font-size': 18,
      'background-color': '#FFFFFF',
      'color': '#dbfffc',
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
  hidden: {
    selector: '.hidden',
    css: {
      display: 'none'
    },
  }
}


export const createStyle = originalNetwork => {

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

  edgeStyle.css['width'] = `mapData(RF_score,${similarityMin},${similarityMax}, 1, 5)`
  edgeStyle.css['line-color'] = (d) => {
    if (d.data('RF_score') === undefined) {
      return '#aaaaaa'
    } else {
      return colorScale(d.data('RF_score'))
    }
  }

  edgeStyle.css['opacity'] = `mapData(RF_score,${similarityMin},${similarityMax}, 0.4, 0.9)`
  edgeStyle.css['display'] = (d) => {

    if (d.data('RF_score') === undefined) {
      return 'none'
    }
    return 'element'
  }

  return {
    'style': [
      BASE_STYLE.node, BASE_STYLE.nodeSelected,
      edgeStyle, BASE_STYLE.edgeSelected, BASE_STYLE.hidden],
  }
}
