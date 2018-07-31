import {
  FETCH_PROPERTY,
  RECEIVE_PROPERTY,
  CLEAR_PROPERTY
} from '../actions/property'

const defaultState = {
  id: null,
  propType: null,
  url: null,
  data: {},
  loading: false
}

export default function currentPropertyState(state = defaultState, action) {
  switch (action.type) {
    case FETCH_PROPERTY:
      return {
        id: action.id,
        url: action.url,
        propType: action.propType,
        data: {},
        loading: true
      }
    case RECEIVE_PROPERTY:
      return {
        id: action.id,
        propType: action.propType,
        url: action.url,
        data: action.data,
        loading: false
      }
    case CLEAR_PROPERTY:
      return {
        id: null,
        propType: null,
        url: null,
        data: {},
        loading: false
      }
    default:
      return state
  }
}
