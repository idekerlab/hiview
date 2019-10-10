import { createAction } from 'redux-actions'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'
import { getHeader } from '../components/AccessUtil'

import Fuse from 'fuse.js'
import Dexie from 'dexie'

const utils = new CyNetworkUtils()
const cx2js = new CxToJs(utils)

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
    tokenize: false,
    location: 0,
    distance: 100,
    maxPatternLength: 12,
    minMatchCharLength: 3,
    keys: ['Label', 'GO_term_ID']
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
export const fetchNetworkFromUrl = (url, uuid, serverType, credentials) => {
  t0 = performance.now()
  return dispatch => {
    dispatch(fetchNetwork(url))
    return getNetworkData(url, uuid, dispatch, serverType, credentials)
  }
}

const getNetworkData = (url, uuid, dispatch, serverType, credentials) => {
  hvDb.hierarchy.get(uuid).then(network => {
    if (network === undefined) {
      console.log('Does not exist:', uuid)
      return fetchDataFromRemote(url, uuid, dispatch, serverType, credentials)
    } else {
      return fetchFromLocal(url, uuid, dispatch, network)
    }
  })
  return false
}

const fetchFromLocal = (url, uuid, dispatch, netObj) => {
  console.log('Local Hit:', uuid, performance.now() - t0)

  const network = createLabel2IdMap(netObj)
  addOriginalToAlias(network)
  return dispatch(receiveNetwork(url, network, null))
}

const modifyNetwork = (cyjs, attrMap) => {
  const pattern = /_u\d+$/g
  // Flip
  const newMap = {}

  const keys = Object.keys(attrMap)
  keys.forEach(key => (newMap[attrMap[key]] = key))

  console.log('NMM', newMap)

  const nodes = cyjs.elements.nodes
  let len = nodes.length
  while (len--) {
    const node = nodes[len]

    const data = node.data
    const newData = {}
    const originalKeys = Object.keys(data)

    originalKeys.forEach(key => {
      const newKey = key.replace(pattern, '')
      let value = data[key]
      if (value === 'false') {
        value = false
      } else if (value === 'true') {
        value = true
      } else if (key === 'id') {
        value = value.toString()
      }

      newData[newKey] = value
    })
    node.data = newData
  }

  const edges = cyjs.elements.edges
  len = edges.length

  while (len--) {
    const e = edges[len]
    const data = e.data
    const newData = {}
    const originalKeys = Object.keys(data)

    originalKeys.forEach(key => {
      const newKey = key.replace(pattern, '')
      let value = data[key]
      if (value === 'false') {
        value = false
      } else if (value === 'true') {
        value = true
      } else if (key === 'id') {
        value = value.toString()
      }

      newData[newKey] = value
    })
    newData.source = data.source.toString()
    newData.target = data.target.toString()
    e.data = newData
  }

  return cyjs
}

const getNetworkAttributes = cx => {
  const networkAttr = cx.filter(
    entry => entry['networkAttributes'] !== undefined
  )

  // Check net attr actually exists
  if (
    networkAttr === undefined ||
    networkAttr === null ||
    networkAttr.length === 0
  ) {
    return {
      name: '(No Name)'
    }
  }
  const attr = networkAttr[0].networkAttributes

  const cyjsData = {}
  attr.forEach(entry => {
    cyjsData[entry.n] = entry.v
  })

  return cyjsData
}

const fetchDataFromRemote = (url2, uuid, dispatch, serverType, credentials) => {
  console.log('From remote::', credentials)

  let headers = getHeader(credentials)
  console.log('New header::', headers)
  if (headers !== null) {
    headers['Accept-Encoding'] = 'br'
  } else {
    headers = {
      'Accept-Encoding': 'br'
    }
  }

  const setting = {
    method: 'GET',
    mode: 'cors',
    headers: headers
  }

  console.log('settings::', setting)

  const url = 'http://' + serverType + '.ndexbio.org/v2/network/' + uuid

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
      console.log('Remote fetch time = ', t1 - t0, json)
      const netAttr = getNetworkAttributes(json)
      let niceCX = utils.rawCXtoNiceCX(json)
      const attributeNameMap = {}
      const elementsObj = cx2js.cyElementsFromNiceCX(niceCX, attributeNameMap)

      // Release it
      niceCX = null

      const cyjs = {
        data: netAttr,
        uuid: uuid,
        elements: elementsObj
      }

      json['uuid'] = uuid

      const filtered = modifyNetwork(cyjs, attributeNameMap)

      hvDb.hierarchy.put(filtered)
      // hvDb.hierarchy.put(json)
      json = null

      return filtered
      // return json
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

export const SET_GENE_MAP = 'SET_GENE_MAP'
export const setGeneMap = createAction(SET_GENE_MAP)
