import {
  FETCH_NETWORK,
  RECEIVE_NETWORK,
  DELETE_NETWORK,
  SET_SERVER,
  SET_UUID,
  SET_SUMMARY,
  SET_GENE_MAP,
  SET_HIERARCHY,
  SET_TITLE,
  SET_CURRENT_PATH
} from '../actions/network'
import { Map } from 'immutable'

const defState = Map({
  loading: false,
  index: null,
  idx2: null,
  error: null,
  uuid: null,
  server: null,
  networkUrl: null,
  cyjs: null,
  summary: null,
  geneMap: null,
  hierarchy: null,
  title: null,
  currentPath: []
})

export default function networkState(state = defState, action) {
  switch (action.type) {
    case FETCH_NETWORK:
      return state
        .set('loading', true)
        .set('cyjs', null)
        .set('hierarchy', null)
        .set('title', null)
        .set('currentPath', [])
    case SET_GENE_MAP:
      return state.set('geneMap', action.payload)
    case RECEIVE_NETWORK:
      const net = action.network
      return state
        .set('cyjs', net)
        .set('hierarchy', null)
        .set('loading', false)
        .set('error', action.error)
        .set('index', action.index)
        .set('idx2', action.idx2)
    case DELETE_NETWORK:
      return state.delete(action.url).delete('index')
    case SET_UUID:
      return state.set('uuid', action.payload)
    case SET_SERVER:
      const networkUrl = action.payload + '/v2/network/' + state.get('uuid')
      return state.set('server', action.payload).set('networkUrl', networkUrl)
    case SET_SUMMARY:
      return state.set('summary', action.payload)
    case SET_HIERARCHY:
      return state.set('hierarchy', action.payload).set('cyjs', null)
    case SET_TITLE:
      return state.set('title', action.payload)
    case SET_CURRENT_PATH:
      return state.set('currentPath', action.payload)

    default:
      return state
  }
}
