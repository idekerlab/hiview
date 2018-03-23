import { handleActions } from 'redux-actions'

const defaultState = {
  message: ''
}

export default handleActions(
  {
    SET_MESSAGE: (state, action) => {
      message: action.payload
    }
  },
  defaultState
)
