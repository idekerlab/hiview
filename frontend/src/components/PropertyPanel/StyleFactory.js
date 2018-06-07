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
      'color': '#EEEEEE',
      'background-color': '#000000',
      'font-size': 9,
      'label': 'data(name)',
    },
  },
  nodeSelected: {
    'selector': 'node:selected',
    'css': {
      'shape': 'ellipse',
      'width': 55,
      'height': 55,
      'font-size': 15,
      color: '#444444',
      'background-color': '#FFFFFF',
    },
  },
  edge: {
    'selector': 'edge',
    'css': {
      width: 4,
      'line-color': '#555555',
      opacity: 1,
      'curve-style': 'bezier',
      // 'edge-distances': 'node-position',
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

  console.log('************** PE Type: ', primaryEdgeType, interactions)
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

  edgeStyle.css['width'] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.5, 4)`
  edgeStyle.css['line-color'] = (d) => {
    if (d.data(primaryEdgeType) === undefined) {
      return '#aaaaaa'
    } else {
      return colorScale(d.data(primaryEdgeType))
    }
  }

  edgeStyle.css['opacity'] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.2, 0.95)`
  edgeStyle.css['display'] = (d) => {

    if (d.data(primaryEdgeType) === undefined) {
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
