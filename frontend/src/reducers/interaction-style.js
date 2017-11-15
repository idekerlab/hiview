import {ADD_STYLE, REMOVE_STYLE, UPDATE_STYLE} from '../actions/interaction-style'
import {Map} from 'immutable'


const defState = Map({});


export default function interactionStyleState (state = defState, action) {

  switch (action.type) {

  case ADD_STYLE:
    const newStyle = action.payload.style
    const newStyleName = action.payload.name
    return state.set(newStyleName, newStyle)

    case UPDATE_STYLE:
    // TODO: how?
    return state
  case REMOVE_STYLE:

    // Payload should contain name of style
    return state.delete(action.payload)

  default:
    return state

  }

}

