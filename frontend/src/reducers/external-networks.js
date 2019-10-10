import { handleActions } from 'redux-actions'
import {
  setExternalNetwork,
  clearExternalNetwork,
  fetchExternalNetwork,
  receiveExternalNetwork,
  setSelectedNodes,
  clearSelectedNodes,
  setLayout,
  setCommand
} from '../actions/external-networks'

const ORIGINAL_NETWORK_NAME = 'Source Interactome'

const PRESET_NETWORKS = [
  { name: ORIGINAL_NETWORK_NAME, uuid: null },
  {
    name: 'String: High Confidence (Score > 0.7)',
    uuid: '275bd84e-3d18-11e8-a935-0ac135e8bacf'
  },
  { name: 'BioGrid', uuid: '36f7d8fd-23dc-11e8-b939-0ac135e8bacf' },
  { name: 'BioPlex', uuid: '98ba6a19-586e-11e7-8f50-0ac135e8bacf' },
  {
    name: 'Signor Complete - Human',
    uuid: '523fff27-afe8-11e9-8bb4-0ac135e8bacf'
  }
]

const defaultState = {
  loading: false,
  externalNetworks: PRESET_NETWORKS,
  selectedNetworkName: ORIGINAL_NETWORK_NAME,
  selectedNetwork: null,
  selectedNetworkUuid: null,
  selectedNodes: [],
  layoutName: null,
  command: null
}

export default handleActions(
  {
    [setExternalNetwork]: (state, action) => {
      return {
        ...state,
        layoutName: null,
        selectedNetwork: null,
        selectedNetworkName: action.payload.name,
        selectedNetworkUuid: action.payload.uuid,
        selectedNodes: []
      }
    },
    [clearExternalNetwork]: (state, action) => {
      return {
        ...state,
        loading: false,
        layoutName: null,
        externalNetworks: PRESET_NETWORKS,
        selectedNetworkName: ORIGINAL_NETWORK_NAME,
        selectedNetwork: null,
        selectedNetworkUuid: null,
        selectedNodes: []
      }
    },
    [setSelectedNodes]: (state, action) => {
      return {
        ...state,
        selectedNodes: action.payload
      }
    },
    [clearSelectedNodes]: (state, action) => {
      return {
        ...state,
        selectedNodes: []
      }
    },
    [setLayout]: (state, action) => {
      return {
        ...state,
        layoutName: action.payload
      }
    },
    [setCommand]: (state, action) => {
      return {
        ...state,
        command: action.payload
      }
    },
    [fetchExternalNetwork]: (state, action) => ({
      ...state,
      loading: true,
      selectedNetwork: null,
      selectedNodes: []
    }),
    [receiveExternalNetwork]: (state, action) => {
      return {
        ...state,
        loading: false,
        selectedNetwork: action.payload
      }
    }
  },
  defaultState
)
