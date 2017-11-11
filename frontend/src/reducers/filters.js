import {ADD_FILTER, SET_VALUE, REMOVE_FILTER, ENABLE_FILTER} from '../actions/filters'
import {List, Map} from 'immutable'

const defState = Map({
});

const createNumericalFilter = (min, max, value = 0, isPimary = false) => (
  {
    enabled: false,
    value,
    min,
    max,
    isPimary
  }
)


export default function filterState(state = defState, action) {

  switch (action.type) {

    case ADD_FILTER:

      console.log("(((((((((((((((((((((( FILTER ADD")
      console.log(action)
      const newFilter = action.payload
      return state.set(
        newFilter.attributeName,
        createNumericalFilter(newFilter.min, newFilter.max, newFilter.value, newFilter.isPrimary)
      )

    case SET_VALUE:
      const filter = state.get(action.payload.attributeName)
      filter.value = action.payload.value
      return state.set(action.payload.attributeName, filter)
    case REMOVE_FILTER:
      return state.delete(action.payload)

    default:
      return state
  }
}

