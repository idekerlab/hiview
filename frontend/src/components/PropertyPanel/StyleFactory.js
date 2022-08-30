// In DDRAM, this property is used to show/hide primary edges
const DDRAM_EDGE_VISIBILITY = 'primary_edge_visible'
const MAIN_INTERACTION_TYPE_TAG = 'Main Feature'
const INTERACTION_TAG = 'interaction'

// Font size will be calculated based on viewport size.
const VIEW_TO_FONT_SIZE_RATIO = 350
const BASE_FONT_SIZE = 10
const LARGE_FONT_SIZE = 30

// If there are too many edge in the data, use simplified version.
const MAX_EDGE_COUNT = 100000

export const EDGE_WIDTH = {
  min: 1,
  max: 4
}

const calcFontSize = (cyNode) => {
  const cy = cyNode.cy()
  const ext = cy.extent()

  const size = ext.w / VIEW_TO_FONT_SIZE_RATIO
  if (size > BASE_FONT_SIZE) {
    return size
  }
  return LARGE_FONT_SIZE
}

const calcNodeWidth = (cyNode) => {
  const nodeName = cyNode.data('name')
  const cy = cyNode.cy()
  const ext = cy.extent()
  const size = ext.w / VIEW_TO_FONT_SIZE_RATIO
  if (size > BASE_FONT_SIZE) {
    return nodeName.length * size
  }
  return nodeName.length * LARGE_FONT_SIZE
}

const calcNodeHeight = (cyNode) => {
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
      shape: 'ellipse',
      color: '#FFFFFF',
      'background-color': '#FFFFFF',
      // label: 'data(name)'
    },
  },
  {
    selector: 'node:selected',
    style: {
      label: 'data(name)',
      'background-color': '#FF0000',
      'text-valign': 'bottom',
      'text-halign': 'right',
      color: '#FF0000',
    },
  },
  {
    selector: 'edge',
    style: {
      width: (e) => (e.data('isMember') ? 3 : 0.5),
      opacity: (e) => {
        const isMember = e.data('isMember')

        if (isMember) {
          return 1
        } else {
          return 0.1
        }
      },
      'line-color': 'data(color)',
    },
  },
  {
    selector: '.members',
    css: {
      // label: 'data(name)',
      'background-color': '#FF0000',
      color: '#FF0000',
      'text-valign': 'bottom',
      'text-halign': 'right',
      width: 10,
      height: 10,
    },
  },
  {
    selector: 'edge.hidden',
    css: {
      // opacity: 0.05,
      visibility: 'hidden'
    },
  },
]

const BASE_STYLE = {
  node: {
    selector: 'node',
    css: {
      width: 21,
      height: 8,
      shape: 'roundrectangle',
      'text-valign': 'center',
      'text-halign': 'center',
      color: '#FFFFFF',
      'text-opacity': 1,
      'text-outline-width': 0.2,
      'text-outline-color': '#666666',
      'text-outline-opacity': 1,
      'background-opacity': 1,
      'background-color': 'data(color)',
      'font-size': 4,
      'font-weight': 'bold',
      label: 'data(name)',
    },
  },
  nodePreio: {
    selector: 'node[?isPleio]',
    css: {
      shape: 'ellipse',
      height: 7,
    },
  },
  nodeSelected: {
    selector: 'node:selected',
    css: {
      'font-weight': 500,
      'text-background-opacity': 0.9,
      'text-background-color': '#FF0000',
      color: '#FFFFFF',
      'background-opacity': 1,
      'background-color': '#FF0000',
    },
  },
  edge: {
    selector: 'edge',
    css: {
      width: 1,
      'text-rotation': 'autorotate',
      'curve-style': (e) => {
        const parallel = e.parallelEdges()
        if (parallel.size() > 1) {
          return 'haystack'
        } else {
          return 'bezier'
        }
      },
      'haystack-radius': 0.7,
      'control-point-step-size': 45,
      'z-index': 'data(zIndex)',
      'line-color': 'data(color)',
      opacity: 0.2
    }
  },
  edgeSelected: {
    selector: 'edge:selected',
    css: {
      opacity: 1,
      color: '#00FF00',
      'font-size': 6,
      'line-color': '#FF0000',
      'z-index': 19000,
    },
  },
  edgeMembers: {
    selector: `edge[?isMember]`,
    css: {
      opacity: 1,
    },
  },
  edgePleio: {
    selector: `edge[?isPleio]`,
    css: {
      opacity: 0.7,
      width: 0.5,
      'line-style': 'dotted',
      'curve-style': 'unbundled-bezier',
      'z-index': 9999,
      'source-arrow-shape': 'circle',
      'target-arrow-shape': 'circle',
      'source-arrow-color': '#FFFFFF',
      'target-arrow-color': '#FFFFFF',
      'arrow-scale': 0.25,
    },
  },
  edgeVisible: {
    selector: `edge[!${DDRAM_EDGE_VISIBILITY}]`,
    css: {
      width: 20,
      opacity: 0,
    },
  },
  members: {
    selector: '.members',
    css: {
      color: '#FF0000',
      'background-opacity': 0,
      'text-outline-width': 0.6,
      'text-outline-color': '#FFFFFF',
      // 'background-color': '#FF0000',
      // width: n => calcNodeWidth(n),
      // height: n => calcNodeHeight(n),
      // 'text-background-opacity': 0.9,
      // 'text-background-color': '#FFFFFF',
      // 'font-size': n => calcFontSize(n),
      'font-size': 7.5
    },
  },
  hidden: {
    selector: 'edge.hidden',
    css: {
      visibility: 'hidden',
    },
  },
  seed: {
    selector: '.seed',
    css: {
      // 'background-color': '#FFFFFF',
      color: '#FF0000',
      width: 50,
      height: 50,
    },
  },
  connected: {
    selector: '.connected',
    css: {
      color: '#FFFFFF',
      'text-background-opacity': 0.9,
      'text-background-color': '#FF0000',
      'background-opacity': 1,
      'background-color': '#FF0000',
    },
  },
  connectedEdge: {
    selector: '.connectedEdge',
    css: {
      width: 3,
      'line-color': (e) => {
        return e.data('color')
      },
      'line-style': 'solid',
    },
  },
  expandedEdges: {
    selector: 'edge[?subEdge]',
    css: {
      width: 1.5,
      'line-style': 'dotted',
      opacity: 1,
    },
  },
  hidePleio: {
    selector: 'edge.hidePleio',
    css: {
      visibility: 'hidden'
    },
  },
}

