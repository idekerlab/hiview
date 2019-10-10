import { handleActions } from 'redux-actions'
import { SET_CREDENTIALS } from '../actions/credentials'

const defaultState = {
  isGoogle: false,
  loginDetails: null
}

export default handleActions(
  {
    [SET_CREDENTIALS]: (state, action) => {
      console.info('New Login:', action.payload)
      if (action.payload === null || action.payload === undefined) {
        return defaultState
      }
      return {
        isGoogle: action.payload.isGoogle,
        loginDetails: action.payload.loginDetails
      }
    }
  },
  defaultState
)
