import { localLayout, localLayout2 } from './raw-interactions-layout'
import { getHeader } from '../components/AccessUtil'
import { createAction } from 'redux-actions'
import { filterEdge, MAIN_EDGE_TAG, PATTERN, duplicateNodes } from './raw-interactions-util'
import cx2js from 'cytoscape-cx2js'

import LocalDB from './local-db'

const THRESHOLD_TAG = 'Main Feature Default Cutoff'
// For CX --> cyjs conversion
const utils = new cx2js.CyNetworkUtils()
const cx2JsConverter = new cx2js.CxToJs(utils)

const hvDb = LocalDB.getDB()
const NDEX_API = '.ndexbio.org/v2/network/'

// Set loading message
export const SET_MESSAGE = 'SET_MESSAGE'
export const setMessage = createAction(SET_MESSAGE)

export const FETCH_INTERACTIONS = 'FETCH_INTERACTIONS'
const fetchNetwork = url => {
  return {
    type: FETCH_INTERACTIONS,
    url
  }
}

export const RECEIVE_INTERACTIONS = 'RECEIVE_INTERACTIONS'
const receiveNetwork = (
  url,
  network,
  filters,
  groups,
  extraEdges,
  originalCX
) => {
  return {
    type: RECEIVE_INTERACTIONS,
    url,
    network,
    filters,
    groups,
    extraEdges,
    originalCX
  }
}

const fetchNet = (url, settings) => {
  return fetch(url, settings)
}

/**
 * This is a quick and dirty impl for CX to simplified CYJS
 *
 * @param cx
 * @returns {{data, elements: {nodes: any[], edges: any[]}}}
 */
const processCx = (cx, allPositions, pleio) => {
  let idx = cx.length

  let nodes = []
  let edges = []
  let edgeAttributes = []
  let nodeAttributes = []
  let networkAttributes = []

  let layout = []

  while (idx--) {
    const entry = cx[idx]

    if (entry['nodes']) {
      nodes = entry['nodes']
    } else if (entry['edges']) {
      edges = entry['edges']
    } else if (entry['nodeAttributes']) {
      nodeAttributes = entry['nodeAttributes']
    } else if (entry['edgeAttributes']) {
      edgeAttributes = entry['edgeAttributes']
    } else if (entry['networkAttributes']) {
      networkAttributes = entry['networkAttributes']
    } else if (entry['cartesianLayout']) {
      layout = entry['cartesianLayout']
    }
  }
  const data = convertNetworkAttr(networkAttributes)

  let nodeIdx = nodes.length
  let edgeIdx = edges.length

  const nMap = new Map()
  while (nodeIdx--) {
    const n = nodes[nodeIdx]
    const node = {
      data: {
        id: n['@id'],
        name: n.n
      }
    }
    nMap.set(n['@id'], node)
  }

  let layoutIdx = layout.length
  while (layoutIdx--) {
    const position = layout[layoutIdx]
    const nodeId = position['node']
    nMap.get(nodeId)['position'] = {
      x: position.x,
      y: position.y
    }
  }

  const eMap = new Map()

  while (edgeIdx--) {
    const e = edges[edgeIdx]
    const edge = {
      data: {
        source: e.s,
        target: e.t,
        id: 'e' + e['@id'],
        'zIndex': 1,
        'color': 'teal',
      }
    }

    eMap.set(e['@id'], edge)
  }

  let eAttrIdx = edgeAttributes.length

  while (eAttrIdx--) {
    const eAttr = edgeAttributes[eAttrIdx]
    const id = eAttr.po
    const name = eAttr['n']
    const dataType = eAttr['d']
    const strVal = eAttr['v']

    const typedVal = typeConverter(dataType, strVal)
    // const nameSafe = name.replace(/ /g, '_')
    const nameSafe = name.replace(PATTERN, '_')

    const edge = eMap.get(id)
    if (edge !== undefined) {
      edge.data[nameSafe] = typedVal
    }
  }

  // Process node attributes
  let nodeAttrIdx = nodeAttributes.length
  const idSet = new Set()

  while (nodeAttrIdx--) {
    const nAttr = nodeAttributes[nodeAttrIdx]
    const id = nAttr.po
    const name = nAttr['n']
    const dataType = nAttr['d']
    const strVal = nAttr['v']

    const typedVal = typeConverter(dataType, strVal)
    // const nameSafe = name.replace(/ /g, '_')
    const nameSafe = name.replace(PATTERN, '_')

    const node = nMap.get(id)
    idSet.add(id)
    if (node !== undefined) {
      node.data[nameSafe] = typedVal
    }
  }

  const result = {
    network: {
      data,
      elements: {
        nodes: [...nMap.values()],
        edges: [...eMap.values()]
      }
    },
  }
  const {newNodes, newEdges, legend} = duplicateNodes({network: result.network, nodeMap: nMap, allPositions, pleio})

  newNodes.forEach(node => {
    nMap.set(node.id, node)
  })
  result.network.elements.nodes = [...result.network.elements.nodes, ...newNodes]
  result.network.elements.edges = [...result.network.elements.edges, ...newEdges]
  result['nodeMap'] = nMap
  result['legend'] = legend
  return result
}

