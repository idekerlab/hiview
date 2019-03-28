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

export const setExternalNetwork = createAction(SET_EXTERNAL_NETWORK)
export const clearExternalNetwork = createAction(CLEAR_EXTERNAL_NETWORK)
export const fetchExternalNetwork = createAction(FETCH_EXTERNAL_NETWORK)
export const receiveExternalNetwork = createAction(RECEIVE_EXTERNAL_NETWORK)

export const setSelectedNodes = createAction(SET_SELECTED_NODES)
export const clearSelectedNodes = createAction(CLEAR_SELECTED_NODES)

let t0 = 0
let t1 = 0
export const fetchExternalNetworkFromUrl = (url, uuid, interactomeUuid) => {
  console.log('External network loading: start', url, interactomeUuid)

  t0 = performance.now()
  return dispatch => {
    dispatch(fetchExternalNetwork(url))
    return getNetworkData(url, uuid, dispatch, interactomeUuid)
  }
}

const getNetworkData = (url, uuid, dispatch, interactomeUuid) => {
  return fetchDataFromRemote(url, uuid, dispatch, interactomeUuid)
}

const fetchDataFromRemote = (url, uuid, dispatch, interactomeUuid) => {
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
      const nodes = extractNodes(network)

      const query = {
        searchString: nodes.join(' '),
        searchDepth: 1
      }

      const searchUrl =
        'http://public.ndexbio.org/v2/search/network/' +
        interactomeUuid +
        '/interconnectquery'

      console.log('((((((((((((((((Search URL:', interactomeUuid, searchUrl)

      postSetting.body = JSON.stringify(query)

      fetch(searchUrl, postSetting)
        .then(response2 => {
          if (!response2.ok) {
            throw Error(response2.statusText)
          } else {
            return response2.json()
          }
        })
        .then(directNetwork => {
          const cyjs = convertCx2cyjs(directNetwork)
          return dispatch(
            receiveExternalNetwork({ url, network: cyjs, error: null })
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

const extractNodes = cx => {
  const filtered = cx.filter(entry => entry.nodes)
  const nodes = filtered[0].nodes
  return nodes.map(node => node.n)
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
