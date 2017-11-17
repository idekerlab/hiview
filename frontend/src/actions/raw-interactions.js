const MAIN_EDGE_TAG = 'Main Feature'

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
const receiveNetwork = (url, network, filters, groups) => {
  return {
    type: RECEIVE_INTERACTIONS,
    url,
    network,
    filters,
    groups
  }
}

const fetchNet = url => {
  return fetch(url)
}

export const fetchInteractionsFromUrl = url => {
  return dispatch => {
    dispatch(fetchNetwork(url))

    return fetchNet(url)
      .then(response => (response.json()))
      .then(network => (createFilter(network)))
      .then(netAndFilter => (createGroups(netAndFilter)))
      .then( netAndFilter =>
        dispatch(receiveNetwork(url, netAndFilter[0], netAndFilter[1], netAndFilter[2]))
      )
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
            groupMap[tag].push(nodeData.id)

          }
        }
      })
    })
    netAndFilter.push(groupMap)

  }

  return netAndFilter
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
        th = values[thPosition]
      }


      console.log("TH ===============> " + th)

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


const addExtraEdges = netAndFilter => {

  const network = netAndFilter[0]
  const filters = netAndFilter[1]



  const filterNames = Object.keys(filters)

  let primaryFilterName = ''
  filterNames.forEach(filterName => {
    if (filters[filterName].isPrimary) {
      primaryFilterName = filterName
    }
  })

  const edges = network.elements.edges
  const newEdges = []

  let i = edges.length
  while (i--) {
    const edge = edges[i]

    const edgeData = edge.data
    const keys = Object.keys(edgeData)

    let j = keys.length
    while (j--) {
      const key = keys[j]
      if (key === 'id' || key === 'source' || key === 'target') {
        continue
      }

      const value = edgeData[key]
      if (!value) {
        continue
      }

      const newKey = key.replace(PATTERN, '_')
      const newEdge = {
        data: {
          id: edgeData.id + '-' + key,
          source: edgeData.source,
          target: edgeData.target,
        }
      }


      newEdge.data[newKey] = edgeData[key]
      if (newKey === primaryFilterName) {
        newEdges.unshift(newEdge)
      } else {
        newEdges.push(newEdge)
      }
    }


  }
  return newEdges

}

// For filters

export const SET_VALUE = 'SET_VALUE'
export const setValue = createAction(SET_VALUE)
