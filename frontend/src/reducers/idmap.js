import {FETCH_IDMAP, RECEIVE_IDMAP, CLEAR_IDMAP} from '../actions/idmap'


const defaultState = {
  ids: null,
  data: {},
  loading: false
}



export default function currentIdmapState(state = defaultState, action) {

  switch (action.type) {
    case FETCH_IDMAP:
      console.log('+++++++++++++++ IDMAP Fetch 1 ++++++++++++++')
      return {
        ids: action.ids,
        data: {},
        loading: true
      }
    case RECEIVE_IDMAP:
      console.log('+++++++++++++++ Fetch finished3 ++++++++++++++')
      console.log(action)

      return {
        ids: action.ids,
        data: action.data,
        loading: false
      }
    case CLEAR_IDMAP:
      console.log('+++++++++++++++ CLEAR ++++++++++++++')

      return {
        ids: null,
        data: {},
        loading: false
      }
    default:
      return state
  }
}