const TYPE_DOUBLE = 'double'
const TYPE_BOOL = 'boolean'

const typeConverter = (dataType, value) => {
  if (dataType === TYPE_DOUBLE) {
    return parseFloat(value)
  } else if (dataType === TYPE_BOOL) {
    if (value === 'true') {
      return true
    } else {
      return false
    }
  }

  return value
}

const fetchFromDB = (dispatch, entry) => {
  const netAndFilter = entry.netAndFilter

  return dispatch(
    receiveNetwork(
      entry.url,
      netAndFilter[0],
      netAndFilter[1],
      netAndFilter[2],
      netAndFilter[3],
      entry.originalCX
    )
  )
}

const fetchInteractionsFromRemote = (
  mainFeature,
  th,
  dispatch,
  uuid,
  url,
  maxEdgeCount,
  credentials,
  positions,
  allPositions,
  pleio
) => {
  let originalCX = null
  let nodeMap = null

  const query = [
    {
      name: mainFeature,
      value: th,
      operator: '>'
    }
  ]

  const headers = getHeader(credentials)
  headers['Content-Type'] = 'application/json'

  let settings = {
    method: 'POST',
    body: JSON.stringify(query),
    headers
  }

  if (mainFeature.length === 0) {
    settings = {
      method: 'GET'
    }
  }

  return fetchNet(url, settings)
    .then(response => {
      if (!response.ok) {
        throw Error(response)
      } else {
        return response.json()
      }
    })
    .then(cx => {
      originalCX = cx
      const processed = processCx(originalCX, allPositions, pleio)
      nodeMap = processed.nodeMap
      const newNet = processed.network

      const legend = processed.legend

      dispatch(setLegend({names: legend}))
      dispatch(setOriginalEdgeCount(newNet.elements.edges.length))
      return newNet
    })
    .then(network => filterEdge(network, maxEdgeCount))
    .then(network => createFilter(network, maxEdgeCount))
    .then(netAndFilter => createGroups(netAndFilter))
    .then(netAndFilter => {
      // Store to local DB
      const entry = {
        uuid,
        url,
        netAndFilter,
        originalCX
      }
      
      const network = netAndFilter[0]
      // This applies new layout locally, and may take while
      localLayout2(allPositions, network.elements.nodes)

      // Store the modified network data to local DB
      hvDb.interactions.put(entry)

      return dispatch(
        receiveNetwork(
          url,
          netAndFilter[0],
          netAndFilter[1],
          netAndFilter[2],
          netAndFilter[3],
          originalCX
        )
      )
    })
    .catch(err => {
      console.log('Raw interaction fetch ERROR! ', err)
      return dispatch(receiveNetwork(url, null, 'Error!'))
    })
}

const getInteractions = (
  mainFeature,
  th,
  dispatch,
  uuid,
  url,
  maxEdgeCount,
  credentials,
  positions,
  allPositions,
  pleio
) => {
  // Check local data
  hvDb.interactions.get(uuid).then(entry => {
    // if (entry === undefined) {
      return fetchInteractionsFromRemote(
        mainFeature,
        th,
        dispatch,
        uuid,
        url,
        maxEdgeCount,
        credentials,
        positions,
        allPositions,
        pleio
      )
    // } else {
      // return fetchFromDB(dispatch, entry)
    // }
  })
}

export const fetchInteractionsFromUrl = (
  uuid,
  server,
  originalUrl,
  maxEdgeCount = 500,
  summary = {},
  credentials,
  positions,
  allPositions,
  pleio
) => {

  // Get only top 10000 edges.
  // TODO: Adjust max size
  const urlFiltered =
    'https://dev2.ndexbio.org/edgefilter/v1/network/' +
    uuid +
    '/topNEdgeFilter?limit=10000'
  const urlNoFilter = 'https://' + server + '.ndexbio.org/v2/network/' + uuid

  let networkAttr = summary.properties
  if (networkAttr === undefined) {
    networkAttr = []
  }

  let idx = networkAttr.length
  let th = 0
  let mainFeature = ''

  while (idx--) {
    const attr = networkAttr[idx]
    const name = attr['predicateString']
    if (name === 'Parent weight') {
      th = attr['value']
    } else if (name === 'Main Feature') {
      mainFeature = attr['value']
    }
  }

  let url = urlFiltered
  if (mainFeature.length === 0) {
    url = urlNoFilter
  }

  return dispatch => {
    dispatch(fetchNetwork(url))

    return getInteractions(
      mainFeature,
      th,
      dispatch,
      uuid,
      url,
      maxEdgeCount,
      credentials,
      positions,
      allPositions,
      pleio
    )
  }
}

