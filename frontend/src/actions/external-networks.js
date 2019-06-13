import { createAction } from 'redux-actions'
import { CxToJs, CyNetworkUtils } from 'cytoscape-cx2js'

const utils = new CyNetworkUtils()
const cx2js = new CxToJs(utils)

export const SET_EXTERNAL_NETWORK = 'SET_EXTERNAL_NETWORK'
export const CLEAR_EXTERNAL_NETWORK = 'CLEAR_EXTERNAL_NETWORK'
export const FETCH_EXTERNAL_NETWORK = 'FETCH_EXTERNAL_NETWORK'
export const RECEIVE_EXTERNAL_NETWORK = 'RECEIVE_EXTERNAL_NETWORK'

export const SET_SELECTED_NODES = 'SET_SELECTED_NODES'
export const CLEAR_SELECTED_NODES = 'CLEAR_SELECTED_NODES'

export const SET_LAYOUT = 'SET_LAYOUT'
export const SET_COMMAND = 'SET_COMMAND'

export const setExternalNetwork = createAction(SET_EXTERNAL_NETWORK)
export const clearExternalNetwork = createAction(CLEAR_EXTERNAL_NETWORK)
export const fetchExternalNetwork = createAction(FETCH_EXTERNAL_NETWORK)
export const receiveExternalNetwork = createAction(RECEIVE_EXTERNAL_NETWORK)

export const setSelectedNodes = createAction(SET_SELECTED_NODES)
export const clearSelectedNodes = createAction(CLEAR_SELECTED_NODES)

export const setLayout = createAction(SET_LAYOUT)
export const setCommand = createAction(SET_COMMAND)

let t0 = 0
let t1 = 0
export const fetchExternalNetworkFromUrl = (
  url,
  uuid,
  interactomeUuid,
  genes = null
) => {
  t0 = performance.now()
  return dispatch => {
    dispatch(fetchExternalNetwork(url))
    return getNetworkData(url, uuid, dispatch, interactomeUuid, genes)
  }
}

const getNetworkData = (url, uuid, dispatch, interactomeUuid, genes) => {
  return fetchDataFromRemote(url, uuid, dispatch, interactomeUuid, genes)
}

const fetchDataFromRemote = (url, uuid, dispatch, interactomeUuid, genes) => {
  const headers = new Headers()
  headers.set('Accept-Encoding', 'br')
  const setting = {
    method: 'GET',
    mode: 'cors',
    headers: headers
  }

  const postSetting = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: ''
  }

  if(genes !== null) {
    return sendGeneList(genes, interactomeUuid, dispatch)
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
      return json
    })
    .then(network => {
      // This contains all nodes in the network.
      const nodes = extractNodes(network)
      const nodeSet = new Set(nodes)

      const converted = convertCx2cyjs(network)
      const name2pos = getPositions(converted.elements.nodes)
      const query = {
        searchString: nodes.join(' '),
        searchDepth: 1
      }

      const searchUrl =
        'http://public.ndexbio.org/v2/search/network/' +
        interactomeUuid +
        '/interconnectquery'

      postSetting.body = JSON.stringify(query)

      fetch(searchUrl, postSetting)
        .then(response2 => {
          if (!response2.ok) {
            throw Error(response2.statusText)
          } else {
            return response2.json()
          }
        })
        .then(cx => {
          const directNetwork = removeLoops(cx)
          const cyjs = convertCx2cyjs(directNetwork)

          // Need to add more
          const returnedNodes = cyjs.elements.nodes
          const { newNodes, newEdges } = adjustNodeSet(
            nodeSet,
            returnedNodes,
            cyjs.elements.edges,
            name2pos
          )
          cyjs.elements.nodes = newNodes
          cyjs.elements.edges = newEdges

          return dispatch(
            receiveExternalNetwork({
              url,
              network: cyjs,
              cx: directNetwork,
              error: null
            })
          )
        })
    })
    .catch(err => {
      console.log('Fetch Error: ', err)
      return dispatch(
        receiveExternalNetwork({ url, network: null, error: err })
      )
    })
}