export const createSimplifiedStyle = () => {
  return { style: MINIMAL_STYLE }
}

export const createStyle = (originalNetwork) => {
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
        BASE_STYLE.nodePreio,
        BASE_STYLE.nodeSelected,
        BASE_STYLE.hidden,
        BASE_STYLE.seed,
      ],
    }
  }

  // Need to remove space due to current cxtool limitation
  primaryEdgeType = primaryEdgeType.replace(/ /g, '_')

  let similarityMin = networkData.edgeScoreRange[0]
  let similarityMax = networkData.edgeScoreRange[1]

  if (!similarityMax) {
    console.warn('Max was not defined for: ', edges[0])
    similarityMax = 1
  } else if (similarityMax > 1) {
    // TODO: why largert than 1?
    similarityMax = 1
  }

  const edgeStyle = BASE_STYLE.edge
  edgeStyle.css['z-index'] = 'data(zIndex)'
  edgeStyle.css['line-color'] = `data(color)`

  if (similarityMin !== similarityMax) {
    // edgeStyle.css[
    //   'opacity'
    // ] = `mapData(${primaryEdgeType},${similarityMin},${similarityMax}, 0.6, 1)`

    const range = Math.abs(similarityMax - similarityMin)
    // const topRange = range * 0.95
    // const maxThreshold = similarityMin + topRange

    // Width mapping. This is local
    const maxWidth = EDGE_WIDTH.max
    const minWidth = EDGE_WIDTH.min
    const rangeWidth = Math.abs(maxWidth - minWidth)

    const globalMin = Number.parseFloat(networkData[`${primaryEdgeType} min`])
    const globalMax = Number.parseFloat(networkData[`${primaryEdgeType} max`])
    const globalRange = Math.abs(globalMax - globalMin)
    // const globalTop = globalRange * 0.8
    // const globalTh = globalMin + globalTop

    edgeStyle.css['width'] = (e) => {
      const weight = e.data(primaryEdgeType)
      const isMember = e.data('isMember')

      // if(!isMember) {
      //   return 0.01
      // }
      // if(e.data('isPleio') === true) {
      //   return 20
      // }

      if (weight === undefined || weight === null) {
        return minWidth
      }

      // if(globalTh <= weight) {
      //   return maxWidth
      // }

      // const mappedWidth = (weight / range) * rangeWidth
      // const mappedWidth = Math.log(weight / range) * rangeWidth
      const mappedWidth =
        (Math.abs(weight - similarityMin) / range) * rangeWidth

      if (mappedWidth >= maxWidth) {
        return maxWidth
      } else if (mappedWidth <= minWidth) {
        return minWidth
      }
      return mappedWidth
    }
  }

  // Define edge selection style
  const edgeSelectedStyle = BASE_STYLE.edgeSelected

  // Reaction for edge selection
  edgeSelectedStyle.css['label'] = (edge) => {
    const primaryScore = edge.data(primaryEdgeType)
    // This is for optional edges
    const edgeType = edge.data(INTERACTION_TAG)
    if (edgeType !== undefined) {
      const scoreString = formatScore(edge.data(edgeType))
      if (scoreString === 'NaN') {
        if (edgeType === 'new_AP_MS') return 'New AP-MS'
      } else {
        return edgeType + ': ' + scoreString
      }
    }

    if (primaryScore && typeof primaryScore === 'number') {
      return formatScore(primaryScore)
    }
    return '-'
  }

  return {
    style: [
      BASE_STYLE.node,
      BASE_STYLE.nodePreio,
      BASE_STYLE.nodeSelected,
      edgeStyle,
      edgeSelectedStyle,
      BASE_STYLE.edgeMembers,
      BASE_STYLE.edgePleio,
      BASE_STYLE.edgeVisible,
      BASE_STYLE.hidden,
      BASE_STYLE.seed,
      BASE_STYLE.members,
      BASE_STYLE.connected,
      BASE_STYLE.connectedEdge,
      BASE_STYLE.expandedEdges,
      BASE_STYLE.hidePleio
    ],
  }
}

const formatScore = (score) => Number.parseFloat(score).toFixed(5)
