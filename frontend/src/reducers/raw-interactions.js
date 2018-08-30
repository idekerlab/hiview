import {
  FETCH_INTERACTIONS,
  RECEIVE_INTERACTIONS,
  SET_VALUE,
  SET_MAX_EDGE_COUNT,
  SET_ORIGINAL_EDGE_COUNT,
  SET_SELECTED,
  SET_SELECTED_PERM,
  DESELECT_PERM,
  CLEAR_SELECTED_PERM
} from '../actions/raw-interactions'
import { Map, Set } from 'immutable'

const DEF_MAX_EDGE_COUNT = 1000

const defState = Map({
  loading: false,
  interactions: null,
  filters: null,
  extraEdges: null,
  maxEdgeCount: DEF_MAX_EDGE_COUNT,
  originalEdgeCount: 0,
  selected: [],
  selectedPerm: Set()
})

export default function networkState(state = defState, action) {
  switch (action.type) {
    case FETCH_INTERACTIONS:
      return state.set('loading', true)
        .set('interactions', null)
        .set('originalEdgeCount', 0)
    case RECEIVE_INTERACTIONS:
      return state
        .set('loading', false)
        .set('interactions', action.network)
        .set('filters', action.filters)
        .set('groups', action.groups)
        .set('extraEdges', action.extraEdges)
    case SET_VALUE:
      const filters = state.get('filters')
      const attributeName = action.payload.attributeName
      let filterCount = attributeName.length

      let filter = null
      while (filterCount--) {
        const current = filters[filterCount]
        if (current.attributeName === attributeName) {
          filter = current
          break
        }
      }

      // const filter = state.get(action.payload.attributeName)
      if (filter.type === 'continuous') {
        filter.value = action.payload.value
      } else {
        filter.enabled = action.payload.enabled
      }

      return state.set('filters', filters)
    case SET_MAX_EDGE_COUNT:
      return state.set('maxEdgeCount', action.payload)
    case SET_ORIGINAL_EDGE_COUNT:
      return state.set('originalEdgeCount', action.payload)

    case SET_SELECTED:
      return state.set('selected', action.payload)

    case SET_SELECTED_PERM:
      const currentSelection = state.get('selectedPerm')
      const newSet = currentSelection.union(Set(action.payload))
      return state.set('selectedPerm', newSet)

    case DESELECT_PERM:
      const originalSelection = state.get('selectedPerm')
      const diff = originalSelection.subtract(Set(action.payload))
      return state.set('selectedPerm', diff)

    case CLEAR_SELECTED_PERM:
      return state.set('selectedPerm', Set())

    default:
      return state
  }
}