const sendGeneList = (genes, interactomeUuid, dispatch) => {
  const postSetting = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: ''
  }

  const query = {
    searchString: genes.join(' '),
    searchDepth: 1
  }

  // const nodeSet = new Set(nodes)

  const searchUrl =
    'http://public.ndexbio.org/v2/search/network/' +
    interactomeUuid +
    '/interconnectquery'

  postSetting.body = JSON.stringify(query)

  fetch(searchUrl, postSetting)
    .then(response2 => {
      if (!response2.ok) {
        throw Error(response2.statusText)
      } else {
        return response2.json()
      }
    })
    .then(cx => {
      const directNetwork = removeLoops(cx)
      const cyjs = convertCx2cyjs(directNetwork)

      // Need to add more
      // const returnedNodes = cyjs.elements.nodes
      // const { newNodes, newEdges } = adjustNodeSet(
      //   nodeSet,
      //   returnedNodes,
      //   cyjs.elements.edges
      // )
      // cyjs.elements.nodes = newNodes
      // cyjs.elements.edges = newEdges

      return dispatch(
        receiveExternalNetwork({
          url: null,
          network: cyjs,
          cx: directNetwork,
          error: null
        })
      )
    })
}

const getPositions = nodes => {
  const name2pos = {}
  let len = nodes.length
  while (len--) {
    const node = nodes[len]
    name2pos[node.data.name] = node.position
  }

  return name2pos
}

const adjustNodeSet = (
  originalNodes,
  returnedNodes,
  edges,
  positions = null
) => {
  const newNodes = []
  const newSet = new Set()
  const removed = []

  let len = returnedNodes.length
  while (len--) {
    const n1 = returnedNodes[len]
    if (originalNodes.has(n1.data.name)) {
      n1.data['found'] = true

      if (positions !== null) {
        n1['position'] = positions[n1.data.name]
      }
      newNodes.push(n1)
      newSet.add(n1.data.name)
    } else {
      removed.push(n1.data.id)
    }
  }

  const removedSet = new Set(removed)
  len = edges.length
  const newEdges = []
  while (len--) {
    const e = edges[len]
    const s = e.data.source
    const t = e.data.target

    if (removedSet.has(s) || removedSet.has(t)) {
    } else {
      newEdges.push(e)
    }
  }

  len = originalNodes.size

  const vals = [...originalNodes]
  while (len--) {
    const n = vals[len]
    if (!newSet.has(n)) {
      const node = {
        data: {
          id: n,
          name: n
        }
      }

      if (positions !== null) {
        node['position'] = positions[n]
      }
      newNodes.push(node)
    }
  }

  return { newNodes, newEdges }
}

const extractNodes = cx => {
  const filtered = cx.filter(entry => entry.nodes)
  const nodes = filtered[0].nodes

  return nodes.map(node => node.n)
}

const removeLoops = cx => {
  const filtered = cx.filter(entry => entry.edges)
  const edges = filtered[0].edges
  const newEdges = edges.filter(edge => edge.s !== edge.t)
  let len = cx.length
  while (len--) {
    const entry = cx[len]
    if (entry.edges) {
      cx[len] = { edges: newEdges }
      break
    }
  }
  return cx
}

const filterEdges = edges => {
  return edges.filter(edge => edge.data.source !== edge.data.target)
}

const convertCx2cyjs = cx => {
  const niceCX = utils.rawCXtoNiceCX(cx)
  const attributeNameMap = {}
  const elementsObj = cx2js.cyElementsFromNiceCX(niceCX, attributeNameMap)

  // This contains original style.
  const style = cx2js.cyStyleFromNiceCX(niceCX, attributeNameMap)
  return {
    elements: elementsObj,
    style
  }
}
