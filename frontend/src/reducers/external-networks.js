import { handleActions } from 'redux-actions'
import {
  setExternalNetwork,
  fetchExternalNetwork,
  receiveExternalNetwork
} from '../actions/external-networks'

const ORIGINAL_NETWORK_NAME = 'Source Interactome'

const PRESET_NETWORKS = [
  { name: ORIGINAL_NETWORK_NAME, uuid: null },
  { name: 'BioGrid', uuid: '36f7d8fd-23dc-11e8-b939-0ac135e8bacf' },
  { name: 'BioPlex', uuid: '98ba6a19-586e-11e7-8f50-0ac135e8bacf' }
]

const defaultState = {
  loading: false,
  externalNetworks: PRESET_NETWORKS,
  selectedNetworkName: null,
  selectedNetwork: null,
  selectedNetworkUuid: null
}

export default handleActions(
  {
    [setExternalNetwork]: (state, action) => {

      console.log('External network set++++++++++', action.payload)
      return {
        ...state,
        selectedNetworkName: action.payload
      }
    },
    [fetchExternalNetwork]: (state, action) => ({
      ...state,
      loading: true
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