const convertNetworkAttr = attr => {
  let idx = attr.length

  const data = {}
  while (idx--) {
    const el = attr[idx]
    const name = el['n']
    const value = el['v']
    data[name] = value
  }
  return data
}

const createGroups = netAndFilter => {
  const network = netAndFilter[0]
  const networkData = network.data
  const group = networkData.Group

  if (group === undefined) {
    netAndFilter.push(null)
  } else {
    const groups = group.split('|')
    const groupMap = {}
    groups.forEach(group => {
      groupMap[group] = []
    })

    // Special case: genes
    groupMap['genes'] = []

    const nodes = network.elements.nodes
    nodes.forEach(node => {
      const nodeData = node.data
      const nodePropNames = Object.keys(nodeData)

      let geneFlag = false

      nodePropNames.forEach(nodePropName => {
        if (nodePropName.startsWith('Group')) {
          let tagParts = nodePropName.split('_')

          let tag = tagParts[1] + ':' + tagParts[2]
          if (tagParts[1] === undefined || tagParts[2] === undefined) {
            tagParts = nodePropName.split(':')
            const tLen = tagParts.length
            tag = tagParts[tLen - 2] + ':' + tagParts[tLen - 1]
          } else if (tagParts.length >= 3) {
            let idx = 3
            while (idx < tagParts.length) {
              tag = tag + '-' + tagParts[idx]
              idx++
            }
          }
          const value = nodeData[nodePropName]

          if (value) {
            geneFlag = true

            const targetList = groupMap[tag]

            if (targetList === undefined) {
              // For subsystem without prefix (:)
              const entry = groupMap[tagParts[1]]
              if (entry !== undefined) {
                entry.push(nodeData.id)
              }
            } else {
              groupMap[tag].push(nodeData.id)
            }
          }
        }
      })

      if (!geneFlag) {
        groupMap[nodeData.name] = [nodeData.id]
      }
    })

    netAndFilter.push(groupMap)
  }

  return netAndFilter
}

const findMinScore = (edges, key) => {
  let edgeCount = edges.length
  let values = new Array(edgeCount)
  while (edgeCount--) {
    const edge = edges[edgeCount]
    values[edgeCount] = edge.data[key]
  }

  return Math.min(...values)
}

const createFilter = (network, maxEdgeCount) => {
  const defCutoff = network.data[THRESHOLD_TAG]
  const filters = []

  const edges = network.elements.edges
  let edgeCount = edges.length

  // 1. Extract props from network data
  const edgeTypes = {}
  let mainEdgeType = network.data[MAIN_EDGE_TAG]
  if (mainEdgeType !== undefined) {
    mainEdgeType = mainEdgeType.replace(PATTERN, '_')
  }

  for (let [key, value] of Object.entries(network.data)) {
    if (key === MAIN_EDGE_TAG) {
      continue
    }

    const keyParts = key.split(' ')
    const suffix = keyParts[keyParts.length - 1]
    let realKey = keyParts.slice(0, keyParts.length - 1).join('_')
    const edgeTypeName = realKey.replace(PATTERN, '_')

    const currentValue = edgeTypes[edgeTypeName]
    if (currentValue === undefined) {
      const newEntry = {}
      newEntry[suffix] = value
      edgeTypes[edgeTypeName] = newEntry
    } else {
      currentValue[suffix] = value
      edgeTypes[edgeTypeName] = currentValue
    }
  }

  for (let [key, value] of Object.entries(edgeTypes)) {
    if (value.type === 'numeric') {
      const isPrimary = mainEdgeType === key

      let th = null
      let min = value.min
      let max = value.max

      if (isPrimary) {
        const range = network.data['edgeScoreRange']
        min = range[0]
        max = range[1]
        const pw = network.data['Parent weight']
        if (pw) {
          if (pw == 0) {
            th = findMinScore(edges, key)
          } else {
            th = Number(pw)
          }
        }
        // If default cutoff is available, use it
        else if (defCutoff) {
          th = defCutoff
        } else {
          // Find best threshold
          let values = new Array(edgeCount)
          while (edgeCount--) {
            const edge = edges[edgeCount]
            values[edgeCount] = edge.data[key]
          }

          values.sort()
          const thPosition = parseInt(edges.length * 0.9, 10)

          if (edges.length < maxEdgeCount) {
            if (edges.length < 100) {
              th = min
            } else {
              th = values[thPosition]
            }
          } else if (thPosition > maxEdgeCount) {
            th = values[edges.length - maxEdgeCount]
          } else {
            th = values[thPosition]
          }
        }
        // Error handling: TH not found:
        if (!th) {
          th = min
        }
      }

      filters.push({
        attributeName: key,
        min: min,
        max: max,
        value: th,
        isPrimary: isPrimary,
        enabled: isPrimary,
        type: 'continuous',
        threshold: th
      })
    } else if (value.type === 'boolean') {
      filters.push({
        attributeName: key,
        isPrimary: false,
        enabled: false,
        type: 'boolean'
      })
    }
  }
  return [network, filters]
}

