import _ from 'lodash'
const MAIN_INTERACTION_TYPE_TAG = 'Main Feature'
const INTERACTION_TAG = 'interaction'

// Font size will be calculated based on viewport size.
const VIEW_TO_FONT_SIZE_RATIO = 350
const BASE_FONT_SIZE = 18
const LARGE_FONT_SIZE = 30

// If there are too many edge in the data, use simplified version.
const MAX_EDGE_COUNT = 10000

const calcFontSize = cyNode => {
  const cy = cyNode.cy()
  const ext = cy.extent()

  const size = ext.w / VIEW_TO_FONT_SIZE_RATIO
  if (size > BASE_FONT_SIZE) {
    return size
  }
  return LARGE_FONT_SIZE
}

const calcNodeWidth = cyNode => {
  const nodeName = cyNode.data('name')
  const cy = cyNode.cy()
  const ext = cy.extent()
  const size = ext.w / VIEW_TO_FONT_SIZE_RATIO
  if (size > BASE_FONT_SIZE) {
    return nodeName.length * size
  }
  return nodeName.length * LARGE_FONT_SIZE
}

const calcNodeHeight = cyNode => {
  const cy = cyNode.cy()
  const ext = cy.extent()
  const size = ext.w / VIEW_TO_FONT_SIZE_RATIO
  if (size > BASE_FONT_SIZE) {
    return size * 1.1
  }
  return LARGE_FONT_SIZE * 1.1
}

const MINIMAL_STYLE = [
  {
    selector: 'node',
    style: {
      width: 10,
      height: 10,
      shape: 'rectangle',
      color: '#FFFFFF',
      'background-color': '#FFFFFF'
      // label: 'data(name)'
    }
  },
  {
    selector: 'node:selected',
    style: {
      label: 'data(name)',
      'background-color': '#FF0000',
      'text-valign': 'bottom',
      'text-halign': 'right',
      color: '#FF0000'
    }
  },
  {
    selector: 'edge',
    style: {
      opacity: 0.4,
      'line-color': 'data(color)',
      'z-index': 'data(zIndex)'
    }
  },
  {
    selector: '.members',
    css: {
      label: 'data(name)',
      'background-color': '#FF0000',
      color: '#FF0000',
      'text-valign': 'bottom',
      'text-halign': 'right',
      width: 30,
      height: 30
    }
  },
  {
    selector: 'edge.hidden',
    css: {
      opacity: 0.05,
      // visibility: 'hidden'
    }
  }
]

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
      'text-opacity': 1,
      'background-opacity': 0,
      'background-color': '#222222',
      'border-width': 0,
      'font-size': BASE_FONT_SIZE,
      label: 'data(name)'
    }
  },
  nodeSelected: {
    selector: 'node:selected',
    css: {
      width: n => calcNodeWidth(n),
      height: n => calcNodeHeight(n),
      'font-size': n => calcFontSize(n),
      'font-weight': 500,
      color: '#FFFFFF',
      'background-opacity': 1,
      'background-color': '#FF0000'
    }
  },
  edge: {
    selector: 'edge',
    css: {
      width: 1,
      'text-rotation': 'autorotate',
      'line-color': '#555555',
      'text-opacity': 0,
      'font-size': 65,
      color: '#FF0000',
      opacity: 0.8,
      'curve-style': e => {
        const parallel = e.parallelEdges()
        if (parallel.size() > 1) {
          return 'haystack'
        } else {
          return 'bezier'
        }
      },
      'haystack-radius': 0.7,
      'control-point-step-size': 45
    }
  },
  edgeSelected: {
    selector: 'edge:selected',
    css: {
      opacity: 1,
      'z-index': e => e.data('zIndex') + 1000
    }
  },
  members: {
    selector: '.members',
    css: {
      'background-color': '#FF0000',
      color: '#FFFFFF',
      'background-opacity': 1,
      'background-color': '#FF0000',
      width: n => calcNodeWidth(n),
      height: n => calcNodeHeight(n),
      'font-size': n => calcFontSize(n),
      'font-weight': 500
    }
  },
  hidden: {
    selector: 'edge.hidden',
    css: {
      opacity: 0.05,
      // visibility: 'hidden'
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

export const createSimplifiedStyle = () => {
  return { style: MINIMAL_STYLE }
}

export const createStyle = originalNetwork => {
  console.log(
    '## Crearting VS-----------------------------',
    originalNetwork.toJS().interactions
  )
  const network = originalNetwork.toJS()

  if (network.loading) {
    return null
  }

  const interactions = network.interactions
  if (interactions === null) {
    return null
  }

  const edges = network.interactions.elements.edges
  if (edges.length >= MAX_EDGE_COUNT) {
    return createSimplifiedStyle(interactions)
  }

  const networkData = interactions.data
  const childWeight = networkData['Children weight']

  let thresholds = []
  if (childWeight) {
    thresholds = childWeight.split('|')
  }

  let primaryEdgeType = networkData[MAIN_INTERACTION_TYPE_TAG]
  if (primaryEdgeType === undefined) {
    return {
      style: [
        BASE_STYLE.node,
        BASE_STYLE.nodeSelected,
        BASE_STYLE.hidden,
        BASE_STYLE.seed
      ]
    }
  }

  // Need to remove space due to current cxtool limitation
  primaryEdgeType = primaryEdgeType.replace(/ /g, '_')

  let similarityMin = networkData.edgeScoreRange[0]
  let similarityMax = networkData.edgeScoreRange[1]

  if (!similarityMax) {
    console.warn('Max was not defined for: ', edges[0])
    similarityMax = 1
  }

  const edgeStyle = BASE_STYLE.edge
  edgeStyle.css['z-index'] = `data(zIndex)`

  const edgeColor = 'color'
  edgeStyle.css['line-color'] = `data(${edgeColor})`

  if (similarityMin !== similarityMax) {
    edgeStyle.css[
      'opacity'
    ] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.4, 1)`
    edgeStyle.css[
      'width'
    ] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.5, 8)`
  }

  // Define edge selection style
  const edgeSelectedStyle = BASE_STYLE.edgeSelected

  // Reaction for edge selection
  edgeStyle.css['label'] = edge => {
    const primaryScore = edge.data(primaryEdgeType)
    // This is for optional edges
    const edgeType = edge.data(INTERACTION_TAG)
    if (edgeType !== undefined) {
      const labelText = edgeType + ': ' + edge.data(edgeType)
      return labelText
    }

    if (primaryScore && typeof primaryScore === 'number') {
      return primaryScore.toFixed(4)
    }
    return '-'
  }

  return {
    style: [
      BASE_STYLE.node,
      BASE_STYLE.nodeSelected,
      edgeStyle,
      edgeSelectedStyle,
      BASE_STYLE.hidden,
      BASE_STYLE.seed,
      BASE_STYLE.members
    ]
  }
}
