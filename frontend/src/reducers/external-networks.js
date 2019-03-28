import { handleActions } from 'redux-actions'
import {
  setExternalNetwork,
  clearExternalNetwork,
  fetchExternalNetwork,
  receiveExternalNetwork
} from '../actions/external-networks'

const ORIGINAL_NETWORK_NAME = 'Source Interactome'

const PRESET_NETWORKS = [
  { name: ORIGINAL_NETWORK_NAME, uuid: null },
  { name: 'BioGrid', uuid: '36f7d8fd-23dc-11e8-b939-0ac135e8bacf' },
  { name: 'BioPlex', uuid: '98ba6a19-586e-11e7-8f50-0ac135e8bacf' },
  { name: 'Signor', uuid: 'b0d987cb-1e6b-11e8-b939-0ac135e8bacf' }
]

const defaultState = {
  loading: false,
  externalNetworks: PRESET_NETWORKS,
  selectedNetworkName: ORIGINAL_NETWORK_NAME,
  selectedNetwork: null,
  selectedNetworkUuid: null
}

export default handleActions(
  {
    [setExternalNetwork]: (state, action) => {
      console.log('External network set++++++++++', action.payload)
      return {
        ...state,
        selectedNetwork: null,
        selectedNetworkName: action.payload.name,
        selectedNetworkUuid: action.payload.uuid
      }
    },
    [clearExternalNetwork]: (state, action) => {
      console.log('Clear set++++++++++')
      return {
        ...state,
        loading: false,
        selectedNetworkName: null,
        selectedNetwork: null,
        selectedNetworkUuid: null
      }
    },
    [fetchExternalNetwork]: (state, action) => ({
      ...state,
      loading: true,
      selectedNetwork: null
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
