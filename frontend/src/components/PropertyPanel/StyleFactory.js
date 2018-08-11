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
      'width': 48,
      'height': 13,
      'shape': 'roundrectangle',
      'text-valign': 'center',
      'text-halign': 'center',
      'color': '#FFFFFF',
      'background-opacity': 0,
      'background-color': '#222222',
      'border-width': 0,
      'font-size': 10,
      'label': 'data(name)',
    },
  },
  nodeSelected: {
    'selector': 'node:selected',
    'css': {
      'shape': 'ellipse',
      'width': 60,
      'height': 60,
      'font-size': 12,
      color: '#FFFFFF',
      'background-opacity': 1,
      'background-color': '#FF0000'
    },
  },
  edge: {
    'selector': 'edge',
    'css': {
      width: 4,
      'line-color': '#555555',
      opacity: 1,
      "curve-style": "bezier",
      "control-point-step-size": 45
      // 'haystack-radius': '0.8'
    },
  },
  edgeSelected: {
    'selector': 'edge:selected',
    'css': {
      // 'line-color': 'rgb(255,0,0)',
      'width': 10,
      opacity: 1,
      'label': 'data(interaction)',
      'color': '#FFFFFF'
    },
  },
  hidden: {
    selector: '.hidden',
    css: {
      // display: 'none',
      'line-color': 'blue',
      // visibility: 'hidden'
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
  let primaryEdgeType = networkData[MAIN_INTERACTION_TYPE_TAG]

  // This is the generator for custom styling
  const similarityMin = networkData[`${primaryEdgeType} ${ATTR_TYPES.MIN}`]
  const similarityMax = networkData[`${primaryEdgeType} ${ATTR_TYPES.MAX}`]


  // const colorScale = d3Scale.scaleSequential(d3ScaleChromatic.interpolateGnBu)
  //   .domain([parentWidth,0])
  const colorScale = d3Scale.scaleSequential(d3Scale.interpolateInferno).domain([
    similarityMin,
    similarityMax,
  ])

  // Need to remove space due to current cxtool limitation
  primaryEdgeType = primaryEdgeType.replace(/ /g, '_')

  const edgeStyle = BASE_STYLE.edge

  edgeStyle.css['width'] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.7, 3)`
  edgeStyle.css['line-color'] = (d) => {
    if (d.data(primaryEdgeType) === undefined) {
      return '#aaaaaa'
    } else {
      return colorScale(d.data(primaryEdgeType))
    }
  }

  edgeStyle.css['opacity'] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.6, 1)`
  edgeStyle.css['display'] = (d) => {

    if (d.data(primaryEdgeType) === undefined) {
      return 'none'
    }
    return 'element'
  }


  // Define edge selection style
  const edgeSelectedStyle = BASE_STYLE.edgeSelected

  edgeSelectedStyle.css['label'] = d => {
    const primaryScore = d.data(primaryEdgeType)

    const edgeType = d.data('interaction')
    if (edgeType !== undefined) {
      return d.data('interaction')
    }
    return primaryScore.toFixed(5)
  }

  return {
    'style': [
      BASE_STYLE.node, BASE_STYLE.nodeSelected,
      edgeStyle, edgeSelectedStyle, BASE_STYLE.hidden],
  }
}
