const MAIN_EDGE_TAG = 'Main Feature'
const MAX_EDGE = 400

const PATTERN = /[ -]/g
import { createAction } from 'redux-actions'



export const FETCH_INTERACTIONS = 'FETCH_INTERACTIONS'
const fetchNetwork = url => {
  return {
    type: FETCH_INTERACTIONS,
    url
  }
}


export const RECEIVE_INTERACTIONS = 'RECEIVE_INTERACTIONS'
const receiveNetwork = (url, network, filters, groups, extraEdges) => {
  return {
    type: RECEIVE_INTERACTIONS,
    url,
    network,
    filters,
    groups,
    extraEdges
  }
}

const fetchNet = url => {
  return fetch(url)
}

export const fetchInteractionsFromUrl = (url, maxEdgeCount= 500) => {
  return dispatch => {
    dispatch(fetchNetwork(url))

    return fetchNet(url)
      .then(response => {
        if(!response.ok) {
          throw Error(response.statusText)
        } else {
          return response.json()
        }
      })
      .then(network => (sortEdges(network, maxEdgeCount)))
      .then(network => (createFilter(network)))
      .then(netAndFilter => (createGroups(netAndFilter)))
      .then( netAndFilter =>
        dispatch(receiveNetwork(url, netAndFilter[0], netAndFilter[1], netAndFilter[2], netAndFilter[3]))
      ).catch(err => {
        console.log("ERRRRR: ", err)
        return dispatch(receiveNetwork(url, null, 'Error!'))
      })
  }
}

const createGroups = netAndFilter => {

  const network = netAndFilter[0]
  const networkData = network.data
  const group = networkData.Group
  if(group === undefined) {
    netAndFilter.push(null)
  } else {
    const groups = group.split('|')
    const groupMap = {}
    groups.forEach(group => {
      groupMap[group] = []
    })

    const nodes = network.elements.nodes

    nodes.forEach(node => {
      const nodeData = node.data
      const nodePropNames = Object.keys(nodeData)

      nodePropNames.forEach(nodePropName => {
        if(nodePropName.startsWith('Group')) {
          const tagParts = nodePropName.split('_')
          const tag = tagParts[1]+ ':' + tagParts[2]
          const value = nodeData[nodePropName]

          if(value) {
            const targetList = groupMap[tag]

            if(targetList === undefined) {
              // For subsystem without prefix (:)
              groupMap[tagParts[1]].push(nodeData.id)
            } else {
              groupMap[tag].push(nodeData.id)
            }

          }
        }
      })
    })
    netAndFilter.push(groupMap)

  }

  return netAndFilter
}

const compareBy = fieldName => (a, b) => {

  const scoreA = a.data[fieldName];
  const scoreB = b.data[fieldName];

  let comparison = 0;
  if (scoreA > scoreB) {
    comparison = -1;
  } else if (scoreA < scoreB) {
    comparison = 1;
  }
  return comparison;
}

const sortEdges = (network, maxEdgeCount) => {

  const nodes = network.elements.nodes
  const edges = network.elements.edges

  const edgeCount = edges.length
  if(edgeCount<maxEdgeCount) {
    return network
  }

  edges.sort(compareBy('RF_score'))

  const subset = edges.slice(0,maxEdgeCount)
  const subsetLen = subset.length
  const nodeSet = new Set()

  for(let i = 0; i<subsetLen; i++){
    const edge = subset[i]
    nodeSet.add(edge.data.source)
    nodeSet.add(edge.data.target)
  }

  let j = nodes.length
  const newNodes = new Array(nodeSet.size)

  let idx = 0
  while(j--) {
    const node = nodes[j]
    if(nodeSet.has(node.data.id)) {
      newNodes[idx] = node
      idx++
    }
  }
  network.elements.edges = subset
  network.elements.nodes = newNodes

  return network
}

const createFilter = network => {

  const filters = []

  const edges = network.elements.edges
  let edgeCount = edges.length

  // 1. Extract props from network data
  const edgeTypes = {}
  let mainEdgeType = network.data[MAIN_EDGE_TAG].replace(PATTERN, '_')

  for (let [key, value] of Object.entries(network.data)) {

    if (key === MAIN_EDGE_TAG) {
      continue
    }

    const keyParts = key.split(' ')
    const suffix = keyParts[keyParts.length - 1]
    const realKey = key.replace(suffix, '').trim()
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
      const isPrimary = (mainEdgeType === key)

      let th = null
      if(isPrimary) {
        // Find best threshold
        let values = new Array(edgeCount)
        while(edgeCount--) {
          const edge = edges[edgeCount]
          values[edgeCount] = edge.data[key]
        }

        values.sort()
        const thPosition = parseInt(edges.length * 0.9, 10)

        if(edges.length < MAX_EDGE) {
          if(edges.length < 100) {
            th = value.min
          } else {
            th = values[thPosition]
          }
        } else if(thPosition > MAX_EDGE) {
          th = values[edges.length - MAX_EDGE]
        } else {
          th = values[thPosition]
        }
      }

      filters.push({
        attributeName: key,
        min: value.min,
        max: value.max,
        value: value.min,
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

