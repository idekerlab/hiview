import * as d3Hierarchy from 'd3-hierarchy'
import cytoscape from 'cytoscape'
import { createAction } from 'redux-actions'

import Fuse from 'fuse.js'
import Dexie from 'dexie'

export const SET_UUID = 'SET_UUID'
export const SET_SERVER = 'SET_SERVER'
export const SET_SUMMARY = 'SET_SUMMARY'
export const setUuid = createAction(SET_UUID)
export const setServer = createAction(SET_SERVER)
export const setSummary = createAction(SET_SUMMARY)

export const FETCH_NETWORK = 'FETCH_NETWORK'

// For local cache

const DB_NAME = 'HiView'
const DB_VERSION = 2
const DB_STORE = 'hierarchy'
const DB_PRIMARY_KEY = 'uuid'

const hvDb = new Dexie(DB_NAME)

const initDB = () => {
  hvDb.version(DB_VERSION).stores({
    [DB_STORE]: DB_PRIMARY_KEY
  })

  hvDb.open().catch(e => {
    console.error(DB_NAME + ': Open failed: ' + e)
  })
}

initDB()

const generateIndex = networkJson => {
  if (!networkJson) {
    throw Error('Network not loaded')
  }

  const nodes = networkJson.elements.nodes
  const nodeData = nodes.map(node => node.data)

  const options = {
    shouldSort: true,
    threshold: 0.0,
    tokenize: true,
    location: 0,
    matchAllTokens: true,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name', 'Label', 'GO_term_aligned']
  }
  return new Fuse(nodeData, options)
}

const fetchNetwork = url => {
  return {
    type: FETCH_NETWORK,
    url
  }
}

export const RECEIVE_NETWORK = 'RECEIVE_NETWORK'
const receiveNetwork = (url, json, error) => {
  if (error !== null) {
    return {
      type: RECEIVE_NETWORK,
      url,
      index: null,
      network: null,
      error: error
    }
  }

  const index = generateIndex(json)

  return {
    type: RECEIVE_NETWORK,
    url,
    index,
    network: json,
    error: null
  }
}

let t0 = 0
let t1 = 0
export const fetchNetworkFromUrl = (url, uuid) => {
  // const url = 'http://localhost:3000/hiview.cyjs'
  // const url =
  //   'http://ec2-35-167-36-71.us-west-2.compute.amazonaws.com:3000/cache/getcyjs/hiview'
  console.log('Main network loading: start', url)

  t0 = performance.now()
  return dispatch => {
    dispatch(fetchNetwork(url))
    return getNetworkData(url, uuid, dispatch)
  }
}

const getNetworkData = (url, uuid, dispatch) => {
  hvDb.hierarchy.get(uuid).then(network => {
    if (network === undefined) {
      console.log('Does not exist:', uuid)
      return fetchDataFromRemote(url, uuid, dispatch)
    } else {
      return fetchFromLocal(url, uuid, dispatch, network)
    }
  })
  return false
}

const fetchFromLocal = (url, uuid, dispatch, netObj) => {
  console.log('Hit:', uuid, performance.now() - t0)

  const network = createLabel2IdMap(netObj)
  addOriginalToAlias(network)
  return dispatch(receiveNetwork(url, network, null))
}

const fetchDataFromRemote = (url, uuid, dispatch) => {
  const headers = new Headers()
  headers.set('Accept-Encoding', 'br')
  const setting = {
    method: 'GET',
    mode: 'cors',
    headers: headers
  }

  return fetch(url, setting)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        return response.json()
      }
    })
    .then(json => {
      t1 = performance.now()
      console.log('Remote fetch time = ', t1 - t0)
      json['uuid'] = uuid
      hvDb.hierarchy.put(json)
      return json
    })
    .then(json => createLabel2IdMap(json))
    .then(network => addOriginalToAlias(network))
    .then(network => dispatch(receiveNetwork(url, network, null)))
    .catch(err => {
      console.log('Fetch Error: ', err)
      return dispatch(receiveNetwork(url, null, err))
    })
}

let primaryName2prop = new Map()

const createLabel2IdMap = network => {
  // const t2 = performance.now()
  // console.log('To JSON TIME = ', t2 - t1, network)

  const nodes = network.elements.nodes

  const label2id = {}
  const id2prop = {}
  // primaryId2prop = new Map()
  primaryName2prop = new Map()

  let i = nodes.length
  while (i--) {
    const nodeData = nodes[i].data
    const label = nodeData.Label
    const isRoot = nodeData.isRoot

    if (isRoot) {
      network['rootId'] = nodeData.id
    }

    const hidden = nodeData.Hidden
    if (!hidden && nodeData.NodeType === 'Term') {
      primaryName2prop.set(nodeData.name, nodeData)
    }

    label2id[label] = nodeData.id
    id2prop[nodeData.id] = nodeData
  }
  network['label2id'] = label2id
  network['id2prop'] = id2prop

  return network
}

/**
 *
 * Add children to alias nodes and make it expandable
 *
 * @param network
 * @returns {*}
 */
const addOriginalToAlias = network => {
  const nodes = network.elements.nodes
  let i = nodes.length
  while (i--) {
    const nodeData = nodes[i].data
    const hidden = nodeData.Hidden
    const nodeType = nodeData.NodeType

    if (hidden && nodeType === 'Term') {
      const originalData = primaryName2prop.get(nodeData.Original_Name)

      if (originalData) {
        nodeData['originalId'] = originalData.id
        nodeData['alias'] = true
      } else {
        nodeData['alias'] = false
      }
    } else {
      nodeData['alias'] = false
    }
  }
  return network
}


const walk = (node, layoutMap) => {
  layoutMap[node.id] = [node.x, node.y, node.depth]

  const children = node.children

  if (children === undefined || children.length === 0) {
    return
  } else {
    children.forEach(child => walk(child, layoutMap))
  }
}

export const idMapping = json => {
  fetch(url, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(json => {
      dispatch(receiveNetwork(url, json))
    })
}

export const DELETE_NETWORK = 'DELETE_NETWORK'
const deleteNetwork = url => {
  return {
    type: DELETE_NETWORK,
    url
  }
}
