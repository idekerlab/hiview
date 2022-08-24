import { createAction } from 'redux-actions'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'
import { getHeader } from '../components/AccessUtil'

import Fuse from 'fuse.js'
import LocalDB from './local-db'

const utils = new CyNetworkUtils()
const cx2js = new CxToJs(utils)

export const SET_UUID = 'SET_UUID'
export const SET_SERVER = 'SET_SERVER'
export const SET_SUMMARY = 'SET_SUMMARY'
export const SET_TITLE = 'SET_TITLE'

export const setUuid = createAction(SET_UUID)
export const setServer = createAction(SET_SERVER)
export const setSummary = createAction(SET_SUMMARY)
export const setTitle = createAction(SET_TITLE)

export const FETCH_NETWORK = 'FETCH_NETWORK'

export const SET_HIERARCHY = 'SET_HIERARCHY'
export const setHierarchy = createAction(SET_HIERARCHY)

export const SET_CURRENT_PATH = 'SET_CURRENT_PATH'
export const setCurrentPath = createAction(SET_CURRENT_PATH)

const hvDb = LocalDB.getDB()

//TODO: Need to create two search mode.
const generateIndex = (networkJson) => {
  if (!networkJson) {
    throw Error('Network not loaded')
  }

  const nodes = networkJson.elements.nodes
  const nodeData = nodes.map((node) => node.data)

  // For individual exact match
  const geneSearchOptions = {
    shouldSort: true,
    threshold: 0.0,
    tokenize: false,
    location: 0,
    distance: 100,
    maxPatternLength: 16,
    minMatchCharLength: 1,
    keys: ['Label', 'name'],
  }

  // For fuzzy term name match
  const systemSearchOptions = {
    shouldSort: true,
    threshold: 0.3,
    tokenize: false,
    location: 0,
    distance: 100,
    maxPatternLength: 40,
    minMatchCharLength: 2,
    keys: ['Label', 'Original_Name'],
  }

  const geneIndex = new Fuse(nodeData, geneSearchOptions)
  const systemIndex = new Fuse(nodeData, systemSearchOptions)

  return { geneIndex, systemIndex }
}

const fetchNetwork = (url) => {
  return {
    type: FETCH_NETWORK,
    url,
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
      error: error,
    }
  }

  const index = generateIndex(json)

  return {
    type: RECEIVE_NETWORK,
    url,
    index,
    network: json,
    error: null,
  }
}

export const fetchNetworkFromUrl = (url, uuid, serverType, credentials) => {
  return (dispatch) => {
    dispatch(fetchNetwork(url))
    return getNetworkData(url, uuid, dispatch, serverType, credentials)
  }
}

const getNetworkData = async (url, uuid, dispatch, serverType, credentials) => {
  const network = await hvDb.hierarchy.get(uuid)
  const newSummary = await fetchSummary(serverType, uuid)

  if (network === undefined) {
    // Simply fetch from NDEx DB
    console.log('Network does not exist in local DB:', uuid)
    return fetchDataFromRemote(url, uuid, dispatch, serverType, credentials)
  } else {
    const { summary } = network
    if(summary === undefined || newSummary === undefined ) {
      // Just fetch new one from NDEx
      return fetchDataFromRemote(url, uuid, dispatch, serverType, credentials)
    } else {
      // Data with summary exists.  Fetch if new version is available.
      const { modificationTime } = summary
      const newModificationTime = newSummary.modificationTime
      
      if(modificationTime === undefined || newModificationTime === undefined) {
        return fetchDataFromRemote(url, uuid, dispatch, serverType, credentials)
      }
      
      if(modificationTime < newModificationTime) {
        return fetchDataFromRemote(url, uuid, dispatch, serverType, credentials)
      } else {
        console.info('Newer data not found.  Loading local cache updated on ' + new Date(modificationTime))
        return fetchFromLocal(url, uuid, dispatch, network)
      }
    } 
  }
}