// For filters
export const SET_VALUE = 'SET_VALUE'
export const setValue = createAction(SET_VALUE)

// For upper limit of edges
export const SET_MAX_EDGE_COUNT = 'SET_MAX_EDGE_COUNT'
export const setMaxEdgeCount = createAction(SET_MAX_EDGE_COUNT)

export const SET_ORIGINAL_EDGE_COUNT = 'SET_ORIGINAL_EDGE_COUNT'
export const setOriginalEdgeCount = createAction(SET_ORIGINAL_EDGE_COUNT)

// Current Range
export const SET_PRIMARY_EDGE_SCORE_RANGE = 'SET_PRIMARY_EDGE_SCORE_RANGE'
export const setPrimaryEdgeScoreRange = createAction(
  SET_PRIMARY_EDGE_SCORE_RANGE
)

// Selected nodes
export const SET_SELECTED = 'SET_SELECTED'
export const setSelected = createAction(SET_SELECTED)

// Stores single edge selection
export const SET_SELECTED_EDGE = 'SET_SELECTED_EDGE'
export const setSelectedEdge = createAction(SET_SELECTED_EDGE)

// CTR-Click select
export const SET_SELECTED_PERM = 'SET_SELECTED_PERM'
export const setSelectedPerm = createAction(SET_SELECTED_PERM)

export const DESELECT_PERM = 'DESELECT_PERM'
export const deselectPerm = createAction(DESELECT_PERM)

export const CLEAR_SELECTED_PERM = 'CLEAR_SELECTED_PERM'
export const clearSelectedPerm = createAction(CLEAR_SELECTED_PERM)

export const SET_AUTO_LOAD_THRESHOLD = 'SET_AUTO_LOAD_THRESHOLD'
export const setAutoLoadThreshold = createAction(SET_AUTO_LOAD_THRESHOLD)

export const SET_RAW_SUMMARY = 'SET_RAW_SUMMARY'
export const setRawSummary = createAction(SET_RAW_SUMMARY)

export const SET_LOADING = 'SET_LOADING'
export const setLoading = createAction(SET_LOADING)

export const SET_EDGE_SCORE_RANGE = 'SET_EDGE_SCORE_RANGE'
export const setEdgeScoreRange = createAction(SET_EDGE_SCORE_RANGE)

export const SET_GROUP_POSITIONS = 'SET_GROUP_POSITIONS'
export const setGroupPositions = createAction(SET_GROUP_POSITIONS)

export const CLEAR_ALL = 'CLEAR_ALL'
export const clearAll = createAction(CLEAR_ALL)

export const SET_LEGEND = 'SET_LEGEND'
export const setLegend = legend => {
  return {
    type: SET_LEGEND,
    payload: legend
  }
}

// Check size of the network
export const RECEIVE_SUMMARY = 'RECEIVE_SUMMARY'
const receiveSummary = summary => {
  return {
    type: RECEIVE_SUMMARY,
    summary
  }
}

export const SET_ALL_POSITIONS = 'SET_ALL_POSITIONS'
export const setAllPositions = allPositions => {
  return {
    type: SET_ALL_POSITIONS,
    payload: allPositions
  }
}

export const SET_PLEIO = 'SET_PLEIO'
export const setPleio = pleio => {
  return {
    type: SET_PLEIO,
    payload: pleio
  }
}

export const getNetworkSummary = (uuid, server, url, maxEdgeCount = 500) => {
  return dispatch => {
    const url = 'https://' + server + NDEX_API + uuid + '/summary'
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        } else {
          return response.json()
        }
      })
      .then(summary => {
        return dispatch(receiveSummary(summary))
      })
      .catch(err => {
        console.warn('Network summary ERROR! ', err)
        return dispatch(receiveSummary(null))
      })
  }
}
