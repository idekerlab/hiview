import {
  FETCH_PROPERTY,
  RECEIVE_PROPERTY,
  CLEAR_PROPERTY,
  RECEIVE_METADATA,
  FETCH_METADATA,
} from '../actions/property'

const defaultState = {
  id: null,
  propType: null,
  url: null,
  data: {},
  loading: false,
  metadata: null,
}

export default function currentPropertyState(state = defaultState, action) {
  switch (action.type) {
    case FETCH_PROPERTY:
      return {
        ...state,
        id: action.id,
        url: action.url,
        propType: action.propType,
        data: {},
        loading: true,
        metadata: {}
      }
    case RECEIVE_PROPERTY:
      return {
        ...state,
        id: action.id,
        propType: action.propType,
        url: action.url,
        data: action.data,
        loading: false,
      }
    case CLEAR_PROPERTY:
      return {
        id: null,
        propType: null,
        url: null,
        data: {},
        loading: false,
        metadata: {}
      }
    case FETCH_METADATA:
      return {
        ...state,
        loading: true,
        metadata: {},
      }
    case RECEIVE_METADATA:
      const newState = {
        ...state,
        loading: false,
        metadata: action.metadata,
      }
      return newState
    default:
      return state
  }
}
