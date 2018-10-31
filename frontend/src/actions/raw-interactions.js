const THRESHOLD_TAG = 'Main Feature Default Cutoff'

import { createAction } from 'redux-actions'

import {
  sortEdges,
  filterEdge,
  MAIN_EDGE_TAG,
  PATTERN
} from './raw-interactions-util'

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
  const headers = new Headers()
  headers.set('Accept-Encoding', 'br')
  const setting = {
    method: 'GET',
    mode: 'cors',
    headers: headers
  }
  return fetch(url, setting)
}

export const fetchInteractionsFromUrl = (
  uuid,
  server,
  url,
  maxEdgeCount = 500
) => {
  return dispatch => {
    dispatch(fetchNetwork(url))

    const t0 = performance.now()

    return (
      fetchNet(url)
        .then(response => {
          let t1 = performance.now()
          console.log(url, ' :Data fetch  TIME = ', t1 - t0)

          if (!response.ok) {
            throw Error(response.statusText)
          } else {
            return response.json()
          }
        })
        .then(network => {
          dispatch(setOriginalEdgeCount(network.elements.edges.length))
          return network
        })
        .then(network => filterEdge(network, maxEdgeCount))
        // .then(network => sortEdges(network, maxEdgeCount))
        .then(network => createFilter(network, maxEdgeCount))
        .then(netAndFilter => createGroups(netAndFilter))
        .then(netAndFilter => {
          const t3 = performance.now()
          console.log(
            netAndFilter,
            '* Total raw interaction update time = ',
            t3 - t0,
            netAndFilter[0].data
          )

          return dispatch(
            receiveNetwork(
              url,
              netAndFilter[0],
              netAndFilter[1],
              netAndFilter[2],
              netAndFilter[3]
            )
          )
        })
        .catch(err => {
          console.log('Raw interaction fetch ERROR! ', err)
          return dispatch(receiveNetwork(url, null, 'Error!'))
        })
    )
  }
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
          const tagParts = nodePropName.split('_')
          let tag = tagParts[1] + ':' + tagParts[2]

          // TODO: This should be fixed in v2
          if (tagParts.length >= 3) {
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
        console.log("PARENT---------", pw, min, max)
        if( pw ) {
          th = Number(pw)
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

// CTR-Click select
export const SET_SELECTED_PERM = 'SET_SELECTED_PERM'
export const setSelectedPerm = createAction(SET_SELECTED_PERM)

export const DESELECT_PERM = 'DESELECT_PERM'
export const deselectPerm = createAction(DESELECT_PERM)

export const CLEAR_SELECTED_PERM = 'CLEAR_SELECTED_PERM'
export const clearSelectedPerm = createAction(CLEAR_SELECTED_PERM)

export const SET_AUTO_LOAD_THRESHOLD = 'SET_AUTO_LOAD_THRESHOLD'
export const setAutoLoadThreshold = createAction(SET_AUTO_LOAD_THRESHOLD)

export const SET_SUMMARY = 'SET_SUMMARY'
export const setSummary = createAction(SET_SUMMARY)

export const SET_LOADING = 'SET_LOADING'
export const setLoading = createAction(SET_LOADING)

// Check size of the network

export const RECEIVE_SUMMARY = 'RECEIVE_SUMMARY'
const receiveSummary = summary => {
  return {
    type: RECEIVE_SUMMARY,
    summary
  }
}

export const getNetworkSummary = (uuid, server, url, maxEdgeCount = 500) => {
  return dispatch => {
    const url = 'http://' + server + NDEX_API + uuid + '/summary'

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        } else {
          return response.json()
        }
      })
      .then(summary => {
        console.log('* Summary2: ', summary)
        return dispatch(receiveSummary(summary))
      })
      .catch(err => {
        console.log('Network summary ERROR! ', err)
        return dispatch(receiveSummary(null))
      })
  }
}