const fetchFromLocal = (url, uuid, dispatch, netObj) => {
  // Set network title
  const networkData = netObj.data

  if (networkData !== null && networkData !== undefined) {
    let title = networkData.name
    if (!title) {
      title = 'N/A (' + uuid + ')'
    }

    // Set title prop
    dispatch(setTitle(title))
  }

  const network = createLabel2IdMap(netObj)
  addOriginalToAlias(network)
  return dispatch(receiveNetwork(url, network, null))
}

const modifyNetwork = (cyjs, attrMap) => {
  const pattern = /_u\d+$/g
  // Flip
  const newMap = {}

  const keys = Object.keys(attrMap)
  keys.forEach((key) => (newMap[attrMap[key]] = key))

  const nodes = cyjs.elements.nodes
  let len = nodes.length
  while (len--) {
    const node = nodes[len]

    const data = node.data
    const newData = {}
    const originalKeys = Object.keys(data)

    originalKeys.forEach((key) => {
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

    originalKeys.forEach((key) => {
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

const getNetworkAttributes = (cx) => {
  const networkAttr = cx.filter(
    (entry) => entry['networkAttributes'] !== undefined,
  )

  // Check net attr actually exists
  if (
    networkAttr === undefined ||
    networkAttr === null ||
    networkAttr.length === 0
  ) {
    return {
      name: '(No Name)',
    }
  }
  const attr = networkAttr[0].networkAttributes

  const cyjsData = {}
  attr.forEach((entry) => {
    cyjsData[entry.n] = entry.v
  })

  return cyjsData
}

/**
 * 
 * Fetch summary for time stamp comparison
 */
const fetchSummary = async (serverType, uuid) => {
  const url = 'https://' + serverType + '.ndexbio.org/v2/network/' + uuid
  const summaryUrl = `${url}/summary`
  const response = await fetch(summaryUrl)
  const summaryJson = await response.json()
  return summaryJson
}

const fetchDataFromRemote = async (
  url2,
  uuid,
  dispatch,
  serverType,
  credentials,
) => {
  console.log('From remote::', credentials)

  let headers = getHeader(credentials)
  headers['Accept-Encoding'] = 'br'

  const setting = {
    method: 'GET',
    mode: 'cors',
    headers: headers,
  }

  const url = 'https://' + serverType + '.ndexbio.org/v2/network/' + uuid

  const summary = await fetchSummary(serverType, uuid)

  console.log('Compare times', summary)
  return fetch(url, setting)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      } else {
        return response.json()
      }
    })
    .then((json) => {
      const netAttr = getNetworkAttributes(json)
      let niceCX = utils.rawCXtoNiceCX(json)
      const attributeNameMap = {}
      const elementsObj = cx2js.cyElementsFromNiceCX(niceCX, attributeNameMap)

      // Release it
      niceCX = null

      const cyjs = {
        data: netAttr,
        uuid: uuid,
        elements: elementsObj,
      }

      let title = netAttr.name
      if (!title) {
        title = 'N/A (' + uuid + ')'
      }

      // Set title prop
      dispatch(setTitle(title))

      json['uuid'] = uuid

      const filtered = modifyNetwork(cyjs, attributeNameMap)

      // Store summary, too for time stamp comparison
      filtered['summary'] = summary

      hvDb.hierarchy.put(filtered)
      json = null
      return filtered
      // return json
    })
    .then((json) => createLabel2IdMap(json))
    .then((network) => addOriginalToAlias(network))
    .then((network) => dispatch(receiveNetwork(url, network, null)))
    .catch((err) => {
      console.log('Fetch Error: ', err)
      return dispatch(receiveNetwork(url, null, err))
    })
}

let primaryName2prop = new Map()

const createLabel2IdMap = (network) => {
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
const addOriginalToAlias = (network) => {
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
    children.forEach((child) => walk(child, layoutMap))
  }
}

export const idMapping = (json) => {
  fetch(url, {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch(receiveNetwork(url, json))
    })
}

export const DELETE_NETWORK = 'DELETE_NETWORK'
const deleteNetwork = (url) => {
  return {
    type: DELETE_NETWORK,
    url,
  }
}

export const SET_GENE_MAP = 'SET_GENE_MAP'
export const setGeneMap = createAction(SET_GENE_MAP)
