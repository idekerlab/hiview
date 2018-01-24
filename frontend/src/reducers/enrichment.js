import {
  ADD_GENE_LIST,
  CLEAR_GENE_LIST,
  SEND_GENE_LIST,
  RECEIVE_ANALYSIS_RESULT

} from "../actions/enrichment";

import { Map, Set } from "immutable";


const defState = Map({
  genes: Set(),
  running: false,
  result: null
});

export default function enrichmentState(state = defState, action) {
  switch (action.type) {
    case SEND_GENE_LIST:
      console.log('$$$$$$$$$$$SEND!!!!!!!')
      return state
        .set('running', true)
        .set('result', null)
    case RECEIVE_ANALYSIS_RESULT:
      console.log('$$$$$$$$$$$$ RESULT')
      console.log(action)
      return state
        .set('running', false)
        .set('result', action.result)

    case ADD_GENE_LIST:
      console.log('$$$$$$$$$$$ADD!!!!!!!')
      return state.set("genes", action.payload);
    case CLEAR_GENE_LIST:
      return state.set("genes", Set());

    default:
      return state;
  }
}
