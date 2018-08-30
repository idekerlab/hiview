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
      'width': 40,
      'height': 40,
      'font-size': 11,
      color: '#FFFFFF',
      'background-opacity': 1,
      'background-color': '#FF0000'
    },
  },
  edge: {
    'selector': 'edge',
    'css': {
      width: 1,
      'line-color': '#555555',
      opacity: 1,
      "curve-style": "bezier",
      "control-point-step-size": 45
      // 'haystack-radius': '0.8'
    }
  },
  edgeSelected: {
    'selector': 'edge:selected',
    'css': {
      opacity: 1,
      // 'line-color': '#FF0000'
      // width: 15
      // 'label': 'data(interaction)',
      // 'color': '#FFFFFF'
    }
  },
  hidden: {
    selector: '.hidden',
    css: {
      'line-color': '#444444',
      'background-color': '#444444',
      opacity: 0.3,
      color: '#222222'
    }
  },
  seed: {
    selector: '.seed',
    css: {
      'background-color': '#FFFFFF',
      color: '#FF0000',
      'width': 50,
      'height': 50,

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
  let primaryEdgeType = networkData[MAIN_INTERACTION_TYPE_TAG]


  // This is the generator for custom styling
  // const similarityMin = networkData[`${primaryEdgeType} ${ATTR_TYPES.MIN}`]
  // const similarityMax = networkData[`${primaryEdgeType} ${ATTR_TYPES.MAX}`]

  // Need to remove space due to current cxtool limitation
  primaryEdgeType = primaryEdgeType.replace(/ /g, '_')

  const similarityMax = edges[0].data[primaryEdgeType]
  const similarityMin = edges[edges.length - 1].data[primaryEdgeType]

  // const colorScale = d3Scale.scaleSequential(d3ScaleChromatic.interpolateGnBu)
  //   .domain([parentWidth,0])
  const colorScale = d3Scale.scaleSequential(d3Scale.interpolateInferno).domain([
    similarityMin,
    similarityMax,
  ])


  // console.log(primaryEdgeType, '#CUR range = ', similarityMin, similarityMax)

  const edgeStyle = BASE_STYLE.edge

  edgeStyle.css['width'] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.1, 10)`
  edgeStyle.css['line-color'] = (d) => {
    if (!d.data(primaryEdgeType)) {
      return '#aaaaaa'
    } else {
      return colorScale(d.data(primaryEdgeType))
    }
  }

  edgeStyle.css['opacity'] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.5, 1)`
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
    'style': [
      BASE_STYLE.node, BASE_STYLE.nodeSelected,
      edgeStyle, edgeSelectedStyle, BASE_STYLE.hidden, BASE_STYLE.seed],
  }
}
