import {ADD_FILTER, SET_VALUE, REMOVE_FILTER, ENABLE_FILTER} from '../actions/filters'
import {List, Map} from 'immutable'


const defState = Map({});

const createNumericalFilter = (name, min, max, value = 0, isPimary = false, enabled = false, type = 'continuous') => (
  {
    name,
    enabled,
    value,
    min,
    max,
    isPimary,
    type,
  }
)


export default function filterState(state = defState, action) {

  switch (action.type) {

    case ADD_FILTER:
      const newFilter = action.payload
      return state.set(
        newFilter.attributeName,
        createNumericalFilter(newFilter.attributeName, newFilter.min, newFilter.max,
          newFilter.value, newFilter.isPrimary, newFilter.enabled, newFilter.type),
      )

    case SET_VALUE:
      const filter = state.get(action.payload.attributeName)
      if(filter.type === 'continuous') {
        filter.value = action.payload.value
      } else {
        filter.enabled = action.payload.enabled
      }
      return state.set(action.payload.attributeName, filter)
    case REMOVE_FILTER:
      return state.delete(action.payload)

    default:
      return state
  }
}

