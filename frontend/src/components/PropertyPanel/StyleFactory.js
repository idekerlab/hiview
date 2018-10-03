const MAIN_INTERACTION_TYPE_TAG = 'Main Feature'
const ATTR_TYPES = {
  MIN: 'min',
  MAX: 'max',
  TYPE: 'type'
}

import * as d3Scale from 'd3-scale'

const BASE_STYLE = {
  node: {
    selector: 'node',
    css: {
      width: 48,
      height: 13,
      shape: 'roundrectangle',
      'text-valign': 'center',
      'text-halign': 'center',
      color: '#FFFFFF',
      'background-opacity': 0,
      'background-color': '#222222',
      'border-width': 0,
      'font-size': 10,
      label: 'data(name)'
    }
  },
  nodeSelected: {
    selector: 'node:selected',
    css: {
      shape: 'ellipse',
      width: 40,
      height: 40,
      'font-size': 11,
      color: '#FFFFFF',
      'background-opacity': 1,
      'background-color': '#FF0000'
    }
  },
  edge: {
    selector: 'edge',
    css: {
      width: 1,
      'line-color': '#555555',
      opacity: 1,
      'curve-style': 'bezier',
      'control-point-step-size': 45
      // 'haystack-radius': '0.8'
    }
  },
  edgeSelected: {
    selector: 'edge:selected',
    css: {
      opacity: 1
      // 'line-color': '#FF0000'
      // width: 15
      // 'label': 'data(interaction)',
      // 'color': '#FFFFFF'
    }
  },
  hidden: {
    selector: 'edge.hidden',
    css: {
      opacity: 0.1
    }
  },
  seed: {
    selector: '.seed',
    css: {
      'background-color': '#FFFFFF',
      color: '#FF0000',
      width: 50,
      height: 50
    }
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

  const edges = network.interactions.elements.edges

  const networkData = interactions.data
  const childWeight = networkData['Children weight']

  let thresholds = []
  if (childWeight) {
    thresholds = childWeight.split('|')
  }

  let primaryEdgeType = networkData[MAIN_INTERACTION_TYPE_TAG]

  // Need to remove space due to current cxtool limitation
  primaryEdgeType = primaryEdgeType.replace(/ /g, '_')

  const minEdge = edges[edges.length - 1]
  const maxEdge = edges[0]
  let similarityMax = maxEdge.data[primaryEdgeType]
  let similarityMin = minEdge.data[primaryEdgeType]

  if (!similarityMax) {
    console.warn('Max was not defined for: ', edges[0])
    similarityMax = 1
  }

  const edgeStyle = BASE_STYLE.edge

  edgeStyle.css[
    'width'
  ] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.5, 15)`

  edgeStyle.css['z-index'] = `data(zIndex)`

  const edgeColor = 'color'
  edgeStyle.css['line-color'] = `data(${edgeColor})`
  edgeStyle.css[
    'opacity'
  ] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.5, 1)`
  // edgeStyle.css['display'] = (d) => {
  //
  //   if (!d.data(primaryEdgeType)) {
  //     return 'none'
  //   }
  //   return 'element'
  // }
  //
  //
  // Define edge selection style
  const edgeSelectedStyle = BASE_STYLE.edgeSelected

  // edgeSelectedStyle.css['label'] = d => {
  //   const primaryScore = d.data(primaryEdgeType)
  //
  //   const edgeType = d.data('interaction')
  //   if (!edgeType) {
  //     return d.data('interaction')
  //   }
  //   if(primaryScore && (typeof primaryScore === 'number')) {
  //     return primaryScore.toFixed(5)
  //   }
  //   return '-'
  // }

  return {
    style: [
      BASE_STYLE.node,
      BASE_STYLE.nodeSelected,
      edgeStyle,
      edgeSelectedStyle,
      BASE_STYLE.hidden,
      BASE_STYLE.seed
    ]
  }
}
